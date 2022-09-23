import React, { useState, useEffect } from 'react';
import { changeCurrency } from '../redux/currency/currencyActions';
import { AiFillCaretDown } from 'react-icons/ai';
import { connect } from 'react-redux';

function SelectorDropDown(props) {
  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  useEffect(() => {
    props.changeCurrency(type, symbol);
  }, [symbol]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleSelection = (e) => {
    console.log(e.target.innerText);
    if (e.target.innerText === 'USD') {
      setType('USD');
      setSymbol('$');
    } else {
      setType('INR');
      setSymbol('₹');
    }
  };

  return (
    <>
      <div
        class="col-span-1 lg:h-max lg:row-span-1 pt-1 w-max h-max"
        onClick={handleToggle}
      >
        <div class="relative inline-block text-left">
          <div>
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md  bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 "
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              {props.type}
              <AiFillCaretDown className="w-max h-max p-1 pl-4 pr-0" />
            </button>
          </div>
          {toggle && (
            <div
              class="absolute left-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div
                class="py-0 px-0 w-24 font-medium text-sm text-gray-600 "
                role="none"
              >
                <a
                  href="#"
                  class="block px-1 py-2 hover:bg-gray-200 w-full"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-0"
                  onClick={handleSelection}
                >
                  USD
                </a>
                <a
                  href="#"
                  class="block px-1 py-2 hover:bg-gray-200"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-1"
                  onClick={handleSelection}
                >
                  INR
                </a>
              </div>
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
    symbol: state.currency.symbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (type, symbol) => dispatch(changeCurrency(type, symbol)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectorDropDown);
