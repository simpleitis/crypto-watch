import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { HistoricalChart } from '../config/api';
import { changeCurrency } from '../redux/currency/currencyActions';

function Graph(props) {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(30);
  const [coinList, setCoinList] = useState([]);

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(
      HistoricalChart('bitcoin', props.type, days)
    );

    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [days, props.type]);

  return (
    <div className="col-span-1 md:col-span-6 lg:col-span-5 bg-white rounded">
      {!historicalData ? (
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
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData.map((coin) => {
                    return coin[1];
                  }),
                  backgroundColor: ['dodgerblue'],
                  label: 'Bitcoin',
                  borderColor: 'dodgerblue',
                },
              ],
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
          />
        </>
      )}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
