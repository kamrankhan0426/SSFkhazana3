import React, { useEffect, useState } from 'react';
import './Admin.css';
import handleSpinner from '../spinner';
import { toast } from 'react-toastify';

function Admin() {
    const [userDetail, setUserDetail] = useState(null);
    const [requested, setRequested] = useState(null);
    const [allCoins, setAllCoins] = useState();
    const [newPrice, setNewPrice] = useState()
    const [selectedCoin, setSelectedCoin] = useState('coinA')
    const [coinIndex,setCoinIndex] = useState(0)

    useEffect(() => {
        const getUserDetails = () => {
            const storedUserDetail = JSON.parse(localStorage.getItem('Purple'));
            if (storedUserDetail) {
                setUserDetail(storedUserDetail);
                getNewRequests();
                getCoinsPrices()
            } else {
                window.location.href = '/Login';
            }
        };

        getUserDetails();
    }, []);

    const getNewRequests = async () => {
        const url = new URL('http://localhost:4000/getUsersByQuery');
        url.searchParams.append('accountstatus', 'Pending');

        try {
            const response = await fetch(url, { method: 'GET', redirect: 'follow' });
            const result = await response.json();
            console.log(result.data, 'outSide');
            if (Array.isArray(result.data)) {
                setRequested(result.data);
                console.log(result, 'Inner me');
            } else {
                setRequested([]);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const getCoinsPrices = async () => {
        const url = new URL('http://localhost:4000/getAllCoin');
        const response = await fetch(url, { method: 'GET', redirect: 'follow' });
        const result = await response.json();
        setAllCoins(result)
    }

    const updateCoinPricefun = async (e) => {
        var coinName = e.target.name;
        console.log(e.target.id,e.target.name)
        let updateCoinUrl = new URL('http://localhost:4000/updateCoin');
        updateCoinUrl.searchParams.append('id', e.target.id);
        let oldCoin = allCoins[coinIndex][e.target.name];
        console.log(allCoins)
        var updatedPrice = { Date: getCurrentDate(), Price: parseFloat(newPrice) };
        oldCoin.push(updatedPrice);
        var convertIntoObj = { [coinName]: oldCoin };
        console.log(convertIntoObj)
        const response = await fetch(updateCoinUrl, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(convertIntoObj) });
        const data = await response.json();
        console.log(data.data, 'Data');
    }


    // const insertCoin = async (e) => {
    //     let coinName = e.target.name;
    //     console.log(coinName)
    //     let li = []
    //     var a = {Date : getCurrentDate(),Price :1};
    //     var b = {Date : getCurrentDate(),Price :3}
    //     li.push(a)
    //     li.push(b);
    //     console.log(li)
    //     let insertCoinUrl = new URL("http://localhost:4000/insertCoinPrice");
    //     let res3 = await InsertUser(insertCoinUrl,{coinA:li} );
    //     console.log(res3)
    // }

    const InsertUser = async (url, data) => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: "follow",
            };
            const response = await fetch(url, requestOptions);
            return await response.json();
        } catch (error) {
            throw error;
        }
    };
    const activateThis = (e) => {
        sendForUpdate(requested[e.target.id], e.target.id);
    };

    const sendForUpdate = async (user, idx) => {
        console.log(user, idx)
        try {
            handleSpinner(true);
            let sendForUpdateList = [];

            // Get Parent User Related Activator User
            const getParentUserUrl = new URL("http://localhost:4000/getOneUser");
            getParentUserUrl.searchParams.append("client_Id", user.parent_client_Id);
            let res1 = await findUser(getParentUserUrl);

            // Update Networking earning and Wallet balance of Parent User
            let halfMoney = user.plan_pricing ? parseFloat(user.plan_pricing) / 2 : 0;
            let parentUser = res1.data;
            parentUser.network_earn = parentUser.network_earn ? parseFloat(parentUser.network_earn) + halfMoney : halfMoney;
            parentUser.balance = parentUser.balance ? parseFloat(parentUser.balance) + halfMoney : halfMoney;
            delete parentUser.profileimg
            sendForUpdateList.push({ filter: parentUser.email, values: parentUser })

            // Update Current User Account Status that Activated
            user.accountstatus = 'Activated';
            delete user.profileimg;
            sendForUpdateList.push({ filter: user.email, values: user });

            // Add Money in Owner or Admin Account
            const getAdminUrl = new URL("http://localhost:4000/getOneUser");
            getAdminUrl.searchParams.append("email", userDetail.email);
            let res2 = await findUser(getAdminUrl);
            let admin = res2.data
            admin.network_earn = admin.network_earn ? parseFloat(admin.network_earn) + halfMoney : halfMoney;
            admin.balance = admin.balance ? parseFloat(admin.balance) + halfMoney : halfMoney;
            delete admin.profileimg;
            sendForUpdateList.push({ filter: admin.email, values: admin });


            const dataToUpdate = sendForUpdateList;
            var url = new URL("http://localhost:4000/updateManyData")
            const response = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dataToUpdate), });

            const data = await response.json();
            console.log(data.data, 'Data');

            handleSpinner(false);
            if (data.message === 'Data not found') {
                toast.error('Invalid email address');
            } else {
                toast.success('Activated successfully');
                let tempStore = user
                let userD = [...requested];
                userD.splice(idx, 1);
                setRequested(userD)
                var sendMail = new URL('http://localhost:4000/sendUserCLientId')
                const resp = await fetch(sendMail, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: tempStore.email, client_Id: tempStore.client_Id }) });
                const res = await resp.json();
                console.log(res)

            }
        } catch (error) {
            handleSpinner(false);
            console.log('Error updating data:', error);
            toast.error('Something went wrong');
        }
    };



    async function findUser(url) {
        try {
            const response = await fetch(url, { method: 'GET', redirect: "follow" });
            const result = await response.json();
            return result;
        } catch (error) {
            throw error;
        }
    }


    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();   // 4-digit year
        const month = currentDate.getMonth() + 1; // month (0 - 11)
        const day = currentDate.getDate();        // day of the month
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        console.log(formattedDate);
        return formattedDate;
    }
  
    const setCoins = (e) => {
        setSelectedCoin(e.target.value);
        let idx = e.target.value === 'coinA' ? 0 : e.target.value === 'coinB' ? 1 : 2;
        setCoinIndex(idx);
      };
      
      useEffect(() => {
        console.log(coinIndex);
      }, [coinIndex]); // Run this effect whenever coinIndex changes
      
      // Rest of your code...
      
    return (
        <div style={{ width: '100%' }}>
            {/* <button onClick={insertCoin} >Add Price</button> */}
            <div style={{margin:'2vh'}}>
                {allCoins && allCoins[coinIndex][selectedCoin] && allCoins[coinIndex][selectedCoin].length > 0 ? (
                    <button>
                        Current Price: {allCoins[coinIndex][selectedCoin][allCoins[coinIndex][selectedCoin].length - 1].Price}
                    </button>
                ) : null}
                <select onChange={setCoins}>
                    <option value="coinA">CoinA</option>
                    <option value="coinB">CoinB</option>
                    <option value="coinC">CoinC</option>
                </select>

                <input onChange={(e) => setNewPrice(e.target.value)} ></input>
                <button onClick={updateCoinPricefun} name={selectedCoin} id={selectedCoin} >Update Coin Price</button>
            </div>
            {!requested || requested.length === 0 ? (
                <div className='text-center'>No request found</div>
            ) : (
                <section className='AdminTablebg'>
                    <h1 className='p-4' >Pending Requests</h1>
                    <div className="tbl-header tbl-content">
                        <table cellPadding={0} cellSpacing={0} border={0}>
                            <thead>
                                <tr>
                                    <th>Sr.No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Created Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requested.map((user, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.createddatetime}</td>
                                        <td>
                                            <button type="button" className="btn btn-primary" id={idx} onClick={activateThis} >Activate</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </div>
    );
}

export default Admin;
