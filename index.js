const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false
    });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://www.amazon.com/gp/goldbox/?ie=UTF8&deals-widget=%257B%2522version%2522%253A1%252C%2522viewIndex%2522%253A0%252C%2522presetId%2522%253A%252219A70421F1B18305BA3C837E25E8FDF9%2522%252C%2522departments%2522%253A%255B%2522541966%2522%255D%252C%2522sorting%2522%253A%2522FEATURED%2522%257D&pd_rd_w=7OzDo&content-id=amzn1.sym.3a6a1f11-a96c-444b-b219-97322616eb92&pf_rd_p=3a6a1f11-a96c-444b-b219-97322616eb92&pf_rd_r=1QHXZ341R5HTMBKRR57H&pd_rd_wg=CYLvj&pd_rd_r=4cd5f4af-7578-4ebb-a106-12501ee7175c&ref_=pd_gw_unk#dealsGridLinkAnchor');

    // query for and element handle
    const element = await page.waitForSelector('div > .class-name');

    // Do something with element
    await element.click();

    // Dispose of handle
    await element.dispose();

    await browser.close();
})();

