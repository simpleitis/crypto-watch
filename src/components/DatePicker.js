import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { BiCalendar } from 'react-icons/bi';
import 'react-day-picker/dist/style.css';
import { connect } from 'react-redux';
import {
  addCryptoData,
  changePeriod,
  deleteAllData,
  setNewData,
} from '../redux';
import { HistoricalChart } from '../config/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DatePicker(props) {
  const [selected, setSelected] = React.useState();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleSelection = (data) => {
    const selectedDate = format(data, 'T');
    const currentDate = format(Date.now(), 'T');

    if (selectedDate > currentDate) {
      toast.error('Select a date less than the current date!', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
    } else {
      const oneDay = 1000 * 60 * 60 * 24;
      const diffInTime = currentDate - selectedDate;
      const diffInDays = Math.round(diffInTime / oneDay);

      props.changePeriod(diffInDays);
      props.deleteAllData();

      props.cryptoList?.map(async (crypto) => {
        const { data } = await axios.get(
          HistoricalChart(crypto, props.type, diffInDays)
        );

        props.addCryptoData(crypto, data.prices);
      });

      setSelected(data);
    }

    setToggle(!toggle);
  };

  return (
    <>
      <div className="col-span-1 2xl:col-span-1 my-2 mx-0.5">
        <button
          className="py-1 px-3.5 md:py-2 bg-slate-100 hover:ring-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-gray-100 focus:bg-blue-200 focus:text-blue-500 font-semibold rounded-lg h-full w-full 2xl:w-max"
          onClick={handleToggle}
        >
          <center>
            <BiCalendar className="text-xl text-slate-600" />
          </center>
        </button>
      </div>
      {toggle && (
        <div className="col-span-3 w-full md:col-span-8 md:w-max md:col-start-1 md:border xl:col-span-10  2xl:col-span-3 2xl:row-start-2 m-1">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelection}
          />
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
