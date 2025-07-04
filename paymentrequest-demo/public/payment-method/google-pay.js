/**
 * Set up Google Pay
 **/
const gp_button = document.querySelector('#google-pay');

const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0
};

const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    "gateway":"stripe",
    "stripe:publishableKey":"pk_test_fkdoiK6FR5BLZMFNbSGoDjpn",
    "stripe:version":"2018-10-31"
  }
};

const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
    allowedCardNetworks: ["JCB", "MASTERCARD", "VISA"]
  }
};

const cardPaymentMethod = Object.assign(
  { tokenizationSpecification: tokenizationSpecification },
  baseCardPaymentMethod
);

let paymentsClient = null;

function getGoogleIsReadyToPayRequest() {
  return Object.assign(
      {},
      baseRequest,
      {
        allowedPaymentMethods: [baseCardPaymentMethod]
      }
  );
}

function getGooglePaymentDataRequest() {
  const paymentDataRequest = Object.assign({}, baseRequest);
  paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
  paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
  paymentDataRequest.merchantInfo = {
    // @todo a merchant ID is available for a production environment after approval by Google
    // See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
    // merchantId: '01234567890123456789',
    merchantName: 'Merchant Demo'
  };
  // paymentDataRequest.shippingAddressRequired = true;
  // paymentDataRequest.shippingAddressParameters = shippingOptions;
  // paymentDataRequest.shippingOptionRequired = true;
  return paymentDataRequest;
}

function getGooglePaymentsClient() {
  if ( paymentsClient === null ) {
    paymentsClient = new google.payments.api.PaymentsClient({environment: 'TEST'});
  }
  return paymentsClient;
}

// function onGooglePayLoaded() {
//   const paymentsClient = getGooglePaymentsClient();
//   addGooglePayButton();
  // paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
  //     .then(function(response) {
  //       if (response.result) {
  //         addGooglePayButton();
  //         // @todo prefetch payment data to improve performance after confirming site functionality
  //         // prefetchGooglePaymentData();
  //       }
  //     })
  //     .catch(function(err) {
  //       // show error in developer console for debugging
  //       console.error(err);
  //     });
// }

function onGooglePayLoaded() {
  paymentsClient = new google.payments.api.PaymentsClient({environment: 'TEST'});
  const button =
      paymentsClient.createButton({
        onClick: onGooglePaymentButtonClicked,
        buttonType: 'short'
      });
  gp_button.appendChild(button);
}

function getGoogleTransactionInfo() {
  return {
    currencyCode: 'USD',
    totalPriceStatus: 'FINAL',
    // set to cart total
    totalPrice: '65.00'
  };
}

function prefetchGooglePaymentData() {
  const paymentDataRequest = getGooglePaymentDataRequest();
  // transactionInfo must be set but does not affect cache
  paymentDataRequest.transactionInfo = {
    totalPriceStatus: 'NOT_CURRENTLY_KNOWN',
    currencyCode: 'USD'
  };
  // const paymentsClient = getGooglePaymentsClient();
  paymentsClient.prefetchPaymentData(paymentDataRequest);
}

function processPayment(paymentData) {
  // show returned data in developer console for debugging
    console.log(paymentData);
  // @todo pass payment token to your gateway to process payment
  const paymentToken = paymentData.paymentMethodData.tokenizationData.token;
}

async function onGooglePaymentButtonClicked(e) {
  const paymentDataRequest = getGooglePaymentDataRequest();
  paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

  const paymentsClient = getGooglePaymentsClient();
  try {
    const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest)
    console.log(paymentData);
    processPayment(paymentData);
    alert('Payment accepted!');
  } catch (e) {
    console.error(e);
    toast('Payment failed!');
  }
}
