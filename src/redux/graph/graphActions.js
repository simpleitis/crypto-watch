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
    type: actions.DELETE_FROM_CRYPTO_LIST,
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

export const deleteAllData = () => {
  return {
    type: actions.DELETE_ALL_DATA,
  };
};

export const setNewData = (newData) => {
  return {
    type: actions.SET_NEW_DATA,
    payload: { newData: newData },
  };
};

export const changeChartType = (chart) => {
  console.log('Action creator', chart)
  return {
    type: actions.CHANGE_CHART_TYPE,
    payload: { chart: chart },
  };
};
