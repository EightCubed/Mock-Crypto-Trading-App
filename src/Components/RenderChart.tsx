import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  interface ChartProps {
    labels:string[]
    dataPrices: number[]
  }
  
  const RenderChart = ({labels,dataPrices}:ChartProps) => {
    const data = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: dataPrices,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ]
    };
 
    return <Line options={options} data={data} />;
  }

export default RenderChart;