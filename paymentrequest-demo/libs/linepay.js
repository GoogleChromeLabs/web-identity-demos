const line_pay = require('line-pay');
const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const cache = require('memory-cache');

const linepay = new line_pay({
    channelId: process.env.LINEPAY_CHANNEL_ID,
    channelSecret: process.env.LINEPAY_SECRET_KEY,
    hostname: 'sandbox-api-pay.line.me',
    isSandbox: true
});

router.post('/reserve', (req, res) => {
  const options = {
    productName: req.body.item,
    amount: req.body.price,
    currency: req.body.currency,
    orderId: uuid(),
    confirmUrl: `${process.env.ORIGIN}${process.env.LINEPAY_CONFIRM_PATH}`
  }

  linepay.reserve(options).then((response) => {
    const reservation = options;
    reservation.transactionId = response.info.transactionId;

    console.log(`Reservation was made. Detail is following.`);
    console.log(reservation);

    // Save order information
    cache.put(reservation.transactionId, reservation);

    res.redirect(response.info.paymentUrl.web);
  }).catch(e => {
    console.error(e);
    res.redirect('/?error');
  });
});

router.get("/confirm", (req, res) => {
  if (!req.query.transactionId){
    throw new Error("Transaction Id not found.");
  }

  // Retrieve the reservation from database.
  let reservation = cache.get(req.query.transactionId);
  if (!reservation){
    throw new Error("Reservation not found.");
  }

  console.log(`Retrieved following reservation.`);
  console.log(reservation);

  let confirmation = {
    transactionId: req.query.transactionId,
    amount: reservation.amount,
    currency: reservation.currency
  }

  console.log(`Going to confirm payment with following options.`);
  console.log(confirmation);

  linepay.confirm(confirmation).then((response) => {
    res.send("Payment complete");
  });
});

module.exports = router;
