import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "./Loader";
import TopBar from "./TopBar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import './coinslist.css';
import { useNavigate } from "react-router-dom";

interface COINS_LIST_TYPE {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: string;
    market_cap: number;
    high_24h : number;
    ath: number;
    price_change_24h: number;
    market_cap_rank: number;
}

const initState:COINS_LIST_TYPE = {
    id: '',
    symbol: "",
    name: "",
    image: "null",
    current_price: "",
    market_cap: 0,
    high_24h: 0,
    ath: 0,
    price_change_24h: 0,
    market_cap_rank: 0
}

const PER_PAGE = 20
const CURRENCY = "$";

const CoinsList = () => {
    const [coinsList,setCoinsList] = useState<COINS_LIST_TYPE[]>([initState])
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [page,setPage] = useState<number>(1);

    const fetchCoinsList = () => {
        setIsLoading(true);
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${PER_PAGE}&page=${page}&sparkline=false`).then(
            (res) => {
                setCoinsList(res['data'])
                setIsLoading(false)
        }
        )
    }

    useEffect( () => {
        fetchCoinsList()
    },[page])

    const handleIncrement = () => {
        setPage(page+1)
    }
    
    const handleDecrement = () => {
        if(page!==1){
            setPage(page-1)
        }
    }

    const navigate=useNavigate()

    const handleClick = (data:COINS_LIST_TYPE) => {
        console.log(data.symbol)
        navigate(`/coins/${data.id}`)
    }

    const formatCash = (n:number) => {
        if (n < 1e3) return n;
        if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
        if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
        if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
        if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
      };

    console.log(coinsList[0])

    return(
        <>
            {isLoading && <Loader />}
            <div>
                <TopBar />
                <div className="title-list">
                    <span className="black-background">
                        Coins List
                    </span>
                </div>
                <table className="table-list">
                    <tr className="">
                        <td width={50}>Rank</td>
                        <td width={150}>Symbol</td>
                        <td width={200}>Coin Name</td>
                        <td width={120}>Market Cap</td>
                        <td width={150}>All Time High</td>
                        <td width={150}>24H high</td>
                        <td width={150}>Current Price</td>
                        <td width={150}>24H Change</td>
                    </tr>
                    {coinsList.length>0 && coinsList.map( (data:COINS_LIST_TYPE) => {
                        return (
                            <tr key={data.id} className="coin" onClick={()=>handleClick(data)}>
                                <td>{data.market_cap_rank}</td>
                                <td>{data.symbol}</td>
                                <td>
                                    <div className="coin-img-name">
                                        <img src={data.image} alt="coin thumbnail" className="thumbnail-image"></img>
                                        <div className="coin-name">{data.name}</div>
                                    </div>
                                </td>
                                <td>{formatCash(data.market_cap)}{CURRENCY}</td>
                                <td>{data.ath}{CURRENCY}</td>
                                <td>{data.high_24h}{CURRENCY}</td>
                                <td>{data.current_price}{CURRENCY}</td>
                                <td>{data.price_change_24h.toFixed(3)}{CURRENCY}</td>
                            </tr>)
                    })}
                </table>
                <div className="pagination">
                    <FaArrowRight onClick={handleIncrement}/>
                    Page : {page}
                    <FaArrowLeft onClick={handleDecrement}/>
                </div>
            </div>
        </>
    )
}

export default CoinsList;