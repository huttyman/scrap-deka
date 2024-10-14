const { setTimeout } = require('node:timers/promises');
const { addExtra } = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteer = addExtra(require('puppeteer'));
const { Client } = require('pg');
const { projectList } = require('./projectList');

console.log(`========================================living ${new Date().toISOString()} ========================================`);
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

    // Create living_apartments table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS living_apartments (
        room_id VARCHAR(50),
        id SERIAL PRIMARY KEY,
        title TEXT,
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
      const {url_living: url, name: projectName } = project;

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
          const apartmentElements = document.querySelectorAll('.istock-list');
          const data = [];

          apartmentElements.forEach((element) => {
            const title = element.querySelector('a.image-ratio-4-3')?.getAttribute('title');
            const url = element.querySelector('a.image-ratio-4-3')?.getAttribute('href');
            const priceElement = element.querySelector('.listing-cost .t-16');
            const price = priceElement ? priceElement.innerText.replace(/[^0-9]/g, '') : null;

            const bedRoomElement = element.querySelector('img[alt="room"]');
const bathRoomElement = element.querySelector('img[alt="bathroom"]');
const bedRoom = bedRoomElement ? bedRoomElement.nextSibling.textContent.trim() : '';
const bathRoom = bathRoomElement ? bathRoomElement.nextSibling.textContent.trim() : '';
const roomType = bedRoom && bathRoom ? `${bedRoom}, ${bathRoom}` : bedRoom || bathRoom;

            const sizeElement = element.querySelector('img[alt="useful space"]');
const size = sizeElement ? sizeElement.nextSibling.textContent.trim().match(/\d+/)[0] : '';

            const floorElement = element.querySelector('img[alt="floor"]');
const floor = floorElement ? floorElement.nextSibling.textContent.trim().match(/\d+/)[0] : '';


            
            const imgSrc = element.querySelector('a.image-ratio-4-3 img')?.getAttribute('src');
            const roomId = element.querySelector('.listing-favorites')?.getAttribute('data-web-id');
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
          const nextPageButton = await page.evaluateHandle(() => {
            const paginationLinks = Array.from(document.querySelectorAll('.pagination a'));
            return paginationLinks.find(link => link.textContent.trim() === 'Next ›');
          });
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
        await client.query('INSERT INTO living_apartments (title, url, price, room_type, size, floor, today_date, price_per_sqm, project, room_id, updated_time, img_src) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [title, url, price, roomType, size, floor, today, pricePerSqm, projectName, roomId, updatedTime, imgSrc]);
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