import axios from "axios";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import Loader from "./Loader";
import TopBar from "./TopBar";
import './coindetails.css';
import RenderChart from "./RenderChart";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { increment, selectCount } from "./Store/counterSlice";

interface COIN_DATA_TYPE {
    id: string;
    symbol: string;
    name: string;
    image: {
        large: string;
        thumb:string;
        small: string
    };
    market_data: {
        current_price: {
            usd:number
        };
    }
    market_cap: number;
    high_24h : number;
    ath: number;
    price_change_24h: number;
    market_cap_rank: number;
    description: {
        en : string
    };
}

interface PRICES_CHART {
    market_caps: []
    prices: []
}

export const initStatePrices:PRICES_CHART = {
    market_caps: [],
    prices: []
}
export const initStateCoin:COIN_DATA_TYPE = {
    id: '',
    symbol: "",
    name: "",
    image: {
        large: "",
        thumb: "",
        small: ""
    },
    market_data: {
        current_price: {
            usd:0
        },
    },
    market_cap: 0,
    high_24h: 0,
    ath: 0,
    price_change_24h: 0,
    market_cap_rank: 0,
    description: {
        en:""
    },
}

const CoinDetails = () => {
    const {id} = useParams();
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [coinData,setCoinData] = useState<COIN_DATA_TYPE>(initStateCoin)
    const [coinPrices,setCoinPrices] = useState<PRICES_CHART>(initStatePrices)
    const [openBuyModal,setOpenBuyModal] = useState<boolean>(false)
    const [openSellModal,setOpenSellModal] = useState<boolean>(false)

    const dispatch = useDispatch();

    const fetchSingleCoin = () => {
        setIsLoading(true);
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(
            (res) => {
                setCoinData(res['data'])
            })
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=1656361155&to=1666361155
            `).then( 
                (res) => {
                    setCoinPrices(res['data'])
                    setIsLoading(false)
        })
    }

    useEffect( () => {
        fetchSingleCoin()
    },[])

    const removeHyperLink = () => {
        const reg=/<a href=".*">/;
        let temp=coinData.description.en.replace(reg,"").replace("</a>","")
        while(temp.includes("</a>")){
            temp=temp.replace(reg,"").replace("</a>","")
        }
        return temp
    }

    const handleOpenBuyModal = () => {
        setOpenBuyModal(true)
    }
    
    const handleBuyCloseModal = () => {
        setOpenBuyModal(false)
    }
    
    const handleOpenSellModal = () => {
        setOpenSellModal(true)
    }
    
    const handleSellCloseModal = () => {
        setOpenSellModal(false)
    }

    const handleBuyClick = () => {
        dispatch(increment)
    }

    const count=useSelector(selectCount)
    console.log(count)

    return(
        <>
            {isLoading && <Loader />}
            {openBuyModal && 
                <Modal 
                    show={openBuyModal} 
                    handleClose={handleBuyCloseModal}
                >
                    <div>
                        <h2>BUY</h2>
                    </div>
                    <div>
                        Buy Price : {coinData.market_data.current_price.usd}
                        <button onClick={handleBuyClick}>Buy</button>
                    </div>
                </Modal>
            }
            {openSellModal && 
                <Modal 
                    show={openSellModal} 
                    handleClose={handleSellCloseModal}
                >
                    <div>
                        Sell
                    </div>
                </Modal>
            }
            <TopBar />  
            <div>
                <div>
                    <div className="single-coin-title">
                        <div className="rank-wrapper">
                            <span className="single-coin-rank">#{coinData.market_cap_rank}</span>
                        </div>
                        <span className="single-coin-name">{coinData.name}</span>
                        <img src={coinData.image.small} alt="coin icon" className="coin-image" />
                        <span className="single-coin-price">{coinData.market_data.current_price.usd}<span className="currency-space">$</span></span>
                    </div>
                    <div className="coin-chart">
                        <RenderChart
                            name={coinData.name}
                            labels={coinPrices.prices.map( (coin) => {
                                const date = new Date(coin[0]).toLocaleDateString("en-US")
                                return date
                            })} 
                            dataPrices={coinPrices.prices.map( (coin) => {
                                return coin[1]
                            })} />
                    </div>
                    <div className="buy-sell">
                        <button className="buy" onClick={handleOpenBuyModal}>Buy</button>
                        <button className="sell" onClick={handleOpenSellModal}>Sell</button>
                    </div>
                    <div className="description">
                        <h3>About The Coin</h3>
                        <div className="description-text">
                            {removeHyperLink()}
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default CoinDetails;