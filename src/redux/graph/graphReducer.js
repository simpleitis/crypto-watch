import * as actions from './graphType';

const initialState = {
  period: 10,
  cryptoList: [],
  cryptoData: [],
};

const graphReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHANGE_PERIOD:
      return {
        ...state,
        period: action.payload.period,
      };
    case actions.ADD_TO_CRYPTO_LIST:
      return {
        ...state,
        cryptoList: [...state.cryptoList, action.payload.crypto],
      };
    case actions.DELETE_FROM_CRYPTO_LIST:
      return {
          ...state,
          cryptoList: state.cryptoList.filter(
            (crypto) => crypto !== action.payload.crypto
          ),
        };
    case actions.ADD_CRYPTO_DATA:
      return {
        ...state,
        cryptoData: [
          ...state.cryptoData,
          { id: action.payload.id, data: action.payload.data },
        ],
      };
    case actions.DELETE_CRYPTO_DATA:
      return {...state, cryptoData:state.cryptoData.filter((crypto) => crypto.id !== action.payload.id)}

    default:
      return state;
  }
};

export default graphReducer;
