import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { changePeriod } from '../redux';

function Button(props) {
  const [period, setPeriod] = useState(1);

  const periods = {'1D': 1, '1W': 7, '1M': 30, '6M': 182, '1Y': 364}

  const handleClick = (e) => {
    props.changePeriod(periods[e.target.innerText]);
  };



  return (
    <div className="col-span-1 2xl:col-span-1 my-2 mx-0.5">
      <button
        className="py-1 md:py-2 bg-slate-100 hover:ring-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-gray-100 focus:bg-blue-200 focus:text-blue-500 font-semibold rounded-lg h-full w-full"
        onClick={handleClick}
      >
        {props.data}
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePeriod: (period) => dispatch(changePeriod(period)),
  };
};

export default connect(null, mapDispatchToProps)(Button);
