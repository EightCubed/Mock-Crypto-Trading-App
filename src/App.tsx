import RenderChart from './Components/RenderChart';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

// interface API_DATA_PROPS {
//   "META DATA": string;
//   // headers: string;
//   "Time Series (Digital Currency Daily)": string[];
// }

// const initState : API_DATA_PROPS = {
//   "META DATA":'',
//   // headers: '',
//   "Time Series (Digital Currency Daily)":['']
// }

function App() {
  const [data,setData] = useState<any>([])

  // Remove API Key
  const getDataFromApi = () => {
    axios.get(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=INR&apikey=${process.env.REACT_APP_PERSONAL_KEY}`)
    .then((res) => {setData(res.data["Time Series (Digital Currency Daily)"])})
    .catch((err)=>{})
  }

  console.log(data["2020-01-14"])

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  return (
    <div className="App">
      <button onClick={getDataFromApi}>Click</button>
      <div className='chart'>
        <RenderChart labels={labels} dataPrices={[1,2,3,4,5,6,7,8]}/>
      </div>
    </div>
  );
}

export default App;
