import { UPDATE_CRYPTO_INFO } from './cryptoType';

const initialState = {
  cryptoInfo: [],
};


const cryptoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CRYPTO_INFO:
      return {
        ...state,
        cryptoInfo: action.payload.cryptoInfo
      };
    default:
      return state;
  }
};

export default cryptoReducer;
