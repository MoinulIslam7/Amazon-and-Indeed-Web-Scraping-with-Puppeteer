// utils.js
const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function launchBrowser() {
    return puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: './tmp'
    });
}

async function goToPage(page, url) {
    await page.goto(url);
}


async function saveToFile(data, filePath) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log(`Data has been saved to ${filePath}. Total Data: ${data.length}`);
}

module.exports = {
    launchBrowser,
    goToPage,
    saveToFile,
};
