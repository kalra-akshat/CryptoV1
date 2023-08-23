import { useEffect, useState } from 'react';
import './App.css';
import Coin from './Components/Coins';
import axios from 'axios';
import sun from './images/lightT.webp'
import moon from './images/darkT.png'

function App() {
  const [coins, setCoins] = useState([]);
  const [search, updateSearch] = useState('');
  const [inputVal, updateInput] = useState('');
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1')
      .then(res => {
        setCoins(res.data)
      }
      ).catch(error => console.log(error))
  }, [])


  const handleInputChange = (event) => {
    updateSearch(event.target.value.toLowerCase())
    updateInput(event.target.value)
  }

const handleKeyDown = (event) =>{
  event.key==="Enter"? updateInput('')&&updateSearch(event.target.value) : updateSearch(event.target.value)
}
  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search))
  const handleClick = () => {
    setDarkTheme(oldValue => !oldValue);
  }
  return (
    <div className={`${darkTheme ? 'darkT' : 'lightT'}`}>
      <img src={`${darkTheme? moon: sun }`} className="themebtn" onClick={handleClick}></img>
      <div className='search'>
        {/* <form action=''> */}
          <input type='text' className='searchInput' placeholder='Search Coin' onKeyDown={handleKeyDown} onChange={handleInputChange} value={inputVal}/>
        {/* </form> */}
      </div>
      <table style={{ width: "70%", marginBottom: "2%" }}>
        <tr>
          <th style={{ width: "39%" }}>COIN</th>
          <th style={{ width: "15%" }}>PRICE</th>
          <th style={{ width: "20%" }}>PRICE CHANGE</th>
          <th>MARKET CAP</th>
        </tr>

      </table>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            pricechange={coin.price_change_percentage_24h}
          />
        );
      })}


    </div>

  );
}

export default App;
