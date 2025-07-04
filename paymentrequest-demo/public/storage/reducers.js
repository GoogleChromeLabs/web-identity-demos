import { combineReducers } from 'https://unpkg.com/redux@4.0.5?module';

import {
  INIT_PAYMENT_METHODS,
  ADD_PAYMENT_METHOD,
  EDIT_SUPPORTED_METHODS,
  EDIT_PAYMENT_METHOD_DATA,
  REMOVE_PAYMENT_METHOD,
  INIT_TOTAL,
  EDIT_TOTAL_LABEL,
  EDIT_TOTAL_VALUE,
  EDIT_TOTAL_CURRENCY,
  INIT_DISPLAY_ITEMS,
  ADD_DISPLAY_ITEM,
  EDIT_DISPLAY_ITEM_LABEL,
  EDIT_DISPLAY_ITEM_VALUE,
  EDIT_DISPLAY_ITEM_CURRENCY,
  REMOVE_DISPLAY_ITEM,
  INIT_OPTIONS,
  EDIT_OPTIONS_NAME,
  EDIT_OPTIONS_PHONE,
  EDIT_OPTIONS_EMAIL,
  EDIT_OPTIONS_BILLING,
  EDIT_OPTIONS_SHIPPING,
  EDIT_OPTIONS_SHIPPING_TYPE,
  REMOVE_OPTIONS_SHIPPING_TYPE,
  INIT_SHIPPING_OPTIONS,
  ADD_SHIPPING_OPTION,
  EDIT_SHIPPING_OPTION_ID,
  EDIT_SHIPPING_OPTION_LABEL,
  EDIT_SHIPPING_OPTION_VALUE,
  EDIT_SHIPPING_OPTION_CURRENCY,
  EDIT_SHIPPING_OPTION_SELECTED,
  REMOVE_SHIPPING_OPTION,
  SHOW_RESULT
} from './actions.js';

/*
Example data structure:
{
  paymentMethods: [...],
  details: {
    displayItems: [...],
    total: {...},
    shippingOptions: [...]
  },
  options: {...},
}
*/

const request = (state = [], action) => {
  let { paymentMethods = [], details = {}, options = {} } = state;
  let { displayItems = [], total = {}, shippingOptions = [] } = details;

  switch (action.type) {
    case INIT_PAYMENT_METHODS:
      paymentMethods = [{
        supportedMethods: 'basic-card',
        data: `{
          "supportedNetworks": [ "visa", "master", "jcb" ]
        }`
      }, {
        supportedMethods: "https://google.com/pay",
        data: `{
          "environment": "TEST",
          "apiVersion": 2,
          "apiVersionMinor": 0,
          "merchantInfo": {
            "merchantName": "Merchant Demo"
          },
          "allowedPaymentMethods": [{
            "type": "CARD",
            "parameters": {
              "allowedAuthMethods": ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              "allowedCardNetworks": ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"]
            },
            "tokenizationSpecification": {
              "type": "PAYMENT_GATEWAY",
              "parameters": {
                "gateway":"stripe",
                "stripe:publishableKey":"pk_test_fkdoiK6FR5BLZMFNbSGoDjpn",
                "stripe:version":"2018-10-31"
              }
            }
          }]
        }`
      }, {
        supportedMethods: 'https://payment-handler-example2.appspot.com',
        data: '{}'
      }];
      return { ...state, paymentMethods }
    case ADD_PAYMENT_METHOD:
      paymentMethods = [...paymentMethods, {
          supportedMethods: '',
          data: ''
      }];
      return { ...state, paymentMethods };
    case EDIT_SUPPORTED_METHODS:
      paymentMethods = paymentMethods.map((paymentMethod, index) => {
        if (index === action.index) {
          return {...paymentMethod, supportedMethods: action.supportedMethods }
        }
        return paymentMethod;
      });
      return { ...state, paymentMethods };
    case EDIT_PAYMENT_METHOD_DATA:
      paymentMethods = paymentMethods.map((paymentMethod, index) => {
        if (index === action.index) {
          return {...paymentMethod, data: action.data }
        }
        return paymentMethod;
      });
      return { ...state, paymentMethods };
    case REMOVE_PAYMENT_METHOD:
      paymentMethods = paymentMethods.filter((_, index) => index !== action.index);
      return { ...state, paymentMethods };

    case INIT_DISPLAY_ITEMS:
      displayItems = [{
        label: 'Original Donation Amount',
        amount: { value: '10.00', currency: 'USD' }
      }];
      return { ...state, details: { displayItems, total, shippingOptions }};
    case ADD_DISPLAY_ITEM:
      displayItems = [
        ...displayItems,
        {
          label: '',
          amount: { value: '', currency: '' }
        }
      ];
      return { ...state, details: { displayItems, total, shippingOptions }};
    case EDIT_DISPLAY_ITEM_LABEL:
      displayItems = displayItems.map((displayItem, index) => {
        if (index === action.index) {
          return {
            label: action.label,
            amount: {
              value: displayItem.amount.value,
              currency: displayItem.amount.currency
            }
          }
        }
        return displayItem;
      });
      return { ...state, details: { displayItems, total, shippingOptions }};
    case EDIT_DISPLAY_ITEM_VALUE:
      displayItems = displayItems.map((displayItem, index) => {
        if (index === action.index) {
          return {
            label: displayItem.label,
            amount: {
              value: action.value,
              currency: displayItem.amount.currency
            }
          }
        }
        return displayItem;
      });
      return { ...state, details: { displayItems, total, shippingOptions }};
    case EDIT_DISPLAY_ITEM_CURRENCY:
      displayItems = displayItems.map((displayItem, index) => {
        if (index === action.index) {
          return {
            label: displayItem.label,
            amount: {
              value: displayItem.amount.value,
              currency: action.currency
            }
          }
        }
        return displayItem;
      });
      return { ...state, details: { displayItems, total, shippingOptions }};
    case REMOVE_DISPLAY_ITEM:
      displayItems = displayItems.filter((_, index) => index !== action.index);
      return { ...state, details: { displayItems, total, shippingOptions }};


    case INIT_TOTAL:
      total = {
        label: 'Total',
        amount: { value: '10.00', currency: 'USD' }
      }
      return { ...state, details: { displayItems, total, shippingOptions }};
    case EDIT_TOTAL_LABEL:
      total = {
        label: action.total,
        amount: {
          value: total.amount.value,
          currency: total.amount.currency
        }
      };
      return { ...state, details: { displayItems, total, shippingOptions }};
    case EDIT_TOTAL_VALUE:
      total = {
        label: total.label,
        amount: {
          value: action.value,
          currency: total.amount.currency
        }
      };
      return { ...state, details: { displayItems, total, shippingOptions }};
    case EDIT_TOTAL_CURRENCY:
      total = {
        label: total.label,
        amount: {
          value: total.amount.value,
          currency: action.currency
        }
      };
      return { ...state, details: { displayItems, total, shippingOptions }};

    case INIT_SHIPPING_OPTIONS:
      shippingOptions = [{
        id: 'standard',
        label: 'Standard',
        amount: { value: '0.00', currency: 'USD' },
        selected: true
      }, {
        id: 'express',
        label: 'Express',
        amount: { value: '5.00', currency: 'USD' }
      }, {
        id: 'international',
        label: 'International',
        amount: { value: '10.00', currency: 'USD' }
      }]
      return { ...state, details: { displayItems, total, shippingOptions }};
    case ADD_SHIPPING_OPTION:
      shippingOptions = [
        ...shippingOptions,
        {
          id: '',
          label: '',
          amount: { value: '', currency: '' },
          selected: false              
        }
      ];
      return { ...state, details: { displayItems, total, shippingOptions }};
    case EDIT_SHIPPING_OPTION_ID:
      shippingOptions = shippingOptions.map((shippingOption, index) => {
        if (index === action.index) {
          return { ...shippingOption, id: action.id }
        }
        return shippingOption;
      });
      return { ...state, details: { displayItems, total, shippingOptions }};
    case EDIT_SHIPPING_OPTION_LABEL:
      shippingOptions = shippingOptions.map((shippingOption, index) => {
        if (index === action.index) {
          return { ...shippingOption, label: action.label }
        }
        return shippingOption;
      });
      return { ...state, details: { displayItems, total, shippingOptions }};
    case EDIT_SHIPPING_OPTION_VALUE:
      shippingOptions = shippingOptions.map((shippingOption, index) => {
        if (index === action.index) {
          return { ...shippingOption,
            amount: {
              value: action.value,
              currency: shippingOption.amount.currency
            }
          }
        }
        return shippingOption;
      });
      return { ...state, details: { displayItems, total, shippingOptions }};
    case EDIT_SHIPPING_OPTION_CURRENCY:
      shippingOptions = shippingOptions.map((shippingOption, index) => {
        if (index === action.index) {
          return { ...shippingOption,
            amount: {
              value: shippingOption.amount.value,
              currency: action.currency
            }
          }
        }
        return shippingOption;
      });
      return { ...state, details: { displayItems, total, shippingOptions }};
    case EDIT_SHIPPING_OPTION_SELECTED:
      shippingOptions = shippingOptions.map((shippingOption, index) => {
        if (index === action.index) {
          return { ...shippingOption, selected: action.selected }
        }
        return shippingOption;
      });
      return { ...state, details: { displayItems, total, shippingOptions }};
    case REMOVE_SHIPPING_OPTION:
      shippingOptions = shippingOptions.filter((_, index) => index !== action.index);
      return { ...state, details: { displayItems, total, shippingOptions }};

    case INIT_OPTIONS:
      options = {
        requestPayerName: false,
        requestPayerPhone: false,
        requestPayerEmail: false,
        requestBillingAddress: false,
        requestShipping: false
      }
      return { ...state, options };
    case EDIT_OPTIONS_NAME:
      options = { ...options, requestPayerName: action.checked }
      return { ...state, options };
    case EDIT_OPTIONS_PHONE:
      options = { ...options, requestPayerPhone: action.checked }
      return { ...state, options };
    case EDIT_OPTIONS_EMAIL:
      options = { ...options, requestPayerEmail: action.checked }
      return { ...state, options };
    case EDIT_OPTIONS_BILLING:
      options = { ...options, requestBillingAddress: action.checked }
      return { ...state, options };
    case EDIT_OPTIONS_SHIPPING:
      options = { ...options, requestShipping: action.checked }
      return { ...state, options };
    case EDIT_OPTIONS_SHIPPING_TYPE:
      options = { ...options, shippingType: action.shippingType }
      return { ...state, options };
    case REMOVE_OPTIONS_SHIPPING_TYPE:
      delete options.shippingType;
      return { ...state, options };

    default:
      return state;
  }
}

const result = (state = [], action) => {
  switch (action.type) {
    case SHOW_RESULT:
      return action.result;
    default:
      return state;
  }
}

export const PaymentRequestApp = combineReducers({
  request,
  result
});
