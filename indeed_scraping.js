const { launchBrowser, goToPage, saveToFile } = require('./utils/helper');

(async () => {
    // launched browser and page 
    const browser = await launchBrowser();
    const page = await browser.newPage();
    console.log('Browser and page launched succesfully!')

    // Set up the URL for Indeed with a query for "software developer" jobs
    const jobQuery = encodeURIComponent('software developer');
    let jobs = [];
    let paginate = 0;
    console.log('Please wait data is loading...');

    while (paginate <= 50) {
        const url = `https://www.indeed.com/jobs?q=${jobQuery}&start=${paginate}`;
        await goToPage(page, url);

        // Wait for the job listings to be loaded
        await page.waitForSelector('.job_seen_beacon');

        // Extract job titles,locations,joblink,published date, description from the page
        const newJobs = await page.evaluate(() => {
            const jobCards = Array.from(document.querySelectorAll('.job_seen_beacon'));
            return jobCards.map(card => {
                // for each job find titile, location, joblink, publish date, description
                const title = card.querySelector('.jobTitle a').innerText || 'N/A';
                const location = card.querySelector('.company_location').innerText || 'N/A';
                const joblink = card.querySelector('.jobTitle a').href || 'N/A';
                const publishedDate = card.querySelector('.date').innerText || 'N/A';
                const description = Array.from(card.querySelectorAll('.heading6 ul li')).map(li => li.innerText).join('\n') || 'N/A';

                return { title, location, joblink, publishedDate, description };
            });
        });
        jobs = jobs.concat(newJobs);
        paginate += 10;
    }
    console.log('All data loaded succesfully!!');

    // save the file in json format
    await saveToFile(jobs, 'data/indeed.json');

    // Close the browser
    await browser.close();
})();