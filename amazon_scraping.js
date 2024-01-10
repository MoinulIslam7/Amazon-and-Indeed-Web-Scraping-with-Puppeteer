const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: './tmp'
  });
  const page = await browser.newPage();

  await page.goto('https://www.amazon.com/s?k=gaming+laptop');


  let laptopItems = [];
  let isBtnDisabled = false;

  let laptops = await page.$$('.s-result-item');
  while (!isBtnDisabled) {
    for (const laptop of laptops) {
      let title = null;
      let price = null;
      let image = null;
      let url = null;

      // for each element attempt to retrieve the title if there is one (some elements in here may not have a title)
      try {
        title = await page.evaluate(el => el.querySelector('div > h2 > a > span')?.textContent, laptop);
      } catch (err) {
        console.log('no title found for this element');
        console.log(err);
      }

      // for each element try to retrieve the price
      try {
        price = await page.evaluate(el => el.querySelector('span .a-price > .a-offscreen')?.textContent, laptop);
      } catch (err) {
        console.log('no price found for this element');
      }

      // for each element try to retrieve the image url
      try {
        image = await page.evaluate(el => el.querySelector('.s-image').getAttribute('src'), laptop);
      } catch (err) {
        // console.log('no image found for element');
      }

      // for each element try to receive page URL
      try {
        url = await page.evaluate(el => el.querySelector('.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal').href, laptop);
      } catch (err) {
        // console.log('No URL found for this element');
      }

      if (title !== null && title !== undefined) {
        laptopItems.push({ title: title, price: price, imageUrl: image, pageUrl: url });
        // save file in csv
        // fs.appendFile('result.csv', `${title}, ${price}, ${image}, ${url}`, function (err) {
        //   if (err) throw err;
        // });
      }
    }

    // const something = await page.waitForSelector('div > span > a.s-pagination-item.s-pagination-button', { visible: true });
    // console.log('Something', something);
    const isDisabled = await page.$('div > span > span.s-pagination-item.s-pagination-next.s-pagination-disabled') !== null;
    isBtnDisabled = isDisabled;

    if (!isDisabled) {
      try {
        await page.waitForSelector('div > span > a.s-pagination-item.s-pagination-button', { visible: true }),
          await Promise.all([
            // Wait for navigation to complete
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
            page.click('div > span > a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator'),
          ]);
      } catch (e) {
        // console.log(e);
      }
    }
  }


  // save file in json format
  fs.writeFile('result.json', JSON.stringify(laptopItems, null, 2), (err) => {
    if (err) throw err;
    console.log('Data has been saved to result.json. Total Data:', laptopItems.length);
  });

  await browser.close();
})();

// related class 
// parent class="s-pagination-strip"
// class="s-pagination-item s-pagination-next s-pagination-button s-pagination-separator"
// class="s-pagination-item s-pagination-next s-pagination-disabled "

