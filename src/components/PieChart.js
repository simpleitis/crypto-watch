import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

function PieChart() {
  return (
    <div className="sm:col-span-1 md:col-span-5 lg:col-span-4 lg:h-max lg:row-span-1 xl:col-span-6 2xl:col-span-4 h-full w-full bg-white p-3">
    <div className='flex flex-wrap justify-between p-3'>
      <p className='font-bold'>Portfolio</p>
      <p className='text-slate-500'>Total Value: <span className='font-bold text-black'>$1000</span></p>
    </div>
      <Pie data={data} />
    </div>
  );
}

export default PieChart;
