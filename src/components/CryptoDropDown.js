import React, { useState, useEffect } from 'react';
import {
  changeCurrency,
  addToCryptoList,
  deleteFromCryptoList,
  addCryptoData,
  deleteCryptoData,
} from '../redux';
import { AiFillCaretDown } from 'react-icons/ai';
import { connect } from 'react-redux';
import axios from 'axios';
import { HistoricalChart } from '../config/api';

function CryptoDropDown(props) {
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [id, setId] = useState();

  const fetchCoins = async () => {
    if (props.cryptoInfo) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleSearch = () => {
    return props?.cryptoInfo?.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleSelection = (e) => {
    if (props.cryptoList.includes(e.target.id)) {
      props.deleteFromCryptoList(e.target.id);
      props.deleteCryptoData(e.target.id);
    } else {
      setId(e.target.id);
      // handle deletion and selection of the same coin
      props.addToCryptoList(e.target.id);
      fetchData();
    }
  };

  const fetchData = async () => {
    if (id) {
      const { data } = await axios.get(
        HistoricalChart(id, props.type, props.period)
      );

      props.addCryptoData(id, data.prices);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
    setId('');
  }, [id]);

  useEffect(() => {
    fetchCoins();
  }, [props.cryptoInfo]);

  return (
    <>
      <div className="col-span-1 md:col-span-3 xl:col-span-2 xl:row-span-3 2xl:col-span-2 m-1">
        <div className="relative inline-block text-left w-full 2xl:w-max ">
          <div>
            <button
              type="button"
              className="inline-flex w-max justify-center rounded-md  bg-slate-100 px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              onClick={handleToggle}
            >
              Coin
              <AiFillCaretDown className="w-max h-max p-1 pl-4" />
            </button>
          </div>
          {toggle && (
            <div className="z-100 w-48 bg-white rounded shadow-md mt-1.5 p-0.5 border">
              <input
                type="search"
                className="m-3 w-[88%] border p-2 text-sm text-gray-900 bg-red-50 rounded-lg border-gray-300 focus:ring-1 focus:ring-red-400 focus:border-red-400 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

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
                <ul className=" space-y-3 text-sm h-40 overflow-y-auto scrollbar">
                  {handleSearch().map((coin) => {
                    return (
                      <div
                        className="hover:bg-red-50 p-3 scroll-auto"
                        key={coin.name}
                      >
                        <li>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-white rounded"
                              value={coin.name}
                              id={coin.id}
                              onClick={handleSelection}
                            />
                            <label className="ml-2 text-sm font-medium text-gray-500">
                              {coin.name}
                            </label>
                          </div>
                        </li>
                      </div>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    type: state.currency.type,
    period: state.graph.period,
    cryptoList: state.graph.cryptoList,
    cryptoInfo: state.crypto.cryptoInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (type, symbol) => dispatch(changeCurrency(type, symbol)),
    addToCryptoList: (coin) => dispatch(addToCryptoList(coin)),
    deleteFromCryptoList: (coin) => dispatch(deleteFromCryptoList(coin)),
    addCryptoData: (id, data) => dispatch(addCryptoData(id, data)),
    deleteCryptoData: (id) => dispatch(deleteCryptoData(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CryptoDropDown);
