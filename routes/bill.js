const express = require('express');
const router = express.Router();
let auth = require('../services/authentication');
const ejs = require('ejs');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

router.post('/generateReport', auth.authenticateToken, async (req, res) => {
  console.log('Passe 0');
  const generatedUuid = uuid.v1();
  const orderDetails = req.body;
  let productDetailsReport = JSON.parse(orderDetails.productDetails);
  const t = await sequelize.transaction();
  try {
    const billCreate = await Bill.create(
      {
        uuid: generatedUuid,
        name: orderDetails.name,
        email: orderDetails.email,
        contactNumber: orderDetails.contactNumber,
        paymentMethod: orderDetails.paymentMethod,
        total: orderDetails.total,
        productDetails: orderDetails.productDetails,
        createdBy: res.locals.email,
      },
      {
        transaction: t,
      }
    );
    console.log('Passe 1');
    if (billCreate) {
      ejs.renderFile(
        path.join(__dirname, '', 'report.ejs'),
        { productDetailsReport, orderDetails },
        (err, data) => {
          if (err) {
            res.send(err);
          } else {
            let options = {
              height: '11.25in',
              width: '8.5in',
              headerTemplate: '<p></p>',
              footerTemplate: '<p></p>',
              displayHeaderFooter: false,
              margin: {
                top: '0.5in',
                bottom: '0.5in',
              },
              printBackground: true,
              path: `./generated_pdf/${generatedUuid}.pdf`,
              format: 'A4',
              landscape: false,
              preferCSSPageSize: true,
            };
            puppeteer.launch().then(function (browser) {
              browser.newPage().then(function (page) {
                page.setContent(data).then(function () {
                  page.pdf(options).then(function () {
                    browser.close();
                    res.send({
                      message: 'Report Generated Successfully',
                      pdfPath: `http://localhost:8000/${generatedUuid}.pdf`,
                    });
                  });
                });
              });
            });
          }
        }
      );
      console.log('Passe 2');
    } else {
      console.log('Failed to generate report');
      // res.status(500).json(err);
    }
  } catch (err) {
    console.log('Failed to generate report');
  }
});

module.exports = router;
