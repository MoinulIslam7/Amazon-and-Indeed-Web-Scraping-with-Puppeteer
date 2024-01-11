// main.js
const { launchBrowser, goToPage, saveToFile } = require('./utils/helper');

(async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  console.log('Browser and page launched succesfully!')

  const url = 'https://www.amazon.com/s?k=gaming+laptop';
  await goToPage(page, url);

  let laptopItems = [];
  let isBtnDisabled = false;
  console.log('Please wait data is loading...');

  let laptops = await page.$$('.s-result-item');
  while (!isBtnDisabled) {
    for (const laptop of laptops) {
      let title = null;
      let price = null;
      let image = null;
      let url = null;
      let review = null;
      let delivery = null;

      // for each element attempt to retrieve the title if there is one (some elements in here may not have a title)
      try {
        title = await page.evaluate(el => el.querySelector('div > h2 > a > span')?.textContent, laptop);
      } catch (err) {
        console.log('no title found for this element');
        console.log(err);
      }

      // for each element try to retrieve the price, image, url, review, delivery data
      try {
        price = await page.evaluate(el => el.querySelector('span .a-price > .a-offscreen')?.textContent, laptop);
        image = await page.evaluate(el => el.querySelector('.s-image').getAttribute('src'), laptop);
        url = await page.evaluate(el => el.querySelector('.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal').href, laptop);
        review = await page.evaluate(el => el.querySelector('div.a-section.a-spacing-none.a-spacing-top-micro')?.textContent, laptop);
        delivery = await page.evaluate(el => el.querySelector('div.s-align-children-center')?.textContent, laptop);
      } catch (err) {

        console.log('Something Went Wrong');
      }

      if (title !== null && title !== undefined) {
        laptopItems.push({
          title: title,
          price: price,
          imageUrl: image,
          pageUrl: url,
          review: review,
          delivery: delivery,
        });
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
  console.log('All data loaded succesfully!!');

  // save data into json file
  await saveToFile(laptopItems, 'data/amazon.json');

  await browser.close();
})();
