import React, { useEffect } from "react";
import "./userprofile.css"
import myProfile from "../../Images/myProfile.png"
import Cookies from "js-cookie";
import { useState } from "react";

const Userprofile= ()=>{
   const [userData,setUserData] = useState();

    useEffect(()=>{
        if (Cookies.get("userdata")) {
            let userdata = JSON.parse(decodeURIComponent(Cookies.get("userdata")));
            setUserData(userdata);
            window.scroll(0,0);
        }
    },[]);
    console.log(userData,"userdata checking for profile");
return(
    <>
<section>
<div className="Myacount-page">
<div className="container">
    <div className="row userProfile-account">
        <div className="col-6 userProfile-image">
            <img src={myProfile} alt=""/>
        </div>
    <div className="col-lg-6 col-md-6 col-sm-6 col-12 acount-page">
    <div class="card">
  <h1 class="title common-heading form-heading f2">My Account</h1>
  <form class="form">
    <div class="group">
    <input placeholder="" type="text" value={userData?.username} required=""></input>
    <label for="name">Name</label>
    </div>
    <div class="group">
    <input placeholder="" type="email" value={userData?.email} name="email" required=""></input>
    <label for="address">Email</label>
    </div>
<div class="group">
    <input placeholder="" type="text" name="address" required=""></input>
    <label for="address">Address</label>
    </div>
<div class="group">
    <input placeholder="" type="number" id="address" value={userData?.phonenumber} name="number" required=""></input>
    <label for="number">Mobile Number</label>
</div>
<div className="account-button">
    <button type="submit">Submit</button>
    </div>
  </form>
</div>
    </div>
    </div>
    </div>
</div>
</section>
    </>
)
}
export default Userprofile;
