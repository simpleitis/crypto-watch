import React, { useState, useEffect } from 'react';
import { changeCurrency } from '../redux/currency/currencyActions';
import { AiFillCaretDown } from 'react-icons/ai';
import { connect } from 'react-redux';

function SelectorDropDown(props) {
  const [show, setShow] = useState(false);
  const [type, setType] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  const handleClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    props.changeCurrency(type, symbol);
  }, [symbol]);

  const handleSelection = (e) => {
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
      <div className="col-span-4 row-span-1 md:col-span-3 lg:col-span-1 mt-0.5 h-max w-max">
        <button
          className="relative flex justify-left items-center bg-white border  text-gray-600 rounded focus:ring ring-gray-200 h-12"
          onClick={handleClick}
        >
          <p className="px-4">{type}</p>
          <span className="p-2 hover:transparent">
            <AiFillCaretDown />
          </span>
          <div
            className={
              'absolute top-full min-w-full w-max bg-white shadow-md mt-1 rounded' +
              (show ? ' show' : ' hidden')
            }
          >
            <ul className="text-left border rounded">
              <li
                className="px-4 py-1 hover:bg-gray-100 border-b"
                // handleClick={(event) => setCurrency(event.target.innerText)}
                onClick={handleSelection}
              >
                USD
              </li>
              <li
                className="px-4 py-1 hover:bg-gray-100 border-b"
                onClick={handleSelection}
              >
                INR
              </li>
            </ul>
          </div>
        </button>
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
