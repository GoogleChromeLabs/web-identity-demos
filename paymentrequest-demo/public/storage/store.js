import { createStore, applyMiddleware } from 'https://unpkg.com/redux@4.0.5?module';
import { persistence } from './persistence.js';
import { PaymentRequestApp } from './reducers.js';

export const store = createStore(PaymentRequestApp, applyMiddleware(persistence));
