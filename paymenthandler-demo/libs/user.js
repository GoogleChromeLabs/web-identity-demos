const express = require('express');
const router = express.Router();

const email = 'chromedemojp@gmail.com';
const name = 'Janelle Murrels';
const phone = '+1-628-758-8074';

const addresses = [
  {
    id: 'address-1',
    label: 'US address',
    selected: true,
    addressLine: [
      '1600 Amphitheatre Parkway',
    ],
    city: 'Mountain View',
    country: 'US',
    dependentLocality: '',
    organization: 'Google',
    phone: phone,
    postalCode: '94043',
    recipient: name,
    region: 'CA',
    sortingCode: '',
  }, {
    id: 'address-2',
    label: 'SG address',
    selected: false,
    addressLine: [
      '70 Pasir Panjang Road',
      '#03-71',
    ],
    city: '',
    country: 'SG',
    dependentLocality: '',
    organization: 'Google Singapore',
    phone: '+65-6521-8000',
    postalCode: '117371',
    recipient: name,
    region: 'Mapletree Business City',
    sortingCode: '',
  }, {
    id: 'address-3',
    label: 'JP address',
    selected: false,
    addressLine: [
      'Shibuya Stream, 3-21-3 Shibuya',
    ],
    city: '',
    country: 'JP',
    dependentLocality: '',
    organization: 'Google Japan',
    phone: '+81-3-6384-9000',
    postalCode: '150-0002',
    recipient: name,
    region: 'Tokyo',
    sortingCode: '',
  }
];

const paymentMethods = [{
  id: `credit-card-1`,
  label: 'Credit Card: ****1234',
  paymentMethod: 'https://card-issuer.example',
  methodDetails: {
    billingAddress: addresses[0]
  }
}, {
  id: `credit-card-2`,
  label: 'Credit Card: ****5678',
  paymentMethod: 'https://card-issuer.example',
  methodDetails: {
    billingAddress: addresses[1]
  }
}, {
  id: `bank-card-1`,
  label: `Bank X: ******456`,
  paymentMethod: 'https://bank.example',
  methodDetails: {
    billingAddress: addresses[2]
  }
}];

router.get('/shipping-addresses', (req, res) => {
  res.json(addresses);
});

router.get('/payment-instruments', (req, res) => {
  res.json(paymentMethods);
});

router.get('/contacts', (req, res) => {
  res.json({ name, phone, email });
});

module.exports = router;
