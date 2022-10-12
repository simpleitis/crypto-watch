import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import getSymbolFromCurrency from 'currency-symbol-map';
import axios from 'axios';
import { ExchangeRate } from '../config/api';

function Exchange(props) {
  const [sellToggle, setSellToggle] = useState(false);
  const [buyToggle, setBuyToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [sellCurrency, setSellCurrency] = useState();
  const [buyCurrency, setBuyCurrency] = useState();
  const [sellValue, setSellValue] = useState(0);
  const [buyValue, setBuyValue] = useState(0);
  const [exchangeData, setExchangeData] = useState();
  const [currencyType, setCurrencyType] = useState('');

  const currencySymbolMap = [
    { name: 'Bitcoin', id: 'btc', symbol: getSymbolFromCurrency('btc') },
    { name: 'Ethereum', id: 'eth', symbol: getSymbolFromCurrency('eth') },
    { name: 'Ripple', id: 'xrp', symbol: 'XRP' },
    { name: 'BinanceCoin', id: 'bnb', symbol: 'BNB' },
    { name: 'LiteCoin', id: 'ltc', symbol: getSymbolFromCurrency('ltc') },
    { name: 'USD', id: 'usd', symbol: getSymbolFromCurrency('usd') },
    { name: 'INR', id: 'inr', symbol: getSymbolFromCurrency('inr') },
    { name: 'EUR', id: 'eur', symbol: getSymbolFromCurrency('eur') },
    { name: 'GBP', id: 'gbp', symbol: getSymbolFromCurrency('gbp') },
    { name: 'AUD', id: 'aud', symbol: getSymbolFromCurrency('aud') },
  ];

  const handleSellToggle = () => {
    setSellToggle(!sellToggle);
  };

  const handleBuyToggle = () => {
    setBuyToggle(!buyToggle);
  };

  const handleSellSearch = () => {
    return currencySymbolMap
      .slice(0, 5)
      .filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(search.toLowerCase()) ||
          crypto.id.toLowerCase().includes(search.toLowerCase())
      );
  };

  const handleBuySearch = () => {
    return currencySymbolMap.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase()) ||
        crypto.id.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleSellSelection = (e) => {
    setSellCurrency(e.target.id);
    setSellToggle(!sellToggle);
  };

  const handleBuySelection = (e) => {
    setBuyCurrency(e.target.id);
    setBuyToggle(!buyToggle);
  };

  const fetchData = async () => {
    if (sellCurrency && buyCurrency) {
      const { data } = await axios.get(ExchangeRate(sellCurrency, buyCurrency));
      setExchangeData(data[sellCurrency][buyCurrency]);
    }
  };

  const calculateExchangeValue = () => {
    const value = (exchangeData / 100) * (sellValue * 100);
    setBuyValue(value);
    setCurrencyType(buyCurrency);
  };

  useEffect(() => {
    if (sellCurrency && buyCurrency) {
      fetchData();
    }
  }, [sellCurrency, buyCurrency]);

  return (
    <div className="sm:col-span-1 md:col-span-3 lg:col-span-3 lg:h-max lg:row-span-1 xl:col-span-4 2xl:col-span-5 h-full w-full bg-white shadow-md p-5 rounded-md">
      <p className="font-bold">Exchange Coins</p>
      <div className="flex mt-4">
        <p className="font-semibold text-orange-400 pt-1">Sell</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 ml-3 sm:ml-4 md:ml-2">
          <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-5 xl:col-span-4 relative text-left w-full">
            {sellCurrency ? (
              <div className="w-full">
                <button
                  type="button"
                  className="flex w-full justify-between rounded-md  bg-slate-100 px-3 sm:px-6 py-2 sm:mx-1 text-sm font-medium text-gray-700 shadow-sm hover:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  onClick={handleSellToggle}
                >
                  {sellCurrency.charAt(0).toUpperCase() + sellCurrency.slice(1)}
                  <AiFillCaretDown className="w-max h-max p-1 pl-4" />
                </button>
              </div>
            ) : (
              <div className="w-full">
                <button
                  type="button"
                  className="flex w-full justify-between rounded-md  bg-slate-100 px-3 sm:px-6 py-2 sm:mx-1 text-sm font-medium text-gray-700 shadow-sm hover:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  onClick={handleSellToggle}
                >
                  Coin
                  <AiFillCaretDown className="w-max h-max p-1 pl-4" />
                </button>
              </div>
            )}
            {sellToggle && (
              <div className="absolute z-10 w-48 bg-white rounded shadow-md mt-1.5 p-0.5 border">
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
                  <ul className="space-y-3 text-sm h-40 overflow-y-auto scrollbar">
                    {handleSellSearch()
                      .slice(0, 5)
                      .map((coin) => {
                        return (
                          <div
                            className="hover:bg-red-50 p-3 scroll-auto"
                            key={coin.name}
                          >
                            <li>
                              <div className="flex items-center">
                                <p
                                  className="ml-2 text-sm font-medium text-gray-500"
                                  id={coin.name.toLowerCase()}
                                  onClick={handleSellSelection}
                                >
                                  {coin.name}
                                </p>
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
          <div className="grid-cols-1 sm:grid-cols-3 md:col-span-2 w-full lg:ml-10 2xl:ml-10">
            <input
              className="border w-20 ml-4 sm:w-32 md:w-20 lg:w-24 h-full sm:mx-3 rounded-md px-2 focus:outline-none sm:ml-10 sm:mt-0 md:ml-3.5 xl:ml-0"
              placeholder="Amount"
              type="text"
              onChange={(e) => {
                setSellValue(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      {/* Buy section
       */}
      <div className="flex mt-4">
        <p className="font-semibold text-[#0ecb81] pt-1">Buy</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 ml-3 sm:ml-4 md:ml-2">
          <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-5 xl:col-span-4 relative text-left w-full">
            {buyCurrency ? (
              <div className="w-full">
                <button
                  type="button"
                  className="flex w-full justify-between rounded-md  bg-slate-100 px-3 sm:px-6 py-2 sm:mx-1 text-sm font-medium text-gray-700 shadow-sm hover:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  onClick={handleBuyToggle}
                >
                  {buyCurrency.charAt(0).toUpperCase() + buyCurrency.slice(1)}
                  <AiFillCaretDown className="w-max h-max p-1 pl-4" />
                </button>
              </div>
            ) : (
              <div className="w-full">
                <button
                  type="button"
                  className="flex w-full justify-between rounded-md  bg-slate-100 px-3 sm:px-6 py-2 sm:mx-1 text-sm font-medium text-gray-700 shadow-sm hover:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  onClick={handleBuyToggle}
                >
                  Coin
                  <AiFillCaretDown className="w-max h-max p-1 pl-4" />
                </button>
              </div>
            )}
            {buyToggle && (
              <div className="absolute z-10 w-48 bg-white rounded shadow-md mt-1.5 p-0.5 border">
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
                  <ul className="space-y-3 text-sm h-40 overflow-y-auto scrollbar">
                    {handleBuySearch()
                      .map((coin) => {
                        return (
                          <div
                            className="hover:bg-red-50 p-3 scroll-auto"
                            key={coin.name}
                          >
                            <li>
                              <div className="flex items-center">
                                <p
                                  className="ml-2 text-sm font-medium text-gray-500"
                                  id={coin.id.toLowerCase()}
                                  onClick={handleBuySelection}
                                >
                                  {coin.name}
                                </p>
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
          <div className="grid-cols-1 sm:grid-cols-3 md:col-span-2 w-full lg:ml-10 2xl:ml-10">
            <input
              className="w-20 ml-4 sm:w-32 md:w-20 lg:w-24 2xl:w-32 h-full sm:mx-3 rounded-md px-1 focus:outline-none sm:ml-10 sm:mt-0 md:ml-3.5 xl:ml-0 font-semibold text-[#0ecb81] caret-transparent"
              type="text"
              value={`${buyValue.toFixed(2)} ${currencyType.toUpperCase()}`}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-2.5">
        <button
          className="px-3 py-2 border-blue-600 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700"
          onClick={calculateExchangeValue}
        >
          Exchange
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cryptoInfo: state.crypto.cryptoInfo,
  };
};

export default connect(mapStateToProps, null)(Exchange);

{
  /* Buy area */
}
{
  /* <div>
          <div className="flex justify-evenly py-2">
            <p className="font-semibold text-[#0ecb81] pt-1">Buy</p>
            <div className="relative text-left w-max px-1">
              {buyCurrency ? (
                <div>
                  <button
                    type="button"
                    className="inline-flex w-max justify-center rounded-md  bg-slate-100 px-6 py-2 mx-1 text-sm font-medium text-gray-700 shadow-sm hover:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    onClick={handleBuyToggle}
                  >
                    {buyCurrency.charAt(0).toUpperCase() + buyCurrency.slice(1)}
                    <AiFillCaretDown className="w-max h-max p-1 pl-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    className="inline-flex w-max justify-center rounded-md  bg-slate-100 px-6 py-2 mx-1 text-sm font-medium text-gray-700 shadow-sm hover:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    onClick={handleBuyToggle}
                  >
                    Coin
                    <AiFillCaretDown className="w-max h-max p-1 pl-4" />
                  </button>
                </div>
              )}
              {buyToggle && (
                <div className="absolute z-10 w-48 bg-white rounded shadow-md mt-1.5 p-0.5 border">
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
                    <ul className="space-y-3 text-sm h-40 overflow-y-auto scrollbar">
                      {handleBuySearch().map((coin) => {
                        return (
                          <div
                            className="hover:bg-red-50 p-3 scroll-auto"
                            key={coin.name}
                          >
                            <li>
                              <div className="flex items-center">
                                <p
                                  className="ml-2 text-sm font-medium text-gray-500"
                                  id={coin.id}
                                  onClick={handleBuySelection}
                                >
                                  {coin.name}
                                </p>
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
            <input
              className="w-32 mx-1 rounded-md px-2 focus:outline-none font-semibold text-[#0ecb81] caret-transparent"
              placeholder="0"
              type="text"
              value={`${buyValue.toFixed(2)} ${currencyType.toUpperCase()}`}
              readOnly
            />
          </div>
        </div> */
}
{
  /* <div className="flex justify-center pt-2.5">
          <button
            className="px-3 py-2 border-blue-600 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700"
            onClick={calculateExchangeValue}
          >
            Exchange
          </button>
        </div> */
}
