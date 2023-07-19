import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import PrizeWheel from "./PrizeWheel";
import Profile from './Pages/Profile'
import Admin from "./Pages/Admin";
import CoinPage from "./Pages/CoinPage";
import WalletPage from "./Pages/WalletPage";

export default function Home() {

  const [userDetail, setUserDetail] = useState();
  const [networks, setNetwords] = useState();
  const [activeTab, setactiveTab] = useState('Dashboard');


  useEffect(() => {
    let userDetail = JSON.parse(localStorage.getItem('Purple'))
    if (userDetail) {      
      setUserDetail(userDetail)
      findUser(userDetail)
      findNetwork(userDetail.client_Id)
    } else {
      let a = document.createElement('a')
      a.href = '/Login'
      a.click()
    }
  }, [])

  const findNetwork = async (client_Id) => {
    const url = new URL("http://localhost:4000/getUsersByQuery");
    url.searchParams.append("parent_client_Id", client_Id);
    try {
      const response = await fetch(url, { method: "GET", redirect: "follow" });
      const result = await response.json();
      console.log(result)
      setNetwords(result.data)
    } catch (error) {
      throw error;
    }
  }
  
  useEffect(()=>{
    console.log(networks,'Networks')
  },[networks])
  

  const findUser = async (userDetail) => {
    try {
        const getParentUserUrl = new URL("http://localhost:4000/getOneUser");
        getParentUserUrl.searchParams.append("email", userDetail.email);
        const response = await fetch(getParentUserUrl, { method: 'GET', redirect: "follow" });
        const result = await response.json();
        console.log(result,'Result is here')
        setUserDetail(result.data);
        return result;
    } catch (error) {
      throw error;
    }
  };
  
  useEffect(()=>{console.log(userDetail)},[userDetail])

  return (
    <div>
      <style>{`.profileDropdown a:hover{color:green !important;}`}</style>

      {userDetail ?
        <>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
          <link rel="stylesheet" href="assets/vendors/mdi/css/materialdesignicons.min.css" />
          <link rel="stylesheet" href="assets/vendors/css/vendor.bundle.base.css" />
          <link rel="stylesheet" href="assets/css/style.css" />
          <link rel="shortcut icon" href="assets/images/favicon.ico" />

          <div className="container-scroller"  >
            <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
              <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a className="navbar-brand brand-logo" href="/home" style={{
                  maxWidth: "100%",
                  height: "90px",
                  margin: "auto",
                  verticalAlign: "middle"
                }}><img src="assets/images/logo.png" alt="logo" /></a>
                <a className="navbar-brand brand-logo-mini" href="/home"><img src="assets/images/logo.png" alt="logo" /></a>
              </div>
              <div className="navbar-menu-wrapper d-flex align-items-stretch">
                {/* <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize" id="togglerofNavbar">
                <span className="mdi mdi-menu" />
                </button> */}
                <button  className="bg-transparent border-0 p-0 m-0 navbar-toggler navbar-toggler align-self-center"  type="button"  data-bs-toggle="offcanvas"  data-bs-target="#offcanvasWithBackdrop"  aria-controls="offcanvasWithBackdrop">
                <span className="mdi mdi-menu" />
               </button>

                <ul className="navbar-nav navbar-nav-right profileDropdown">
                  <li className="nav-item nav-profile dropdown">
                    <a className="nav-link dropdown-toggle" id="profileDropdown" href="#/" data-toggle="dropdown" aria-expanded="false">
                      <div className="nav-profile-img">
                        <img src={userDetail.profileimg ? userDetail.profileimg : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt="profile" style={{ border: "1px solid #e0dfdf" }} />
                        <span className="availability-status online" />
                      </div>
                      <div className="nav-profile-text">
                        <p className="mb-1 text-black">{userDetail.client_Id}</p>
                      </div>
                    </a>
                    <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                      <a className="dropdown-item" href="#/" onClick={() => setactiveTab('Profile')} >
                        <i className="mdi mdi-account-circle-outline mr-2 text-dark"  /> Profile </a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="#/">
                        <i className="mdi mdi-cached mr-2 text-success" /> Activity Log </a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="#/" onClick={()=>{localStorage.removeItem('Purple'); window.location.href='/Login'}}>
                        <i className="mdi mdi-logout mr-2 text-primary" /> Signout </a>
                    </div>
                  </li>

                </ul>
                <button  className="bg-transparent border-0 p-0 m-0 navbar-toggler navbar-toggler navbar-toggler-right d-lg-none align-self-center"  type="button"  data-bs-toggle="offcanvas"  data-bs-target="#offcanvasWithBackdrop"  aria-controls="offcanvasWithBackdrop">
                <span className="mdi mdi-menu" />
               </button>

                {/* <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                  <span className="mdi mdi-menu" />
                </button> */}
              </div>
            </nav>
            <div className="container-fluid page-body-wrapper">
              <nav className="sidebar sidebar-offcanvas" id="sidebar" style={{width:0}} >
                <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
                    <div className="offcanvas-header">
                      <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">
                      </h5>
                      <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"aria-label="Close"/>
                    </div>
                    <div className="offcanvas-body">
                <ul className="nav">               
                  <li className="nav-item nav-profile">
                    <a href="/Home" className="nav-link">
                      <div className="nav-profile-image">
                        <img src={userDetail.profileimg ? userDetail.profileimg : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt="profile" style={{ border: "1px solid #e0dfdf" }} />
                        <span className="login-status online" />
                      </div>
                      <div className="nav-profile-text d-flex flex-column text-left">
                        <span className="font-weight-bold mb-2">{userDetail.name ? userDetail.name : '! Your name'}</span>
                        <span className="text-secondary text-small">Project Manager</span>
                      </div>
                      <i className="mdi mdi-bookmark-check text-success nav-profile-badge" />
                    </a>
                  </li>
                  <li className={activeTab === 'Dashboard' ? 'nav-item active' : 'nav-item'} data-bs-dismiss="offcanvas"aria-label="Close" onClick={() => setactiveTab('Dashboard')} >
                    <a className="nav-link" href="#/"  >
                      <span className="menu-title">Dashboard</span>
                      <i className="mdi mdi-home menu-icon" />
                    </a>
                  </li>
                  <li className={activeTab === 'Spin The wheel' ? 'nav-item active' : 'nav-item'} data-bs-dismiss="offcanvas"aria-label="Close" onClick={() => setactiveTab('Spin The wheel')}  >
                    <a className="nav-link" href="#/" >
                      <span className="menu-title">Spin The wheel</span>
                      <i className="mdi mdi-gift menu-icon" />
                    </a>
                  </li>                  
                  {userDetail.masteraccount ? <li className={activeTab === 'Admin' ? 'nav-item active' : 'nav-item'} data-bs-dismiss="offcanvas"aria-label="Close" onClick={() => setactiveTab('Admin')} >
                    <a className="nav-link" href="#/" >
                      <span className="menu-title">Admin</span>
                      <i className="mdi mdi-shield-account menu-icon" />
                    </a>
                  </li>:''}
                  <li className={activeTab === 'Coins' ? 'nav-item active' : 'nav-item'} data-bs-dismiss="offcanvas"aria-label="Close" onClick={() => setactiveTab('Coins')}  >
                    <a className="nav-link" href="#/" >
                      <span className="menu-title">Coins</span>
                      <i className="mdi mdi-coin menu-icon" />
                    </a>
                  </li>   
                  <li className={activeTab === 'Wallet' ? 'nav-item active' : 'nav-item'} data-bs-dismiss="offcanvas"aria-label="Close" onClick={() => setactiveTab('Wallet')}  >
                    <a className="nav-link" href="#/" >
                      <span className="menu-title">Wallet</span>
                      <i className="mdi mdi-wallet menu-icon" />
                    </a>
                  </li>  
                  <li className={activeTab === 'Profile' ? 'nav-item active' : 'nav-item'}  onClick={() => setactiveTab('Profile')}>
                    <a className="nav-link" data-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
                      <span className="menu-title">Profile</span>
                      <i className="mdi menu-icon mdi-account-edit " />
                    </a>
                    <div className="collapse" id="general-pages">
                      <ul className="nav flex-column sub-menu">
                        <li className="nav-item"> <a className="nav-link" data-bs-dismiss="offcanvas"aria-label="Close" data-toggle="pill" href="#account" role="tab" aria-controls="account" aria-selected="false"> Account </a></li>
                        <li className="nav-item"> <a className="nav-link" data-bs-dismiss="offcanvas"aria-label="Close" id="password-tab" data-toggle="pill" href="#password" role="tab" aria-controls="password" aria-selected="false"> Password </a></li>
                        <li className="nav-item"> <a className="nav-link" data-bs-dismiss="offcanvas"aria-label="Close" id="application-tab" data-toggle="pill" href="#application" role="tab" aria-controls="application" aria-selected="false"> Networks </a></li>
                        <li className="nav-item"> <a className="nav-link" data-bs-dismiss="offcanvas"aria-label="Close" id="security-tab" data-toggle="pill" href="#security" role="tab" aria-controls="security" aria-selected="false"> Security </a></li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item sidebar-actions">
                    <span className="nav-link">
                      <div className="border-bottom">
                        <h6 className="font-weight-normal mb-3" data-bs-dismiss="offcanvas"aria-label="Close">Projects</h6>
                      </div>
                      <button className="btn btn-block btn-lg btn-gradient-primary mt-4" data-bs-dismiss="offcanvas"aria-label="Close">+ Add a project</button>
                    </span>
                  </li>
                </ul>
                </div>
                </div>
              </nav>
              <div className="main-panel" style={{width:'100%'}} >
                <div className={activeTab === 'Dashboard' ? 'content-wrapper' : 'content-wrapper d-none'}>
                  <div className="page-header">
                    <h3 className="page-title">
                      <span className="page-title-icon bg-gradient-primary text-white mr-2">
                        <i className="mdi mdi-home" />
                      </span> Dashboard
                    </h3>
                  </div>
                  <div className="row">
                    <div className="col-md-4 stretch-card grid-margin">
                      <div className="card bg-gradient-danger card-img-holder text-white">
                        <div className="card-body">
                          <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                          <h4 className="font-weight-normal mb-3">Today's Income <i className="mdi mdi-chart-line mdi-24px float-right" />
                          </h4>
                          <h2 className="mb-5">Rs 5,000</h2>
                          <h6 className="card-text">Increased by 40%</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 stretch-card grid-margin">
                      <div className="card bg-gradient-info card-img-holder text-white">
                        <div className="card-body">
                          <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                          <h4 className="font-weight-normal mb-3">Monthly Income <i className="mdi mdi-bookmark-outline mdi-24px float-right" />
                          </h4>
                          <h2 className="mb-5">Rs 45,334</h2>
                          <h6 className="card-text">Decreased by 10%</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 stretch-card grid-margin">
                      <div className="card bg-gradient-success card-img-holder text-white">
                        <div className="card-body">
                          <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                          <h4 className="font-weight-normal mb-3">Yearly Income <i className="mdi mdi-diamond mdi-24px float-right" />
                          </h4>
                          <h2 className="mb-5">Rs 9,55,741</h2>
                          <h6 className="card-text">Increased by 5%</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-7 grid-margin stretch-card">
                      <div className="card">
                        <div className="card-body">
                          <div className="clearfix">
                            <h4 className="card-title float-left">Top 3 Team Member Income</h4>
                            <div id="visit-sale-chart-legend" className="rounded-legend legend-horizontal legend-top-right float-right" />
                          </div>
                          <canvas id="visit-sale-chart" className="mt-4" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 grid-margin stretch-card">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title">Your Percentage</h4>
                          <canvas id="traffic-chart" />
                          <div id="traffic-chart-legend" className="rounded-legend legend-vertical legend-bottom-left pt-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 grid-margin">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title">Recent Tickets</h4>
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th> Assignee </th>
                                  <th> Subject </th>
                                  <th> Status </th>
                                  <th> Last Update </th>
                                  <th> Tracking ID </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <img src="assets/images/faces/face1.jpg" className="mr-2" alt="image" /> David Grey
                                  </td>
                                  <td> Fund is not recieved </td>
                                  <td>
                                    <label className="badge badge-gradient-success">DONE</label>
                                  </td>
                                  <td> Dec 5, 2017 </td>
                                  <td> WD-12345 </td>
                                </tr>
                                <tr>
                                  <td>
                                    <img src="assets/images/faces/face2.jpg" className="mr-2" alt="image" /> Stella Johnson
                                  </td>
                                  <td> High loading time </td>
                                  <td>
                                    <label className="badge badge-gradient-warning">PROGRESS</label>
                                  </td>
                                  <td> Dec 12, 2017 </td>
                                  <td> WD-12346 </td>
                                </tr>
                                <tr>
                                  <td>
                                    <img src="assets/images/faces/face3.jpg" className="mr-2" alt="image" /> Marina Michel
                                  </td>
                                  <td> Website down for one week </td>
                                  <td>
                                    <label className="badge badge-gradient-info">ON HOLD</label>
                                  </td>
                                  <td> Dec 16, 2017 </td>
                                  <td> WD-12347 </td>
                                </tr>
                                <tr>
                                  <td>
                                    <img src="assets/images/faces/face4.jpg" className="mr-2" alt="image" /> John Doe
                                  </td>
                                  <td> Loosing control on server </td>
                                  <td>
                                    <label className="badge badge-gradient-danger">REJECTED</label>
                                  </td>
                                  <td> Dec 3, 2017 </td>
                                  <td> WD-12348 </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 grid-margin stretch-card">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title">Recent Updates</h4>
                          <div className="d-flex">
                            <div className="d-flex align-items-center mr-4 text-muted font-weight-light">
                              <i className="mdi mdi-account-outline icon-sm mr-2" />
                              <span>jack Menqu</span>
                            </div>
                            <div className="d-flex align-items-center text-muted font-weight-light">
                              <i className="mdi mdi-clock icon-sm mr-2" />
                              <span>October 3rd, 2018</span>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-6 pr-1">
                              <img src="assets/images/dashboard/img_1.jpg" className="mb-2 mw-100 w-100 rounded" alt="image" />
                              <img src="assets/images/dashboard/img_4.jpg" className="mw-100 w-100 rounded" alt="image" />
                            </div>
                            <div className="col-6 pl-1">
                              <img src="assets/images/dashboard/img_2.jpg" className="mb-2 mw-100 w-100 rounded" alt="image" />
                              <img src="assets/images/dashboard/img_3.jpg" className="mw-100 w-100 rounded" alt="image" />
                            </div>
                          </div>
                          <div className="d-flex mt-5 align-items-top">
                            <img src="assets/images/faces/face3.jpg" className="img-sm rounded-circle mr-3" alt="image" />
                            <div className="mb-0 flex-grow">
                              <h5 className="mr-2 mb-2">School Website - Authentication Module.</h5>
                              <p className="mb-0 font-weight-light">It is a long established fact that a reader will be distracted by the readable content of a page.</p>
                            </div>
                            <div className="ml-auto">
                              <i className="mdi mdi-heart-outline text-muted" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-7 grid-margin stretch-card">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title">Project Status</h4>
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th> # </th>
                                  <th> Name </th>
                                  <th> Due Date </th>
                                  <th> Progress </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td> 1 </td>
                                  <td> Herman Beck </td>
                                  <td> May 15, 2015 </td>
                                  <td>
                                    <div className="progress">
                                      <div className="progress-bar bg-gradient-success" role="progressbar" style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> 2 </td>
                                  <td> Messsy Adam </td>
                                  <td> Jul 01, 2015 </td>
                                  <td>
                                    <div className="progress">
                                      <div className="progress-bar bg-gradient-danger" role="progressbar" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> 3 </td>
                                  <td> John Richards </td>
                                  <td> Apr 12, 2015 </td>
                                  <td>
                                    <div className="progress">
                                      <div className="progress-bar bg-gradient-warning" role="progressbar" style={{ width: '90%' }} aria-valuenow={90} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> 4 </td>
                                  <td> Peter Meggik </td>
                                  <td> May 15, 2015 </td>
                                  <td>
                                    <div className="progress">
                                      <div className="progress-bar bg-gradient-primary" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> 5 </td>
                                  <td> Edward </td>
                                  <td> May 03, 2015 </td>
                                  <td>
                                    <div className="progress">
                                      <div className="progress-bar bg-gradient-danger" role="progressbar" style={{ width: '35%' }} aria-valuenow={35} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> 5 </td>
                                  <td> Ronald </td>
                                  <td> Jun 05, 2015 </td>
                                  <td>
                                    <div className="progress">
                                      <div className="progress-bar bg-gradient-info" role="progressbar" style={{ width: '65%' }} aria-valuenow={65} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 grid-margin stretch-card">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title text-white">Todo</h4>
                          <div className="add-items d-flex">
                            <input type="text" className="form-control todo-list-input" placeholder="What do you need to do today?" />
                            <button className="add btn btn-gradient-primary font-weight-bold todo-list-add-btn" id="add-task">Add</button>
                          </div>
                          <div className="list-wrapper">
                            <ul className="d-flex flex-column-reverse todo-list todo-list-custom">
                              <li>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="checkbox" type="checkbox" /> Meeting with Alisa </label>
                                </div>
                                <i className="remove mdi mdi-close-circle-outline" />
                              </li>
                              <li className="completed">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="checkbox" type="checkbox" defaultChecked /> Call John </label>
                                </div>
                                <i className="remove mdi mdi-close-circle-outline" />
                              </li>
                              <li>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="checkbox" type="checkbox" /> Create invoice </label>
                                </div>
                                <i className="remove mdi mdi-close-circle-outline" />
                              </li>
                              <li>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="checkbox" type="checkbox" /> Print Statements </label>
                                </div>
                                <i className="remove mdi mdi-close-circle-outline" />
                              </li>
                              <li className="completed">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="checkbox" type="checkbox" defaultChecked /> Prepare for presentation </label>
                                </div>
                                <i className="remove mdi mdi-close-circle-outline" />
                              </li>
                              <li>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="checkbox" type="checkbox" /> Pick up kids from school </label>
                                </div>
                                <i className="remove mdi mdi-close-circle-outline" />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={activeTab === 'Spin The wheel' ? 'content-wrapper' : 'content-wrapper d-none'}>
                  <div className="page-header">
                    <h3 className="page-title">
                      <span className="page-title-icon bg-gradient-primary text-white mr-2">
                        <i className="mdi mdi-crosshairs-gps menu-icon" />
                      </span> Lucky Wheel
                    </h3>
                    <nav aria-label="breadcrumb">
                      <ul className="breadcrumb">
                        {/* <li className="breadcrumb-item active" aria-current="page">
                    <span />Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
                  </li> */}
                      </ul>
                    </nav>
                  </div>
                  <div className="row">
                    <div className="col-md-12 stretch-card grid-margin">
                      <PrizeWheel />
                    </div>
                  </div>
                </div>
                <div className={activeTab === 'Profile' ? 'content-wrapper' : 'content-wrapper d-none'} style={{padding:'2.75rem 0.25rem'}} >
                  <div className="row">
                    <div className="col-md-12 stretch-card grid-margin">
                      <Profile />
                    </div>
                  </div>
                </div>
                <div className={activeTab === 'Admin' ? 'content-wrapper' : 'content-wrapper d-none'}>
                  <div className="row">
                    <div className="col-md-12 stretch-card grid-margin">
                      <Admin />
                    </div>
                  </div>
                </div>
                <div className={activeTab === 'Coins' ? 'content-wrapper' : 'content-wrapper d-none'}>
                  <div className="row">
                    <div className="col-md-12 stretch-card grid-margin">
                      <CoinPage userDetail={userDetail} />
                    </div>
                  </div>
                </div>
                <div className={activeTab === 'Wallet' ? 'content-wrapper' : 'content-wrapper d-none'} style={{padding:'2.75rem 0.25rem'}}>
                  <div className="row">
                    <div className="col-md-12 stretch-card grid-margin" style={{padding:'0'}}>
                      <WalletPage networks={networks} userDetail={userDetail} setUserDetail={setUserDetail} />
                    </div>
                    
                  </div>
                </div>
                <footer className="footer">
                  <div className="container-fluid clearfix">
                    <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © Sadik</span>
                  </div>
                </footer>
              </div>
            </div>
          </div></>
        : <></>}

    </div>
  );
}