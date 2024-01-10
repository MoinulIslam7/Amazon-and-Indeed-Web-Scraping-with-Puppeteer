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

  const laptops = await page.$$('.s-result-item');

  let laptopItems = [];
  // let isBtnDisables = false;
  // while (isBtnDisables) {
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
      console.log('no image found for element');
    }

    // for each element try to receive page URL
    try {
      url = await page.evaluate(el => el.querySelector('.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal').href, laptop);
    } catch (err) {
      console.log('No URL found for this element');
    }
    if (title !== null && title !== undefined) {
      laptopItems.push({ title: title, price: price, imageUrl: image, pageUrl: url });

      // save file in csv
      // fs.appendFile('result.csv', `${title}, ${price}, ${image}, ${url}`, function (err) {
      //   if (err) throw err;
      // });
    }
  }

  // 
  fs.writeFile('result.json', JSON.stringify(laptopItems, null, 2), (err) => {
    if (err) throw err;
    console.log('Data has been saved to result.json');
  });

  // await page.waitForSelector('li .a-list', { visible: true });

  // const isDisabled = await page.$('li .a-disabled .a-last') !== null;
  // isBtnDisables = isDisabled;
  // if (!isDisabled) {
  //   await page.click("li .a-last");
  // }
  // }

  // console.log(laptomItems);
  // await browser.close();
})();