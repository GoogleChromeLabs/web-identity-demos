export const INIT = 'INIT';
export const INIT_PAYMENT_METHODS = 'INIT_PAYMENT_METHODS';
export const ADD_PAYMENT_METHOD = 'ADD_PAYMENT_METHOD';
export const EDIT_SUPPORTED_METHODS = 'EDIT_SUPPORTED_METHODS';
export const EDIT_PAYMENT_METHOD_DATA = 'EDIT_PAYMENT_METHOD_DATA';
export const REMOVE_PAYMENT_METHOD = 'REMOVE_PAYMENT_METHOD';

export const INIT_TOTAL = 'INIT_TOTAL';
export const EDIT_TOTAL_LABEL = 'EDIT_TOTAL_LABEL';
export const EDIT_TOTAL_VALUE = 'EDIT_TOTAL_VALUE';
export const EDIT_TOTAL_CURRENCY = 'EDIT_TOTAL_CURRENCY';

export const INIT_DISPLAY_ITEMS = 'INIT_DISPLAY_ITEMS';
export const ADD_DISPLAY_ITEM = 'ADD_DISPLAY_ITEM';
export const EDIT_DISPLAY_ITEM_LABEL = 'EDIT_DISPLAY_ITEM_LABEL';
export const EDIT_DISPLAY_ITEM_VALUE = 'EDIT_DISPLAY_ITEM_VALUE';
export const EDIT_DISPLAY_ITEM_CURRENCY = 'EDIT_DISPLAY_ITEM_CURRENCY';
export const REMOVE_DISPLAY_ITEM = 'REMOVE_DISPLAY_ITEM';

export const INIT_OPTIONS = 'INIT_OPTIONS';
export const EDIT_OPTIONS_NAME = 'EDIT_OPTIONS_NAME';
export const EDIT_OPTIONS_PHONE = 'EDIT_OPTIONS_PHONE';
export const EDIT_OPTIONS_EMAIL = 'EDIT_OPTIONS_EMAIL';
export const EDIT_OPTIONS_BILLING = 'EDIT_OPTIONS_BILLING';
export const EDIT_OPTIONS_SHIPPING = 'EDIT_OPTIONS_SHIPPING';
export const EDIT_OPTIONS_SHIPPING_TYPE = 'EDIT_OPTIONS_SHIPPING_TYPE';
export const REMOVE_OPTIONS_SHIPPING_TYPE = 'REMOVE_OPTIONS_SHIPPING_TYPE';

export const INIT_SHIPPING_OPTIONS = 'INIT_SHIPPING_OPTIONS';
export const ADD_SHIPPING_OPTION = 'ADD_SHIPPING_OPTION';
export const EDIT_SHIPPING_OPTION_ID = 'EDIT_SHIPPING_OPTION_ID';
export const EDIT_SHIPPING_OPTION_LABEL = 'EDIT_SHIPPING_OPTION_LABEL';
export const EDIT_SHIPPING_OPTION_VALUE = 'EDIT_SHIPPING_OPTION_VALUE';
export const EDIT_SHIPPING_OPTION_CURRENCY = 'EDIT_SHIPPING_OPTION_CURRENCY';
export const EDIT_SHIPPING_OPTION_SELECTED = 'EDIT_SHIPPING_OPTION_SELECTED';
export const REMOVE_SHIPPING_OPTION = 'REMOVE_SHIPPING_OPTION';

export const SHOW_RESULT = 'SHOW_RESULT';

export const init = () => {
  return { type: INIT }
}

export const initPaymentMethods = () => {
  return { type: INIT_PAYMENT_METHODS }
}

export const addPaymentMethod = () => {
  return { type: ADD_PAYMENT_METHOD }
}

export const editSupportedMethods = (index, supportedMethods) => {
  return { type: EDIT_SUPPORTED_METHODS, index, supportedMethods }
}

export const editPaymentMethodData = (index, data) => {
  return { type: EDIT_PAYMENT_METHOD_DATA, index, data }
}

export const removePaymentMethod = (index) => {
  return { type: REMOVE_PAYMENT_METHOD, index }
}

export const initTotal = () => {
  return { type: INIT_TOTAL }
}

export const editTotalLabel = (index, label) => {
  return { type: EDIT_TOTAL_LABEL, index, label }
}

export const editTotalValue = (index, value) => {
  return { type: EDIT_TOTAL_VALUE, index, value }
}

export const editTotalCurrency = (index, currency) => {
  return { type: EDIT_TOTAL_CURRENCY, index, currency }
}

export const initDisplayItems = () => {
  return { type: INIT_DISPLAY_ITEMS }
}

export const addDisplayItem = () => {
  return { type: ADD_DISPLAY_ITEM }
}

export const editDisplayItemLabel = (index, label) => {
  return { type: EDIT_DISPLAY_ITEM_LABEL, index, label }
}

export const editDisplayItemValue = (index, value) => {
  return { type: EDIT_DISPLAY_ITEM_VALUE, index, value }
}

export const editDisplayItemCurrency = (index, currency) => {
  return { type: EDIT_DISPLAY_ITEM_CURRENCY, index, currency }
}

export const removeDisplayItem = (index) => {
  return { type: REMOVE_DISPLAY_ITEM, index }
}

export const initOptions = () => {
  return { type: INIT_OPTIONS }
}

export const editOptionsName = (checked) => {
  return { type: EDIT_OPTIONS_NAME, checked }
}

export const editOptionsPhone = (checked) => {
  return { type: EDIT_OPTIONS_PHONE, checked }
}

export const editOptionsEmail = (checked) => {
  return { type: EDIT_OPTIONS_EMAIL, checked }
}

export const editOptionsBilling = (checked) => {
  return { type: EDIT_OPTIONS_BILLING, checked }
}

export const editOptionsShipping = (checked) => {
  return { type: EDIT_OPTIONS_SHIPPING, checked }
}

export const editOptionsShippingType = (shippingType) => {
  return { type: EDIT_OPTIONS_SHIPPING_TYPE, shippingType }
}

export const removeOptionsShippingType = () => {
  return { type: REMOVE_OPTIONS_SHIPPING_TYPE }
}

export const initShippingOptions = () => {
  return { type: INIT_SHIPPING_OPTIONS }
}

export const addShippingOption = () => {
  return { type: ADD_SHIPPING_OPTION }
}

export const editShippingOptionId = (index, id) => {
  return { type: EDIT_SHIPPING_OPTION_ID, index, id }
}

export const editShippingOptionLabel = (index, label) => {
  return { type: EDIT_SHIPPING_OPTION_LABEL, index, label }
}

export const editShippingOptionValue = (index, value) => {
  return { type: EDIT_SHIPPING_OPTION_VALUE, index, value }
}

export const editShippingOptionCurrency = (index, currency) => {
  return { type: EDIT_SHIPPING_OPTION_CURRENCY, index, currency }
}

export const editShippingOptionSelected = (index, selected) => {
  return { type: EDIT_SHIPPING_OPTION_SELECTED, index, selected }
}

export const removeShippingOption = (index) => {
  return { type: REMOVE_SHIPPING_OPTION, index }
}

export const showResult = (result) => {
  return { type: SHOW_RESULT, result }
}
