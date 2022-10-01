import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { BiCalendar } from 'react-icons/bi';
import 'react-day-picker/dist/style.css';

function DatePicker() {
  const [selected, setSelected] = React.useState();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleSelection = (data) => {
    setSelected(data);
    setToggle(!toggle)
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
    </>
  );
}

export default DatePicker;
