import React, { useEffect, useState } from 'react'
import './Wallet.css'
import { toast } from 'react-toastify';

function WalletPage({ networks, userDetail, setUserDetail }) {

    const [upiFlag, setUpiFlag] = useState(false)
    const [upi, setUpi] = useState()
    useEffect(() => {
        const getLatestUser = new URL("http://localhost:4000/getOneUser");
        getLatestUser.searchParams.append("email", userDetail.email);
        findUser(getLatestUser);
    }, [])

    async function findUser(url) {
        try {
            const response = await fetch(url, { method: 'GET', redirect: "follow" });
            const result = await response.json();
            setUserDetail(result.data)
            return result;
        } catch (error) {
            throw error;
        }
    }

    const withDrawBtnClick = () => {
        console.log(parseFloat(userDetail.balance))
        if (parseFloat(userDetail.balance) < 1) {
            toast.error('Minimum withdraw amount 10')
            return;
        }
        setUpiFlag(true)
    }

    return (
        <div style={{ width: '100%' }}>
            <div className="wrappper">
                <ul className="tab-wrap">
                    <li>
                        <input type="radio" id="tab-1" name="tab" defaultChecked="true" />
                        <label htmlFor="tab-1">Available Balance</label>
                        <div className="tab-content">
                            <h2 style={{ float: 'left', padding: '1vh' }} > Your Earnings : {userDetail.balance ? userDetail.balance : '0.00'}</h2>
                            <div style={{ width: '100%', textAlign: 'right', padding: '1vh' }}>
                                <button className="animated-button" style={{ letterSpacing: '2px' }} onClick={withDrawBtnClick} >
                                    <span>Withdraw</span>
                                    <span />
                                </button>
                            </div>
                            <br />
                            <div style={{ padding: '1vh' }} >
                                <h5>UPI Id</h5>
                                <input type='text' className='bg-transparent border border-white rounded-3 px-3 text-white' placeholder='Enter upi id' style={{ color: 'white', padding: '2px' }} onChange={(e) => setUpi(e.target.value)}></input></div>
                        </div>
                    </li>
                    <li>
                        <input type="radio" id="tab-2" name="tab" />
                        <label htmlFor="tab-2">Referral Earning</label>
                        <div className="tab-content">
                            <h2>Earning : {userDetail.network_earn ? userDetail.network_earn : '0.00'}</h2>
                            <p>
                                {networks ?
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Sr.No</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Account type</th>
                                                <th scope="col">Created Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {networks.map((user, idx) => {
                                                return (
                                                    user.accountstatus === 'Activated' ?
                                                        <tr key={idx}>
                                                            <th scope="row">{idx + 1}</th>
                                                            <td>{user.name}</td>
                                                            <td>{user.accounttype}</td>
                                                            <td>{user.createddatetime}</td>
                                                        </tr> : <></>
                                                )
                                            })}
                                        </tbody>
                                    </table> : <div className='text-center'>No Referrals found</div>
                                    }
                            </p>
                        </div>
                    </li>
                    <li>
                        <input type="radio" id="tab-3" name="tab" />
                        <label htmlFor="tab-3">Add Money</label>
                        <div className="tab-content">
                            <h2>This Feature coming soon</h2>
                            <p>

                            </p>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default WalletPage