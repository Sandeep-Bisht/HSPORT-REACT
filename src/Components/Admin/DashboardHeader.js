import React, { useEffect,useState } from "react";
 import UserImg from "../../Images/user3.jpg";
import {Link} from "react-router-dom"
import logo from "../../Images/logo3.png"
import Cookies from "js-cookie";


function DashboardHeaader() {
  const [userData,setUserData] = useState()

  // useEffect(() => {
  //   if (Cookies.get("userdata")) {
  //     let userdata = JSON.parse(decodeURIComponent(Cookies.get("userdata")));
  //     setUserData(userdata);
  //   }
  // }, []);

  console.log(userData,"setUserDatasetUserDatasetUserData")

  return (
    <>
    
        <div className="nav__logo dashboard-header">
        <div className="nav__logo__img">
          <Link to="/" style={{ cursor: "pointer" }}>
            <img
              src={logo}
              className="dashboard-logo"
              alt="image"
            />
          </Link>
        </div>
        <div className="d-flex align-items-center justify-content-end userName-dashboard">
          <img
            src={UserImg}
            alt="user_image"
            className="img-fluid dashboard-user"
          />
          <p className="user-name">User</p>
        </div>
      </div>
    </>
  )
}

export default DashboardHeaader