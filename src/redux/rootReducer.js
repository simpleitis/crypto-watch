import { combineReducers } from 'redux';
import currencyReducer from './currency/currencyReducer';
import graphReducer from './graph/graphReducer';

const rootReducer = combineReducers({
  currency: currencyReducer,
  graph: graphReducer,
});

export default rootReducer;
