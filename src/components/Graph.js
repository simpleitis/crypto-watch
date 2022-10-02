import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Button from './Button';
import CryptoDropDown from './CryptoDropDown';
import ChartDropDown from './ChartDropDown';
import DatePicker from './DatePicker';
import { changePeriod } from '../redux';
import HashLoader from 'react-spinners/HashLoader';

const CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

function Graph(props) {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('#ffffff');

  const colors = ['#007cff', '#ff6384', '#15cb85', '#ffcd57'];

  useEffect(() => {
    props.cryptoData[0]?.data ? setLoading(false) : setLoading(true);
    console.log(props?.cryptoData?.length);
  }, [props.cryptoData]);

  return (
    <div className="col-span-1 md:col-span-6 lg:col-span-5 lg:row-span-1 xl:col-span-7 2xl:col-span-9 bg-white rounded">
      <>
        <div className="grid grid-cols-3 md:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 p-4 gap-1 2xl:pl-[18%]">
          {['1D', '1W', '1M', '6M', '1Y'].map((data, index) => {
            return <Button key={data} data={data} />;
          })}
          <DatePicker />
          <CryptoDropDown />
          <ChartDropDown />
        </div>

        {loading ? (
          <div className="flex flex-col flex-wrap align-middle">
            <center className="py-5">
              <HashLoader
                color="#1976d2"
                loading={loading}
                cssOverride={CSSProperties}
                size={50}
              />

              <p className="text-slate-500 font-semibold pt-10">
                Please select a crypto currency from dropdown to see graphical
                data
              </p>
            </center>
          </div>
        ) : (
          <Line
            data={{
              labels: props.cryptoData[0]?.data?.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return props.period === 1 ? time : date.toLocaleDateString();
              }),

              datasets: props.cryptoData.map((crypto, index) => {
                return {
                  label: crypto.id,
                  data: crypto.data?.map((coin) => {
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
          />
        )}
      </>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    type: state.currency.type,
    period: state.graph.period,
    cryptoList: state.graph.cryptoList,
    cryptoData: state.graph.cryptoData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePeriod: (period) => dispatch(changePeriod(period)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
