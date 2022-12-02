let express = require('express');
let app = express();
let ejs = require('ejs');
let path = require('path');
let html_to_pdf = require('html-pdf-node');
let options = { format: 'A4' };
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
  generateBill: (req, res) => {
    const fileLocation = path.join(__dirname, '../templates/', 'bill.ejs');
    const where = path.join(__dirname, './invoices/', req.params.id + '.pdf');

    console.log(fileLocation);
    console.log(__dirname);
    ejs.renderFile(fileLocation, { students: students }, (err, html) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        html_to_pdf
          .generatePdf({ content: html }, options)
          .then((pdfBuffer) => {
            res.contentType('application/pdf');
            res.send(pdfBuffer);
          })
          .catch((error) => {
            console.log(error);
            res.send(error);
          });
      }
    });
  },

  getFromFile: (req, res) => {
    const { download = null } = req.query;
    const where = path.join(__dirname, './invoices/', req.params.id + '.pdf');
    if (download) {
      res.download(where);
    } else {
      res.sendFile(where);
    }
  },
};
