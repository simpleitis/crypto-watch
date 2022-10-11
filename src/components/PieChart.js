import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import millify from 'millify';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart(props) {
  const cryptos = props?.cryptoInfo?.map((crypto) => crypto.name);
  const crypto_market_caps = props?.cryptoInfo?.map(
    (crypto) => crypto.market_cap
  );

  const data = {
    labels: cryptos,
    datasets: [
      {
        label: '# of Votes',
        data: crypto_market_caps,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        align: 'middle',
        labels: {
          color: 'dodgerblue',
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <div className="col-span-1 md:col-span-3 lg:col-span-2 lg:h-max lg:row-span-1 xl:col-span-3 2xl:col-span-4 h-full w-full bg-white shadow-md rounded-md">
      <div className="flex flex-wrap justify-between p-5 pb-0">
        <p className="font-bold">Portfolio</p>
        <p className="text-slate-500">
          Total Value:{' '}
          <span className="font-bold text-black">
            {millify(
              crypto_market_caps.reduce((partialSum, a) => partialSum + a, 0)
            )}
          </span>
        </p>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cryptoInfo: state.crypto.cryptoInfo.slice(0, 3),
  };
};

export default connect(mapStateToProps, null)(PieChart);
