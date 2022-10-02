import * as actions from './graphType';

export const changePeriod = (period) => {
  return {
    type: actions.CHANGE_PERIOD,
    payload: { period: period },
  };
};

export const addToCryptoList = (crypto) => {
  return {
    type: actions.ADD_TO_CRYPTO_LIST,
    payload: { crypto: crypto },
  };
};

export const deleteFromCryptoList = (crypto) => {
  return {
    type: actions.DELETE_CRYPTO_DATA,
    payload: {
      crypto: crypto,
    },
  };
};

export const addCryptoData = (id, data) => {
  return {
    type: actions.ADD_CRYPTO_DATA,
    payload: { id: id, data: data },
  };
};

export const deleteCryptoData = (id) => {
  return {
    type: actions.DELETE_CRYPTO_DATA,
    payload: { id: id },
  };
};
