import React, { useEffect, useState } from 'react'
import './CoinPage.css'

function CoinPage({userDetail}) {
    const [allCoins, setAllCoins] = useState();

    useEffect(() => {
        getCoinsPrices();
    }, [])

    const getCoinsPrices = async () => {
        const url = new URL('http://localhost:4000/getAllCoin');
        const response = await fetch(url, { method: 'GET', redirect: 'follow' });
        const result = await response.json();
        setAllCoins(result)
    }

    const buy = e => {
        var coinId = e.target.id
        var value = document.getElementById('forBuyCoin').value
        console.log(coinId,value)
    }

    const sell = e => {
        var coinId = e.target.id
        var value = document.getElementById('forSellCoin').value
        console.log(coinId,value)

    }


    useEffect(() => {
        console.log(allCoins)
    }, [allCoins])
    return (
        <div style={{width:'100%'}}>
            <style>
                {` 
               .coinTable{
               }
               .coinTable th{
                padding:1vh;    
                font-size:1.2rem;      
                width:2vh;
                color:white;
                border-radius:5px;
                margin:1vh;
               }
               .coinTable td{
                 background-color:white;
               }
               .coinTable td:hover{
                background-color:whitesmoke;
              }
              .coinInput {
                border-radius: 3px;
                padding: 1vh;
               }
            
              .coinInput:onfocus {
                border-radius: 3px;
                padding: 1vh;
                border: 1px solid black;
                background:alicblue;
               }
              `}
            </style>
           {allCoins && allCoins.length > 0 ? 
            <div className="tabs">
            <input type="radio" name="tabs" id="tabone" defaultChecked="checked" />
            <label htmlFor="tabone"><i className="mdi mdi-currency-usd menu-icon" /> CoinSpectra</label>
            <div className="tab text-left">
                <h4 style={{ color: 'black',borderBottom:'1px solid black' }} className='p-2'>CoinSpectra Current Price : {allCoins ? allCoins[0].coinA[allCoins[0].coinA.length - 1].Price : 'Data not load please refresh'}</h4>
                <div>
                    <table className='coinTable'>
                        <tr>
                            <th style={{ color: 'black' }} ><b>Date</b></th>
                            {allCoins && allCoins[0].coinA.map((item) => {
                                return (
                                    <td style={{ color: 'black' }} >{item.Date}</td>
                                )
                            })}
                        </tr>
                        <tr>
                            <th style={{ color: 'black' }} ><b>Prices</b></th>
                            {allCoins && allCoins[0].coinA.map((item) => {
                                return (
                                    <td style={{ color: 'black' }} >{item.Price}</td>
                                )
                            })}
                        </tr>
                    </table>
                   <div className='m-2 p-2' style={{borderTop:'1px solid black'}}>
                   <h5>{userDetail && userDetail.purchased_coinA ? 'You have ' + userDetail.purchased_coinA : 'You have 0'}</h5>
                   </div>
                </div>
            </div>
            <input type="radio" name="tabs" id="tabtwo" />
            <label htmlFor="tabtwo"><i className="mdi mdi-currency-eur menu-icon" /> CoinCove</label>
            <div className="tab text-left">
                <h4 style={{ color: 'black',borderBottom:'1px solid black' }} className='p-2' >CoinCove Current Price : {allCoins ? allCoins[1].coinB[allCoins[1].coinB.length - 1].Price : 'Data not load please refresh'}</h4>
                <div>
                    <table className='coinTable' >
                        <tr>
                            <th style={{ color: 'black' }} ><b>Date</b></th>
                            {allCoins && allCoins[1].coinB.map((item) => {
                                return (
                                    <td style={{ color: 'black' }} >{item.Date}</td>
                                )
                            })}
                        </tr>
                        <tr>
                            <th style={{ color: 'black' }} ><b>Prices</b></th>
                            {allCoins && allCoins[1].coinB.map((item) => {
                                return (
                                    <td style={{ color: 'black' }} >{item.Price}</td>
                                )
                            })}
                        </tr>
                    </table>
                    <div className='m-2 p-2' style={{borderTop:'1px solid black'}}>
                    <h5>{userDetail && userDetail.purchased_coinB ? 'You have ' + userDetail.purchased_coinB : 'You have 0'}</h5>
                   </div>
                </div>
            </div>
            <input type="radio" name="tabs" id="tabthree" />
            <label htmlFor="tabthree"><i className="mdi mdi-bitcoin menu-icon" /> CoinMosaic</label>
            <div className="tab text-left">
                <h4 style={{ color: 'black',borderBottom:'1px solid black' }} className='p-2'>CoinMosaic Current Price : {allCoins ? allCoins[2].coinC[allCoins[2].coinC.length - 1].Price : 'Data not load please refresh'}</h4>
                <div>
                    <table className='coinTable' >
                        <tr>
                            <th style={{ color: 'black' }} ><b>Date</b></th>
                            {allCoins && allCoins[2].coinC.map((item) => {
                                return (
                                    <td style={{ color: 'black' }} >{item.Date}</td>
                                )
                            })}
                        </tr>
                        <tr>
                            <th style={{ color: 'black' }} ><b>Prices</b></th>
                            {allCoins && allCoins[2].coinC.map((item) => {
                                return (
                                    <td style={{ color: 'black' }} >{item.Price}</td>
                                )
                            })}
                        </tr>
                    </table>
                    <div className='m-2 p-2' style={{borderTop:'1px solid black'}}>
                       <h5>{userDetail && userDetail.purchased_coinC ? 'You have ' + userDetail.purchased_coinC : 'You have 0'}</h5>
                   </div>
                </div>
            </div>
        </div>
        :<></>}
            <div className='text-left'>
                <div className='p-2'  >
                    <button type="button" class="btn btn-success m-2" id='coinC' onClick={buy}  >Buy</button>
                    <input className='coinInput' id='forBuyCoin'></input>
                </div>
                <div className='p-2' >
                    <button type="button" class="btn btn-danger m-2" id='coinC' onClick={sell} >Sell</button>
                    <input className='coinInput' id='forSellCoin' ></input>
                </div>

                <i className="mdi mdi-information menu-icon p-3" title="Information: This is some important information." style={{fontSize:'1.5rem'}} >Please refresh page before buy or sell to get updated coin price</i>

            </div>
            
        </div>
    )
}

export default CoinPage