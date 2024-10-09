const { setTimeout } = require('node:timers/promises');
const puppeteer = require('puppeteer');
const { Client } = require('pg');

const { projectList } = require('./projectList');

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

    // Create apartments table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS apartments (
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
        project VARCHAR(100)
      );
    `);

    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setExtraHTTPHeaders({
      'accept-language': 'en-US,en;q=0.9',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
    });

    for (const project of projectList) {
      console.log(`------------${project.name}------------`);
      const { url, name: projectName } = project;

      let retries = 3;
      while (retries > 0) {
        try {
          await page.goto(url, { waitUntil: 'domcontentloaded' });
          break;
        } catch (error) {
          console.error(`Error navigating to ${url}: ${error}. Retries left: ${retries - 1}`);
          retries--;
          if (retries === 0) throw error;
        }
      }

      const apartments = [];
      let pageCount = 1;

      // Function to scrape apartment data from the current page
      const scrapeCurrentPage = async () => {
        const pageData = await page.evaluate(() => {
          const apartmentElements = document.querySelectorAll('.sc-152o12i-0.tLuGm.sc-i5hg7z-1.hwrlNi, .sc-152o12i-0.tLuGm.sc-i5hg7z-1.iokjfP');
          const data = [];
          
          apartmentElements.forEach((element) => {
            const title = element.querySelector('a.sc-152o12i-9.fhmSYQ')?.innerText;
            const url = element.querySelector('a.sc-152o12i-9.fhmSYQ')?.getAttribute('href');
            const priceElement = element.querySelector('.sc-152o12i-7.dKuoZx.priceTag.roomPrice span:nth-child(2), .sc-152o12i-7.dKuoZx.priceTag.roomPrice div span:nth-child(1)');
            const price = priceElement ? priceElement.innerText.replace(/[^0-9]/g, '') : null;
            
            let roomType = '';
            let size = '';
            let floor = '';
            
            const details = element.querySelectorAll('div.sc-152o12i-8.iHoJeR > div');
            details.forEach((detail) => {
              const label = detail.querySelector('span.desc')?.innerText;
              const value = detail.innerText.replace(label, '').trim();
              
              if (label === 'ประเภทห้อง') {
                roomType = value;
              } else if (label === 'ขนาดพื้นที่ห้อง') {
                size = value.match(/\d+(\.\d+)?/)[0];
              } else if (label === 'ชั้น') {
                floor = value;
              }
            });

            const roomId = url.match(/--(\d+)$/)?.[1];
            data.push({ title, url, price, roomType, size, floor, roomId });
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
          const nextPageButton = await page.$('li.next:not(.disabled) > a');
          if (nextPageButton) {
            pageCount++;
            await nextPageButton.click();
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
      for (const apartment of apartments) {
        const { title, url, price, roomType, size, floor, roomId } = apartment;
        const pricePerSqm = parseFloat(price) / parseFloat(size);
        await client.query('INSERT INTO apartments (title, url, price, room_type, size, floor, today_date, price_per_sqm, project, room_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [title, url, price, roomType, size, floor, today, pricePerSqm, projectName, roomId]);
      }
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
