const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('http://deka.supremecourt.or.th/search/year');
  await page.screenshot({path:'example.png',fullPage:true})


  // Step 2: Wait for the specific element to be available
  // Use XPath to find an element with the specific class and text "2563"
  const specificElementXPath = `xpath///span[@class='word-a-href' and text()='2566']`;
  const linkEx = await page.waitForSelector(specificElementXPath);
  await linkEx.click();
 

  // Step 4: Wait for the navigation to complete
  await page.waitForNavigation({ waitUntil: 'networkidle0' });


 
  // Initialization of the CSV content with headers
  let csvContent = "topic,doc_id,s_text,l_text,page,year\n";

  let hasNextPage = true;
  let pageNumber = 0;

  while (hasNextPage) {
    // Wait for the elements to be loaded
    pageNumber++;
    await page.waitForSelector('.clear > ul', { timeout: 5000 });

    // Retrieve and iterate through the list of elements
    const listItems = await page.$$('.clear > ul');
    for (const item of listItems) {
      // Fetch the value from .deka-result and the text from label.css-label
      const doc_id = await item.$eval('.deka-result', el => el.value); // Make sure .deka-result is correct
      const topic = await item.$eval('.show-display-left label', el => el.textContent);
      const s_text = await item.$eval('.item_short_text p:nth-of-type(2)', el => el.textContent);
      const l_text = await item.$eval('li.item_long_text', el => el.textContent);
      const year = await item.$eval('label span', el => el.textContent);

      // Append the fetched data to the CSV string
      csvContent += `"${topic}","${doc_id}","${s_text}","${l_text}","${pageNumber}","${year}"\n`;
    }

    // Check for the "Next Page" button and click if available
    const nextPageButtonSelector = 'a:has(> span.glyphicon.glyphicon-chevron-right):not(:has(> span:nth-of-type(2)))';
    const nextPageButton = await page.$(nextPageButtonSelector);
    if (nextPageButton) {
      await nextPageButton.click();
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
    } else {
      hasNextPage = false; // Stop the loop if "Next Page" button is not found
    }
  }

  // Step 5: Take a screenshot of the new page
  await page.screenshot({ path: 'new_page_screenshot.png' });

  // Write the CSV string to a file
  fs.writeFileSync('data.csv', csvContent);



  // Step 5: Take a screenshot of the new page
  await page.screenshot({ path: 'new_page_screenshot.png' });

  await browser.close();
}

run();