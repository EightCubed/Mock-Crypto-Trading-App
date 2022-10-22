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
import './renderchart.css'

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
    },
  };

  interface ChartProps {
    labels:string[]
    dataPrices: number[]
    name: string
  }
  
  const RenderChart = ({labels,dataPrices,name}:ChartProps) => {
    const data = {
      labels,
      datasets: [
        {
          label: name,
          data: dataPrices,
          borderColor: `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }
      ]
    };
 
    return <Line className='chart' options={options} data={data} />;
  }

export default RenderChart;