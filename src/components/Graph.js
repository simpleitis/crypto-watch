import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { HistoricalChart } from '../config/api';
import Button from './Button';
import CryptoDropDown from './CryptoDropDown';
import ChartDropDown from './ChartDropDown';
import DatePicker from './DatePicker';
import { changePeriod } from '../redux';

function Graph(props) {
  const colors = ['#007cff', '#ff6384', '#15cb85', '#ffcd57'];

  return (
    <div className="col-span-1 md:col-span-6 lg:col-span-5 lg:row-span-1 xl:col-span-7 2xl:col-span-9 bg-white rounded">
      {!true ? (
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
        <>
          <div className="grid grid-cols-3 md:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 p-4 gap-1 2xl:pl-[18%]">
            {['1D', '1W', '1M', '6M', '1Y'].map((data, index) => {
              return <Button key={data} data={data} />;
            })}
            <DatePicker />
            <CryptoDropDown />
            <ChartDropDown />
          </div>

          {/* <Line
            data={{
              labels: historicalData[0]?.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return props.period === 1 ? time : date.toLocaleDateString();
              }),

              datasets: historicalData?.map((data, index) => {
                return {
                  label: props.cryptoList[index],
                  data: data.map((coin) => {
                    return coin[1];
                  }),
                  borderColor: colors[index],
                  backgroundColor: colors[index],
                };
              }),
              // [
              //   {
              //     label: 'Bitcoin',
              //     data: historicalData.map((coin) => {
              //       return coin[1];
              //     }),
              //     borderColor: 'dodgerblue',
              //     backgroundColor: ['dodgerblue'],
              //   },
              // ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    maxTicksLimit: 6,
                  },
                },
                y: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    maxTicksLimit: 5,
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  align: 'end',
                  labels: {
                    color: 'dodgerblue',
                    usePointStyle: true,
                  },
                },
              },
            }}
          /> */}
          {/* {setHistoricalData([])} */}
        </>
      )}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
