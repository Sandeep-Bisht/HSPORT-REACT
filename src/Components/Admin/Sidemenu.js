import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { RxDashboard } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { GiFactory } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { GiBoxUnpacking } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { BsBox } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { BsCartXFill } from "react-icons/bs";
import { MdRealEstateAgent } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "./Dashboard.css";



const Sidemenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  const logout = () => {
    localStorage.setItem("Userdata", null);
    toast.success("Logout Successfully", {
      position: "bottom-right",
      autoClose: 1000,
    });
    navigate("/");
  };

  return (
    <>
      <div className="nav__list">
        <Link to="/dashboard" className="nav__link active">
          <RxDashboard className="nav__icon" />
          <span className="nav__name">Dashboard</span>
        </Link>
        <div className="accordion" id="accordionExample">
          <div className="nav__link active">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <div className="d-flex align-items-center  div1">
                  <BsCartPlus className="nav__icon" />
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    <span className="pl-3 nav__name">Orders</span>
                  </button>
                </div>
              </h2>
              <div
                id="collapseOne"
                className={`accordion-collapse collapse ${
                  pathName.includes("/dashboard/Order/") && "show"
                }`}
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="dashboard-accordion-body">
                  <ul className="Configration-List">
                    <Link to={"/dashboard/Order/Pending"}>
                      <li>
                        {" "}
                        <FaCartPlus className="configuration-icons-wrap" />
                        New Orders
                      </li>
                    </Link>
                    <Link to={"/dashboard/Order/InProgress"}>
                      <li>
                        {" "}
                        <GrInProgress className="configuration-icons-wrap" />
                        In Progress
                      </li>
                    </Link>
                    <Link to={"/dashboard/Order/Packed"}>
                      <li>
                        {" "}
                        <BsBox className="configuration-icons-wrap" />
                        Packed
                      </li>
                    </Link>
                    <Link to={"/dashboard/Order/Shipped"}>
                      <li>
                        {" "}
                        <FaShippingFast className="configuration-icons-wrap" />
                        Shipped
                      </li>
                    </Link>
                    <Link to={"/dashboard/Order/Delivered"}>
                      <li>
                        {" "}
                        <MdRealEstateAgent className="configuration-icons-wrap" />
                        Delivered
                      </li>
                    </Link>
                    <Link to={"/dashboard/Order/Canceled"}>
                      <li>
                        {" "}
                        <BsCartXFill className="configuration-icons-wrap" />
                        Cancel Order
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="nav__link active">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <div className="d-flex align-items-center div1">
                    <GrConfigure className="nav__icon" />
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <span className="pl-3 nav__name">Configuration</span>
                    </button>
                  </div>
                </h2>
                <div
                  id="collapseTwo"
                  className={`accordion-collapse collapse ${
                    pathName.includes("/dashboard") && "show"
                  }`}
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="dashboard-accordion-body">
                    <ul className="Configration-List">
                      <Link to={"/dashboard/allBrands"}>
                        <li className="nav-name">
                          <GiFactory className="configuration-icons-wrap" />
                          Top Brands
                        </li>
                      </Link>
                      <Link to={"/dashboard/allCategories"}>
                        <li>
                          <BiCategory className="configuration-icons-wrap" />
                          Category
                        </li>
                      </Link>

                      <Link to="/dashboard/allPrdoucts">
                        <li>
                          <GiBoxUnpacking className="configuration-icons-wrap" />
                          Products
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ) */}
        </div>
        <div className="nav__link" onClick={() => logout()}>
          <BiLogOut className="nav__icon" />
          <span className="nav__name" style={{ cursor: "pointer" }}>
            Log Out
          </span>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
export default Sidemenu;
