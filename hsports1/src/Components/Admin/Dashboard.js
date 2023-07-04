import React, {  useState } from "react";
import { Outlet } from "react-router-dom";
import Sidemenu from "./Sidemenu";
import DashboardHeaader from "./DashboardHeader.js";
import "./Dashboard.css"



const Dashboard = () => {

  return (
    <>
      
          <section  className="dashboard-section ">
            <div className="container-fluid">
              <DashboardHeaader />
              <div className="row px-0 dashboard-container">
                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4 sidebar-dashboard">
                  <Sidemenu />
                </div>
                <div className="col-md-10 outlet-wrapper">
            <Outlet />
          </div>
              </div>
            </div>
          </section>
  

    </>
  );
};
export default Dashboard;
