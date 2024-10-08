const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

  // Function to scrape data from a single page
  async function scrapePage(url) {
    await page.goto(url, { waitUntil: 'domcontentloaded' , timeout: 200000 });
    console.log('start page',url)

    const content = await page.evaluate(() => {
      const headers = Array.from(document.querySelectorAll('h3')).map(header => header.innerText);
      const paragraphs = Array.from(document.querySelectorAll('p')).map(paragraph => paragraph.innerText);

      return {
        headers,
        paragraphs
      };
    });

    return content;
  }

  const baseUrl = 'https://fast.novelupdates.net/book/i-became-the-tyrant-of-a-defense-game/chapter-';
  const startChapter = 337;
  const endChapter = 366;
  const results = [];

  for (let i = startChapter; i <= endChapter; i++) {
    const url = `${baseUrl}${i}`;
    const data = await scrapePage(url);
    results.push(`Chapter ${i}\n`);
    results.push(...data.paragraphs);
    results.push('\n\n');
  }

  await browser.close();

  const fileName = `tyrant${startChapter}-${endChapter}.txt`;
  fs.writeFileSync(fileName, results.join('\n'), 'utf-8');
  console.log('Scraping completed and data saved to scraped_content.txt');
})();
