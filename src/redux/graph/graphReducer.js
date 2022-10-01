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
    case actions.CHANGE_CRYPTO_LIST:
      if (state.cryptoList.includes(action.payload.crypto)) {
        return {
          ...state,
          cryptoList: state.cryptoList.filter(
            (crypto) => crypto != action.payload.crypto
          ),
        };
      }
      return {
        ...state,
        cryptoList: [...state.cryptoList, action.payload.crypto],
      };
    case actions.CHANGE_CRYPTO_DATA:
      console.log('Change crypto data reducer');
      return {
        ...state,
        cryptoData: [
          ...state.cryptoData,
          { id: action.payload.id, data: action.payload.data },
        ],
      };

    default:
      return state;
  }
};

export default graphReducer;
