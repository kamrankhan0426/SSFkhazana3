import React, { useEffect, useState } from 'react'
import './Profile.css'
import { toast } from 'react-toastify';
import handleSpinner from '../spinner';


function Profile() {

  const [userDetail, setUserDetail] = useState();
  const [networks, setNetworks] = useState([]);

  useEffect(() => {
    const storedUserDetail = JSON.parse(localStorage.getItem('Purple'));
    if (storedUserDetail) {
      setUserDetail(storedUserDetail);
      findNetwork(storedUserDetail.client_Id);
    } else {
      window.location.href = '/Login';
    }
  }, []);

  const findNetwork = async (client_Id) => {
    const url = new URL('http://localhost:4000/getUsersByQuery');
    url.searchParams.append('parent_client_Id', client_Id);
    try {
      const response = await fetch(url, { method: 'GET', redirect: 'follow' });
      const result = await response.json();
      console.log(result);
      setNetworks(result.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleProfileChange = (event) => {
    setUserDetail((prevUserDetail) => ({
      ...prevUserDetail,
      [event.target.name]: event.target.value,
    }));
  };

  const sendForUpdate = async () => {
    try {
      handleSpinner(true);
      const url = new URL('http://localhost:4000/updateData');
      url.searchParams.append('email', userDetail.email);
      const dataToUpdate = userDetail;
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToUpdate),
      });
      const data = await response.json();
      console.log(data.data, 'Data');
      localStorage.setItem('Purple', JSON.stringify(data.data));
      handleSpinner(false);
      if (data.message === 'Data not found') {
        toast.error('Invalid email address');
      } else {
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      handleSpinner(false);
      console.log('Error updating data:', error);
      toast.error('Something went wrong');
    }
  };

  const handleCancel = () => {
    const storedUserDetail = JSON.parse(localStorage.getItem('Purple'));
    if (storedUserDetail) {
      setUserDetail(storedUserDetail);
      console.log(userDetail)
    } else {
      window.location.href = '/Login';
    }
  };

  const profileImageonChange = async (e) => {
    const file = e.target.files[0];
    const base64Data = await convertToBase64(file);
    if (base64Data) {
      const updatedUserDetail = { ...userDetail, profileimg: base64Data };
      setUserDetail(updatedUserDetail);
    }
  };

  async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target.result;
        resolve(base64Data);
      };
      reader.onerror = (error) => {
        console.log('Error occurred while reading the file:', error);
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  // useEffect(()=>{
  //   console.log(userDetail)
  // },[userDetail])



  return (
    <div style={{width:'100%'}}>
     
      {userDetail ?
        <section className=" pb-2 mb-2 ">
          <div className="Profilecontainer" style={{ textAlign: 'left' }}>
            <div className="bg-white shadow rounded-lg d-block d-sm-flex">
              <div className="profile-tab-nav border-right d-none">
                <div className="p-4">
                  <div className="img-circle text-center mb-3">
                    <img src={userDetail.profileimg?userDetail.profileimg:"https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"}  alt="Image" className="shadow"  />
                  </div>
                  <h4 className="text-center">{userDetail.client_Id}</h4>
                </div>
                <div
                  className="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="nav-link active"
                    id="account-tab"
                    data-toggle="pill"
                    href="#account"
                    role="tab"
                    aria-controls="account"
                    aria-selected="true"
                  >
                    <i className="fa fa-home text-center mr-1" />
                    Account
                  </a>
                  <a
                    className="nav-link"
                    id="password-tab"
                    data-toggle="pill"
                    href="#password"
                    role="tab"
                    aria-controls="password"
                    aria-selected="false"
                  >
                    <i className="fa fa-key text-center mr-1" />
                    Password
                  </a>
                  <a
                    className="nav-link"
                    id="security-tab"
                    data-toggle="pill"
                    href="#security"
                    role="tab"
                    aria-controls="security"
                    aria-selected="false"
                  >
                    <i className="fa fa-user text-center mr-1" />
                    Security
                  </a>
                  <a
                    className="nav-link"
                    id="application-tab"
                    data-toggle="pill"
                    href="#application"
                    role="tab"
                    aria-controls="application"
                    aria-selected="false"
                  >
                    <i className="fa fa-tv text-center mr-1" />
                    Networks
                  </a>
                  <a
                    className="nav-link"
                    id="notification-tab"
                    data-toggle="pill"
                    href="#notification"
                    role="tab"
                    aria-controls="notification"
                    aria-selected="false"
                  >
                    <i className="fa fa-bell text-center mr-1" />
                    Notification
                  </a>
                </div>
              </div>
              <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="account"
                  role="tabpanel"
                  aria-labelledby="account-tab"
                >
                  <h3 className="mb-4">Code no : {userDetail.client_Id}</h3>
                  <div style={{ display: 'flex', justifyContent: 'center' }} className='my-4'>
                    <div className="small-12 medium-2 large-2 columns">
                      <div className="circle" style={{ backgroundImage: `url(${userDetail.profileimg})`,backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'cover' }}>
                        {!userDetail.profileimg && (
                          <img
                            className="profile-pic"
                            src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                            id='profileImage'
                            alt="Profile"
                          />
                        )}
                      </div>
                    </div>
                    <div className="p-image">
                      <label htmlFor="pfimg">
                        <i className="fa fa-camera upload-button" style={{ marginLeft: '-3vh',color:'black' }} />
                      </label>
                      <input className="file-upload" type="file" accept="image/*" id="pfimg" multiple="false" onChange={profileImageonChange} />
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name='firstname'
                          onChange={handleProfileChange}
                          value={userDetail.firstname}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name='lastname'
                          value={userDetail.lastname}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="text"
                          className="form-control"
                          disabled
                          defaultValue={userDetail.email}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Phone number</label>
                        <input
                          type="text"
                          className="form-control"
                          name='phone'
                          onChange={handleProfileChange}
                          value={userDetail.phone}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Aadhaar No.</label>
                        <input
                          type="text"
                          className="form-control"
                          maxLength={12}
                          name='aadhaar'
                          onChange={handleProfileChange}
                          value={userDetail.aadhaar}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          name='dob'
                          onChange={handleProfileChange}
                          value={userDetail.dob ? userDetail.dob.slice(0, 10):''}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Bio</label>
                        <textarea
                          className="form-control"
                          rows={4}
                          name='bio'
                          onChange={handleProfileChange}
                          value={userDetail.bio}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary" onClick={sendForUpdate} >Update</button>
                    <button className="btn btn-light" onClick={handleCancel} >Cancel</button>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="password"
                  role="tabpanel"
                  aria-labelledby="password-tab"
                >
                  <h3 className="mb-4">Password Settings</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Old password</label>
                        <input type="password" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>New password</label>
                        <input type="password" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Confirm new password</label>
                        <input type="password" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary">Update</button>
                    <button className="btn btn-light">Cancel</button>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="security"
                  role="tabpanel"
                  aria-labelledby="security-tab"
                >
                  <h3 className="mb-4">Security Settings</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Login</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Two-factor auth</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="recovery"
                          />
                          <label className="form-check-label" htmlFor="recovery">
                            Recovery
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary">Update</button>
                    <button className="btn btn-light">Cancel</button>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="application"
                  role="tabpanel"
                  aria-labelledby="application-tab"
                >
                  <h3 className="mb-4">Your Networks</h3>
                  <div className="row">
                    {networks ?
                      <div class="TableProfcontainer">
                        <table className='ProfileNetwordtable' >
                          <thead>
                            <tr>
                              <th>Sr.No.</th>
                              <th>Client Id</th>
                              <th>Name</th>
                              <th>Email</th>
                            </tr>
                          </thead>
                          <tbody>
                            {networks.map((user, idx) => {
                              return (
                                <tr>
                                  <td>{idx + 1}</td>
                                  <td>{user.client_Id}</td>
                                  <td>{user.name}</td>
                                  <td>{user.email}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                      :
                      <div className='text-center' style={{width:'100%'}} >no netword found</div>}
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="notification"
                  role="tabpanel"
                  aria-labelledby="notification-tab"
                >
                  <h3 className="mb-4">Notification Settings</h3>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="notification1"
                      />
                      <label className="form-check-label" htmlFor="notification1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
                        accusantium accusamus, neque cupiditate quis
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="notification2"
                      />
                      <label className="form-check-label" htmlFor="notification2">
                        hic nesciunt repellat perferendis voluptatum totam porro
                        eligendi.
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="notification3"
                      />
                      <label className="form-check-label" htmlFor="notification3">
                        commodi fugiat molestiae tempora corporis. Sed dignissimos
                        suscipit
                      </label>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary">Update</button>
                    <button className="btn btn-light">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        : <></>}
    </div>
  )
}

export default Profile