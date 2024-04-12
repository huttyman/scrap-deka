const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('http://deka.supremecourt.or.th/');
  await page.type('#search_deka_start_year', '2550', {delay: 120});
  await page.type('#search_deka_end_year', '2559', {delay: 120});
  // await page.type('#search_deka_no', '1468/2566', {delay: 120});

  await page.screenshot({path:'example.png',fullPage:true})

  

  // Step 2: Wait for the specific element to be available
  // Use XPath to find an element with the specific class and text "2563"
  // const specificElementXPath = `xpath///span[@class='word-a-href' and text()='2566']`;
  // const linkEx = await page.waitForSelector(specificElementXPath);
  // await linkEx.click();
  const linkEx = await page.waitForSelector('#submit_search_deka');
  await linkEx.click();

  // Step 4: Wait for the navigation to complete
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  await page.screenshot({ path: 'new_first_page_screenshot.png' });


 
  // Initialization of the CSV content with headers
  let csvDekaContent = "topic;doc_id;s_text;l_text;page;year\n";
  let csvLawContent = "doc_id;first_elm;second_elm\n";

  let hasNextPage = true;
  let pageNumber = 0;

  while (hasNextPage) {
    // Wait for the elements to be loaded
    pageNumber++;
    // if(pageNumber==1)
    //   hasNextPage = false;
    
    await page.waitForSelector('.clear > ul', { timeout: 5000 });

    // Retrieve and iterate through the list of elements
    const listItems = await page.$$('.clear > ul');
    for (const item of listItems) {
      // Fetch the value from .deka-result and the text from label.css-label
      // const doc_id = await item.$eval('.deka-result', el => el.value); // Make sure .deka-result is correct
      // const topic = await item.$eval('.show-display-left label', el => el.textContent);
      // const s_text = await item.$eval('.item_short_text p:nth-of-type(2)', el => el.textContent);
      
      // const l_textElement = await item.$('li.item_long_text');
      // let l_text = '';
      // if (l_textElement) {
      //   l_text = await page.evaluate(el => el.textContent, l_textElement);
      // }

      const doc_idElement = await item.$('.deka-result');
      const topicElement = await item.$('.show-display-left label');
      const s_textElement = await item.$('li.item_short_text');
      const l_textElement = await item.$('li.item_long_text');
      

      const doc_id = doc_idElement ? await page.evaluate(el => el.value, doc_idElement) : '';
      const topic = topicElement ? await page.evaluate(el => el.textContent, topicElement) : '';
      let s_text = s_textElement ? await page.evaluate(el => el.textContent, s_textElement) : '';
      let l_text = l_textElement ? await page.evaluate(el => el.textContent, l_textElement) : '';

      s_text = s_text.replace(/\n/g, ' ');
      l_text = l_text.replace(/\n/g, ' ');
      //year
      const parts = topic.split('/');
      const year = parts.length > 1 ? parts[1].trim() : '';

      // Assuming .print_item_law is within each list item
      const lawItems = await item.$$('.print_item_law li');
      for (const lawItem of lawItems) {
        // Get text from the second span, if it exists
        const secondSpanText = await lawItem.$eval('span:nth-of-type(2)', span => span.textContent).catch(() => '');
        // Get text from the third span, if it exists
        const thirdSpanText = await lawItem.$eval('span:nth-of-type(3)', span => span.textContent).catch(() => '');

        // Print out the texts from the second and third span elements
        csvLawContent += `"${doc_id}";"${secondSpanText}";"${thirdSpanText}"\n`;
      }

      // Append the fetched data to the CSV string
      csvDekaContent += `"${topic}";"${doc_id}";"${s_text}";"${l_text}";"${pageNumber}";"${year}"\n`;
    }

    // Check for the "Next Page" button and click if available
    const nextPageButtonSelector = 'a:has(> span.glyphicon.glyphicon-chevron-right):not(:has(> span:nth-of-type(2)))';
    const nextPageButton = await page.$(nextPageButtonSelector);
    if (nextPageButton) {
      await nextPageButton.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });
    } else {
      hasNextPage = false; // Stop the loop if "Next Page" button is not found
    }
  }

  // Step 5: Take a screenshot of the new page
  await page.screenshot({ path: 'new_page_screenshot.png' });

  // Write the CSV string to a file
  fs.writeFileSync('deka.csv', csvDekaContent);
  // Write the CSV string to a file
  fs.writeFileSync('law.csv', csvLawContent);



  // Step 5: Take a screenshot of the new page
  await page.screenshot({ path: 'new_page_screenshot.png' });

  await browser.close();
}

run();