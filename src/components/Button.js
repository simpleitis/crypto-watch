import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addCryptoData, changePeriod, deleteAllData, setNewData } from '../redux';
import { HistoricalChart } from '../config/api';

function Button(props) {
  const periods = { '1D': 1, '1W': 7, '1M': 30, '6M': 182, '1Y': 364 };

  const handleClick = (e) => {
    props.changePeriod(periods[e.target.innerText]);
    props.deleteAllData();
    props.cryptoList?.map(async (crypto) => {
      const { data } = await axios.get(
        HistoricalChart(crypto, props.type, periods[e.target.innerText])
      );

      props.addCryptoData(crypto, data.prices);
    });
  };

  return (
    <div className="col-span-1  2xl:col-span-1 my-2 mx-0.5">
      <button
        className="py-1 md:py-2 bg-slate-100 hover:ring-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-gray-100 focus:bg-blue-200 focus:text-blue-500 font-semibold rounded-lg h-full w-full"
        onClick={handleClick}
      >
        {props.data}
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    type: state.currency.type,
    period: state.graph.period,
    cryptoList: state.graph.cryptoList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changePeriod: (period) => dispatch(changePeriod(period)),
    deleteAllData: () => dispatch(deleteAllData()),
    setNewData: (data) => dispatch(setNewData(data)),
    addCryptoData: (id, data) => dispatch(addCryptoData(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
