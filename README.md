# Amazon Web Scraping with Puppeteer

This project demonstrates web scraping capabilities using Puppeteer, a Node.js library, to extract information from Amazon's website, specifically focusing on gaming laptops in search results.

## Introduction

The goal of this project is to gather essential details about gaming laptops available on Amazon, including their titles, prices, images, and corresponding page URLs. Puppeteer is employed to navigate through the search results, extract relevant data, and store it in various formats for further analysis.

## Prerequisites

Ensure you have Node.js installed. If not, download and install it from the [official Node.js website](https://nodejs.org/).

## Getting Started

1. Clone or download this repository.

2. Install the necessary dependencies:

    ```bash
    npm install puppeteer
    ```

## Running the Script

Execute the script by running the following command in your terminal:

```bash
node amazon_scraping.js

## Output

After running the scraping script (`amazon_scraping.js`), the extracted data will be stored in two different formats:

- **JSON**: The information gathered from Amazon's search results, including laptop titles, prices, images, and page URLs, will be saved in a structured JSON format within the `result.json` file.

- **CSV**: Although the script contains commented-out code for saving data to a CSV file (`result.csv`), by uncommenting this code within the script, users can also obtain the scraped information in a comma-separated values (CSV) format.

Please note that the JSON file (`result.json`) will contain a structured representation of the scraped data, whereas the CSV file (`result.csv`) can be enabled within the script for a tabular representation of the same information.
