import React, { useEffect, useState } from 'react';
import './Admin.css';
import handleSpinner from '../spinner';
import { toast } from 'react-toastify';

function Admin() {
    const [userDetail, setUserDetail] = useState(null);
    const [requested, setRequested] = useState(null);

    useEffect(() => {
        const getUserDetails = () => {
            const storedUserDetail = JSON.parse(localStorage.getItem('Purple'));
            if (storedUserDetail) {
                setUserDetail(storedUserDetail);
                getNewRequests();
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

    const activateThis = (e) => {
        sendForUpdate(requested[e.target.id], e.target.id);
    };

    const sendForUpdate = async (user, idx) => {
        console.log(user,idx)
        try {
            handleSpinner(true);
            const url = new URL('http://localhost:4000/updateData');
            url.searchParams.append('email', user.email);
            user.accountstatus = 'Activated';
            const dataToUpdate = user;
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToUpdate),
            });
            const data = await response.json();
            console.log(data.data, 'Data');
            handleSpinner(false);
            if (data.message === 'Data not found') {
                toast.error('Invalid email address');
            } else {
                toast.success('Activated successfully');
                console.log(res)
                let tempStore = user
                let userD = [...requested];
                userD.splice(idx, 1);
                setRequested(userD)
                var sendMail = new URL('http://localhost:4000/sendUserCLientId')
                const resp = await fetch(sendMail, {method: 'POST',headers: { 'Content-Type': 'application/json' },body: JSON.stringify({email:tempStore.email,client_Id:tempStore.client_Id})});
                const res = await resp.json();
                
            }
        } catch (error) {
            handleSpinner(false);
            console.log('Error updating data:', error);
            toast.error('Something went wrong');
        }
    };

    return (
        <div style={{ width: '100%' }}>
            {!requested || requested.length === 0 ? (
                <div className='text-center'>No request found</div>
            ) : (
                <section className='AdminTablebg'>
                    <h1>Pending Requests</h1>
                    <div className="tbl-header">
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
                        </table>
                    </div>
                    <div className="tbl-content">
                        <table cellPadding={0} cellSpacing={0} border={0}>
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
