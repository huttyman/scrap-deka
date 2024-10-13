const { setTimeout } = require('node:timers/promises');
const { addExtra } = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteer = addExtra(require('puppeteer'));
const { Client } = require('pg');
const { projectList } = require('./projectList_dd');

console.log(`======================================== ${new Date().toISOString()} ========================================`);
(async () => {
  // PostgreSQL connection setup
  const client = new Client({
    user: 'root',
    host: 'localhost',
    database: 'realestate',
    password: 'root',
    port: 5432,
  });

  try {
    await client.connect();

    // Create new_apartments table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS new_apartments (
        room_id VARCHAR(50),
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        url TEXT,
        price VARCHAR(50),
        room_type VARCHAR(100),
        size VARCHAR(50),
        floor VARCHAR(50),
        today_date DATE,
        price_per_sqm NUMERIC,
        project VARCHAR(100),
        updated_time TIMESTAMP,
        img_src TEXT
      );
    `);

    // Launch Puppeteer
        puppeteer.use(StealthPlugin());

    let browser = await puppeteer.launch({
      headless: true,
    });
    
    for (const project of projectList) {
      console.log(`------------${project.name}------------`);
      const { url, name: projectName } = project;

      // Create a new page for each project
      const page = await browser.newPage();
      await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => false });
      });
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      await page.setExtraHTTPHeaders({
        'accept-language': 'en-US,en;q=0.9',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
      });

      let retries = 3;
      while (retries > 0) {
        try {
          await page.goto(url, { timeout: 60000, waitUntil: 'networkidle2' });
                    break;
        } catch (error) {
          console.error(`Error navigating to ${url}: ${error.message}`);
          await page.screenshot({ path: `error_${retries}.png` });
          retries--;
          console.log(`Retries left: ${retries}`);
          if (retries === 0) throw error;
        }
      }

      const apartments = [];
      let pageCount = 1;

      // Function to scrape apartment data from the current page
      const scrapeCurrentPage = async () => {
        const pageData = await page.evaluate(() => {
          const apartmentElements = document.querySelectorAll('.listing-card');
          const data = [];

          apartmentElements.forEach((element) => {
            const title = element.querySelector('h3.h4.ellipsis.text-transform-none a')?.innerText;
            const url = element.querySelector('h3.h4.ellipsis.text-transform-none a')?.getAttribute('href');
            const priceElement = element.querySelector('.list-price.pull-left .price');
            const price = priceElement ? priceElement.innerText.replace(/[^0-9]/g, '') : null;

            let roomType = '';
            let size = '';
            let floor = '';

            const details = element.querySelectorAll('.listing-features.pull-left li');
            details.forEach((detail) => {
              const label = detail.querySelector('.new-label-class')?.innerText;
              const value = detail.innerText.replace(label, '').trim();

              if (label === 'Room Type') {
                roomType = value;
              } else if (label === 'Size') {
                size = value.match(/\d+(\.\d+)?/)[0];
              } else if (label === 'Floor') {
                floor = value;
              }
            });
            const imgSrc = element.querySelector('img')?.getAttribute('data-original');
            const roomId = element.getAttribute('data-listing-id');
            data.push({ title, url, price, roomType, size, floor, roomId, imgSrc });
          });
          return data;
        });
        apartments.push(...pageData);
        console.log(`Project: ${projectName} | Page ${pageCount}: Found ${pageData.length} items`);
        console.log(`Total items so far for project "${projectName}": ${apartments.length}`);
      };

      // Iterate through pagination
      let hasNextPage = true;
      while (hasNextPage) {
        await scrapeCurrentPage();

        // Check if there's a next page button and click it
        try {
          const nextPageButton = await page.$('.pagination .pagination-next a');
          if (nextPageButton) {
            pageCount++;
            const nextPageUrlHandle = await nextPageButton.getProperty('href');
            const nextPageUrl = await nextPageUrlHandle.jsonValue();
            await page.goto(nextPageUrl, { timeout: 60000, waitUntil: 'networkidle2' });
            await setTimeout(5000);
          } else {
            hasNextPage = false;
          }
        } catch (error) {
          console.error(`Error navigating to next page: ${error}`);
          hasNextPage = false;
        }
      }

      // Insert data into PostgreSQL
      const today = new Date().toISOString().split('T')[0];
      const updatedTime = new Date().toISOString();
      for (const apartment of apartments) {
        const { title, url, price, roomType, size, floor, roomId, imgSrc } = apartment;
        const pricePerSqm = parseFloat(price) / parseFloat(size);
        await client.query('INSERT INTO new_apartments (title, url, price, room_type, size, floor, today_date, price_per_sqm, project, room_id, updated_time, img_src) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [title, url, price, roomType, size, floor, today, pricePerSqm, projectName, roomId, updatedTime, imgSrc]);
      }

      // Close the page to free resources
      await page.close();
      // Add a small delay between projects to reduce load
      await setTimeout(1000);
    }

    console.log('Data successfully scraped and stored in the database');

    // Close the browser and PostgreSQL connection
    await browser.close();
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  } finally {
    await client.end();
  }
})();