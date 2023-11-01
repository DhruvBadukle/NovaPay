import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
const Exchanges = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
      .then(async (res) => {
        await setData(res.data);
        await setFilteredData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (e) => {
    const searchData = data.filter((ex) => ex.id.startsWith(e.toLowerCase()));
    setFilteredData(searchData);
  };

  return (
    <Fragment>
      <div className="result-box">
        <input type="text" onChange={(e) => handleSearch(e.target.value)} placeholder="  Search Here.." className="search" />
         <div className='Lable'>
            <h1>Ranck</h1>
            <h1>Name</h1>
            <h1>Symbol</h1>
            <h1>Price</h1>
            <h1>volume</h1>
            <h1>Market Cap</h1>
        </div> 
        {filteredData.map((element) => (
          <div className="result" key={element.id}>
            <div className="coin_row">
              <div className="coin_coin">
                <h2 className="ranck">{element.market_cap_rank}</h2>
                <img src={element.image} alt="" className="coin_img" />
                <h3 className="coin_name">{element.name}</h3>
                <h4 className="coin_symb">{element.symbol}</h4>
              </div>
              <div className="coin_data">
                <p className="coin_price">{element.current_price} $</p>
                <p className="coin_volume">{element.total_volume}</p>
                <p className="coin_cap">{element.market_cap}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Exchanges;
