import React, { useState } from 'react';

function Form() {


    const [userDetail, setUserDetails] = useState();


    const insertValues = (e) => {
        var values = e.target.value;
        var name = e.target.name
        let user = { ...userDetail };
        user[name] = values;
        setUserDetails(user)
    }


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

    const Insertt = () =>{
        console.log(userDetail)
    }


    return (
        <div>
            <style>
                {`
          input[type=text], select {
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
          }

          input[type=submit] {
            width: 100%;
            background-color: #4CAF50;
            color: white;
            padding: 14px 20px;
            margin: 8px 0;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          input[type=submit]:hover {
            background-color: #45a049;
          }

          div {
            border-radius: 5px;
            background-color: #f2f2f2;
            padding: 10px;
          }
        `}
            </style>

            <div>
                <form action="#" style={{ textAlign: 'left' }}>
                    <div className='row'>
                       <div className='col-md-3 col-xl-4 col-lg-6' >
                            <label htmlFor="name">Client Id</label>
                            <input type="text" id="name" name="client_Id" placeholder="" onChange={insertValues} />
                        </div>
                        <div className='col-md-3 col-xl-4 col-lg-6' >
                            <label htmlFor="name">Parent Id</label>
                            <input type="text" id="name" name="parent_client_Id" placeholder="" onChange={insertValues} />
                        </div>
                        <div className='col-md-3 col-xl-4 col-lg-6' >
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="" onChange={insertValues} />
                        </div>
                        <div className='col-md-3 col-xl-4 col-lg-6' >
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" id="firstname" name="firstname" placeholder=""  onChange={insertValues} />
                        </div>
                        <div className='col-md-3 col-xl-4 col-lg-6' >
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" id="lastname" name="lastname" placeholder="" onChange={insertValues} />
                        </div>
                        <div className='col-md-3 col-xl-4 col-lg-6' >
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" placeholder="" onChange={insertValues} />
                        </div>
                        <div className='col-md-3 col-xl-4 col-lg-6' >
                            <label htmlFor="phone">Phone</label>
                            <input type="text" id="phone" name="phone" placeholder="" onChange={insertValues} />
                        </div>
                        <div className='col-md-3 col-xl-4 col-lg-6' >
                            <label htmlFor="dob">DOB</label>
                            <input type="text" id="dob" name="dob" placeholder="" onChange={insertValues} />
                        </div>
                        <div className='col-md-3 col-xl-4 col-lg-6' >
                            <label htmlFor="aadhaar">Aadhaar</label>
                            <input type="text" id="aadhaar" name="aadhaar" placeholder="" onChange={insertValues} />
                        </div>
                        <div className='col-md-3 col-xl-4 col-lg-6' >
                            <label htmlFor="bio">Bio</label>
                            <input type="text" id="bio" name="bio" placeholder="" onChange={insertValues} />
                        </div>

                    </div>

                    <button type="button" onClick={Insertt} class="btn btn-primary">Primary</button>

                </form>
            </div>

        </div>
    );
}

export default Form;
