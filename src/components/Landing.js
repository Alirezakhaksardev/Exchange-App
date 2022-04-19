import React , {useEffect , useState} from 'react';

// API
import { getCoin } from '../services/api';

// components
import { SpinnerRoundFilled  } from 'spinners-react';
import Coin from './Coin';

// Styles
import styles from "./Landing.module.css";


const Landing = () => {
    
    const [coins , setCoins] = useState([]);
    const [search , setSearch] = useState("");
    useEffect(() => {
        const fetchAPI = async () =>{
            const data = await getCoin();
            console.log(data);
            setCoins(data);
        }
        fetchAPI();
    }, [])

    const searchHandler = (event) => {
        setSearch(event.target.value);
    }
    const searchCoin = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className="landing">
            
            <input type="text" className={styles.input} placeholder="Search" onChange={searchHandler} />

            
            {coins.length ? 
                <div className={styles.coinContainer}>

                    {
                        searchCoin.length ?                   
                        searchCoin.map((coin) => <Coin 
                                    key={coin.id}
                                    name={coin.name}
                                    symbol={coin.symbol}
                                    image={coin.image}
                                    price={coin.current_price}
                                    marketCap={coin.market_cap}
                                    priceChange={coin.price_change_percentage_24h}
                                />)
                        :
                        <p>Not Found</p>
                    }
                    </div>
                :
                <div className="loading">
                    <SpinnerRoundFilled  size="100" />
                </div>
            }
            </div>
    );
}

export default Landing;
