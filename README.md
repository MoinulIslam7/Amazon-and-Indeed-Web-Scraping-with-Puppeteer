# Amazon & Indeed Web Scraping with Puppeteer

This project demonstrates web scraping capabilities using Puppeteer, a Node.js library, to extract information from both Amazon and Indeed websites. The focus is on gathering details about gaming laptops from Amazon and job listings from Indeed search results.

## Introduction

The goal of this project is to extract essential details from Amazon's gaming laptop search results and Indeed job listings. Puppeteer is employed to navigate through the pages, extract relevant data, and store it in various formats for further analysis.

## Prerequisites

Ensure you have Node.js installed. If not, download and install it from the [official Node.js website](https://nodejs.org/).

## Getting Started

1. Clone or download this repository.

2. Install the necessary dependencies:

    ```bash
    npm install puppeteer
    ```

## Running the Scripts

### Amazon Web Scraping

Execute the Amazon scraping script by running the following command in your terminal:

node amazon_scraping.js


### Indeed Web Scraping

Execute the Indeed scraping script by running the following command in your terminal:

node indeed_scraping.js



## Output

After running each scraping script, the extracted data will be stored in different formats:

- **JSON**: The information gathered from Amazon's gaming laptop search results and Indeed job listings will be saved in structured JSON format within their respective result files (amazon_result.json and indeed_result.json).

- **CSV**: Although the scripts contain commented-out code for saving data to CSV files (amazon_result.csv and indeed_result.csv), users can uncomment this code to obtain the scraped information in a comma-separated values (CSV) format.

Please note that the JSON files will contain a structured representation of the scraped data, whereas the CSV files can be enabled within the scripts for a tabular representation of the same information.