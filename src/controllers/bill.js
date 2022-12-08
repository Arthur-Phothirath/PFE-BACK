const pupetter = require('puppeteer');
const path = require('path');
const ejs = require('ejs');

let students = [
  {
    name: 'Joy',
    email: 'joy@example.com',
    city: 'New York',
    country: 'USA',
  },
  {
    name: 'John',
    email: 'John@example.com',
    city: 'San Francisco',
    country: 'USA',
  },
  {
    name: 'Clark',
    email: 'Clark@example.com',
    city: 'Seattle',
    country: 'USA',
  },
  {
    name: 'Watson',
    email: 'Watson@example.com',
    city: 'Boston',
    country: 'USA',
  },
  {
    name: 'Tony',
    email: 'Tony@example.com',
    city: 'Los Angels',
    country: 'USA',
  },
];

module.exports = {
  get: async (req, res) => {
    const fileLocation = path.join(__dirname, '../templates/', 'bill.ejs');
    const html = await ejs.renderFile(fileLocation, { students });
    const browser = await pupetter.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();
    res.contentType('application/pdf');
    res.send(pdf);
  },
};
