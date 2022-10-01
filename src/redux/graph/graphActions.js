import * as actions from './graphType';

export const changePeriod = (period) => {
  return {
    type: actions.CHANGE_PERIOD,
    payload: { period: period },
  };
};

export const changeCryptoList = (crypto) => {
  return {
    type: actions.CHANGE_CRYPTO_LIST,
    payload: { crypto: crypto },
  };
};

export const changeCryptoData = (id, data) => {
  return {
    type: actions.CHANGE_CRYPTO_DATA,
    payload: { id: id, data: data },
  };
};
