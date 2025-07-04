const express = require('express');
const router = express();
const request = require('request');

const PAYPAL_BASEURL = 'https://api.sandbox.paypal.com';
// const credential = `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64')}`;

router.post('/reserve', async (req, res) => {
  request(`${PAYPAL_BASEURL}/v1/payments/payment`, {
    auth: {
      user: process.env.PAYPAL_CLIENT_ID,
      pass: process.env.PAYPAL_SECRET
    },
    body: {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      transactions: [{
        amount: {
          total: '65.00',
          currency: 'USD'
        }
      }],
      redirect_urls: {
        return_url: `${process.env.ORIGIN}${process.env.PAYPAL_CONFIRM_PATH}`,
        cancel_url: `${process.env.ORIGIN}?error`
      }
    },
    json: true
  }, (err, response) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log(response.body);
      res.json({
        id: response.body.id
      });
    }
  });
});

router.post('/confirm', async (req, res) => {
  const paymentId = req.body.paymentId;
  const payerId = req.body.payerId;
  try {
    const response = await request(`${PAYPAL_BASEURL}/v1/payments/payment/${paymentId}/execute`, {
      auth: {
        user: process.env.PAYPAL_CLIENT_ID,
        pass: process.env.PAYPAL_SECRET
      },
      body: {
        payer_id: payerId,
        transactions: [{
          amount: {
            total: '65.00',
            currency: 'USD'
          }
        }]
      },
      // headers: {
      //   'Authorization': credential
      // },
      json: true
    });
    res.json({
      status: 'success'
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = router;