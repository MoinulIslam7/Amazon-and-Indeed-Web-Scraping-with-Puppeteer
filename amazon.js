const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
      userDataDir: './tmp'
  });
  const page = await browser.newPage();

  await page.goto('https://www.amazon.com/s?k=gaming+laptop');

  const laptops = await page.$$('.s-result-item');

  let laptomItems = [];

  for (const laptop of laptops) {
    let title = null;
    let priceDollar = null;
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
      priceDollar = await page.evaluate(el => el.querySelector('span .a-price > .a-offscreen')?.textContent, laptop);
    } catch(err) {
      console.log('no price found for this element');
    }

    // for each element try to retrieve the image url
    try {
      image = await page.evaluate(el => el.querySelector('.s-image').getAttribute('src'), laptop);
    } catch(err) {
      // console.log('no image found for element');
    }
    
    // for each element try to receive page URL
    try {
      url = await page.evaluate(el => el.querySelector('.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal').href, laptop);
    } catch (err) {
      console.log('No URL found for this element');
    }
    if (title !== null && title!==undefined) {
      laptomItems.push({
        title: title,
        price: priceDollar,
        imageUrl: image,
        pageUrl: url
      });
    }
  }
  console.log(laptomItems);
  // await browser.close();
})();