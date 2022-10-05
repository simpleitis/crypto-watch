import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CoinList } from '../config/api';
import { changeCurrency } from '../redux/currency/currencyActions';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import millify from 'millify';
import { updateCryptoInfo } from '../redux';

function Sidebar(props) {
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(props.type));

    props.updateCryptoInfo(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [props.type]);

  return (
    <div className="col-span-1 md:col-span-6 lg:col-span-3 lg:row-span-6 xl:col-span-3 2xl:col-span-3 md:justify-center w-full">
      {loading ? (
        <div className="flex flex-row justify-center">
          <button
            type="button"
            className="flex items-center rounded-lg bg-gray-400 px-4 py-2 text-white"
            disabled
          >
            <svg
              className="mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="font-medium"> Loading... </span>
          </button>
        </div>
      ) : (
        <div className="w-full bg-white rounded p-10 pt-5">
          <p className="font-bold text-sm mb-5">
            Cryptocurrency by
            <br /> market cap
          </p>
          {props.cryptoInfo?.map((coin) => {
            const profit = coin.price_change_percentage_24h > 0;

            return (
              <div key={coin.id}>
                <div className="my-2 py-4">
                  <div className="grid grid-cols-4 gap-0">
                    <p className="font-bold text-sm col-span-1 w-16">
                      {coin.name}
                    </p>

                    <div
                      className="col-span-3 ml-auto"
                      style={{
                        color: profit > 0 ? 'rgb(14, 203, 129)' : 'orange',
                      }}
                    >
                      {profit ? (
                        <span className="hover:transparent mt-1">
                          <div className="flex">
                            <AiFillCaretUp className="mt-1 " />
                            {`${coin.price_change_percentage_24h.toFixed(2)} %`}
                          </div>
                        </span>
                      ) : (
                        <span className="hover:transparent">
                          <div className="flex">
                            <AiFillCaretDown className="mt-1 " />
                            {`${Math.abs(
                              coin.price_change_percentage_24h.toFixed(2)
                            )} %`}
                          </div>
                        </span>
                      )}
                    </div>

                    <p className="col-span-4 text-xs text-slate-400">
                      {props.symbol}{' '}
                      {millify(coin.market_cap, { precision: 2, space: true })}
                    </p>
                  </div>
                </div>
                <hr></hr>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    type: state.currency.type,
    symbol: state.currency.symbol,
    cryptoInfo: state.crypto.cryptoInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (type, symbol) => dispatch(changeCurrency(type, symbol)),
    updateCryptoInfo: (info) => dispatch(updateCryptoInfo(info)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
