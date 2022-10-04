import React, { useState, useEffect } from 'react';
import { changeCurrency } from '../redux/currency/currencyActions';
import { AiFillCaretDown } from 'react-icons/ai';
import { connect } from 'react-redux';
import { changeChartType } from '../redux';

function ChartDropDown(props) {
  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  // useEffect(() => {
  //   props.changeCurrency(type, symbol);
  // }, [symbol]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleSelection = (e) => {
    props.changeChartType(e.target.id)
  };

  return (
    <>
      <div
        className="col-span-1 md:col-span-3 xl:col-span-2 2xl:col-span-2 m-1"
        onClick={handleToggle}
      >
        <div className="relative inline-block text-left w-full 2xl:w-max">
          <div>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md  bg-slate-100 px-2 py-3 text-sm font-medium text-gray-700 shadow-sm hover:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              Chart
              <AiFillCaretDown className="w-max h-max p-1 pl-4" />
            </button>
          </div>
          {toggle && (
            <div
              className="absolute left-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div
                className="py-0 px-0 w-max font-medium text-sm text-gray-600 "
                role="none"
              >
                <a
                  href="#"
                  className="block px-3.5 py-2 hover:bg-gray-200 w-full"
                  role="menuitem"
                  id='line'
                  onClick={handleSelection}
                >
                  Line Chart
                </a>
                <a
                  href="#"
                  className="block px-3.5 py-2 hover:bg-gray-200 w-full"
                  role="menuitem"
                  id='bar'
                  onClick={handleSelection}
                >
                  Bar Chart
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     type: state.currency.type,
//     symbol: state.currency.symbol,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (type, symbol) => dispatch(changeCurrency(type, symbol)),
    changeChartType: (chart) => dispatch(changeChartType(chart))
  };
};

export default connect(null, mapDispatchToProps)(ChartDropDown);
