const puppeteer = require('puppeteer');
const { Client } = require('pg');

(async () => {
  // PostgreSQL connection setup
  const client = new Client({
    user: 'root',
    host: 'localhost',
    database: 'realestate',
    password: 'root',
    port: 5432,
  });

  await client.connect();

  // Create apartments table if it doesn't exist
  await client.query(`
    CREATE TABLE IF NOT EXISTS apartments (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      url TEXT,
      price VARCHAR(50),
      room_type VARCHAR(100),
      size VARCHAR(50),
      floor VARCHAR(50)
    );
  `);

  // Launch Puppeteer
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto('https://propertyhub.in.th/%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B9%82%E0%B8%84%E0%B8%A3%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3-aspire-asoke-ratchada', { waitUntil: 'domcontentloaded' });

  // Scrape the apartment data
  const apartments = await page.evaluate(() => {
    const apartmentElements = document.querySelectorAll('.sc-152o12i-0.tLuGm.sc-i5hg7z-1.hwrlNi');
    const data = [];
    
    apartmentElements.forEach((element) => {
      const title = element.querySelector('a.sc-152o12i-9.fhmSYQ')?.innerText;
      const url = element.querySelector('a.sc-152o12i-9.fhmSYQ')?.getAttribute('href');
      const price = element.querySelector('.sc-152o12i-7.dKuoZx.priceTag.roomPrice span:nth-child(2)')?.innerText?.replace(/[^0-9]/g, '');
      
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
      
      if (title && url && price && roomType && size && floor) {
        data.push({ title, url, price, roomType, size, floor });
      }
    });
    return data;
  });

  // Insert data into PostgreSQL
  for (const apartment of apartments) {
    const { title, url, price, roomType, size, floor } = apartment;
    await client.query('INSERT INTO apartments (title, url, price, room_type, size, floor) VALUES ($1, $2, $3, $4, $5, $6)', [title, url, price, roomType, size, floor]);
  }

  console.log('Data successfully scraped and stored in the database');

  // Close the browser and PostgreSQL connection
  await browser.close();
  await client.end();
})();