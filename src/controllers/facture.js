const pupetter = require('puppeteer');
const path = require('path');
const ejs = require('ejs');
const { v4: uuidv4 } = require('uuid');

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

let uuid = uuidv4();

module.exports = {
  get: async (req, res) => {
    const fileLocation = path.join(__dirname, '../templates/', 'bill.ejs');
    const where = path.join(__dirname, '../saveFile/invoices', uuid + '.pdf');
    const html = await ejs.renderFile(fileLocation, { students });
    const browser = await pupetter.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    await page.pdf({ path: where, format: 'A4' });
    await browser.close();
    res.download(where);
  },
};
