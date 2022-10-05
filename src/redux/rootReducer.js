import { combineReducers } from 'redux';
import currencyReducer from './currency/currencyReducer';
import graphReducer from './graph/graphReducer';
import cryptoReducer from './crypto/cryptoReducer';

const rootReducer = combineReducers({
  currency: currencyReducer,
  graph: graphReducer,
  crypto: cryptoReducer,
});

export default rootReducer;
