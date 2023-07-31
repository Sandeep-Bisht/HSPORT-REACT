import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { RxDashboard } from "react-icons/rx";
import { BsCartPlus,BsListNested } from "react-icons/bs";
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
import * as ACTIONS from "../Header/Action"
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";


const Sidemenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const pathName = location.pathname;


  const logout = () => {
    Cookies.remove("userdata");
    Cookies.remove("hsports_token");
    dispatch(ACTIONS.getCartDetails({}));
    navigate("/");

  };

  return (
    <>
      <div className="nav__list">
        <Link to="/dashboard" className="nav__link active sidebar-nav-link">
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
                    <Link to={"/dashboard/Order/Pending"} className="sidebar-nav-link">
                      <li>
                        {" "}
                        <FaCartPlus className="configuration-icons-wrap" />
                        New Orders
                      </li>
                    </Link>
                    <Link to={"/dashboard/Order/InProgress"} className="sidebar-nav-link">
                      <li>
                        {" "}
                        <GrInProgress className="configuration-icons-wrap" />
                        In Progress
                      </li>
                    </Link>
                    <Link to={"/dashboard/Order/Packed"} className="sidebar-nav-link">
                      <li>
                        {" "}
                        <BsBox className="configuration-icons-wrap" />
                        Packed
                      </li>
                    </Link>
                    <Link to={"/dashboard/Order/Shipped"} className="sidebar-nav-link">
                      <li>
                        {" "}
                        <FaShippingFast className="configuration-icons-wrap" />
                        Shipped
                      </li>
                    </Link>
                    <Link to={"/dashboard/Order/Delivered"} className="sidebar-nav-link">
                      <li>
                        {" "}
                        <MdRealEstateAgent className="configuration-icons-wrap" />
                        Delivered
                      </li>
                    </Link>
                    <Link to={"/dashboard/Order/Canceled"} className="sidebar-nav-link">
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
                    pathName.includes("/dashboard/configuration") && "show"
                  }`}
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="dashboard-accordion-body">
                    <ul className="Configration-List">
                      <Link to={"/dashboard/configuration/allBrands"} className="sidebar-nav-link">
                        <li className="nav-name">
                          <GiFactory className="configuration-icons-wrap" />
                          Top Brands
                        </li>
                      </Link>
                      <Link to={"/dashboard/configuration/allCategories"} className="sidebar-nav-link">
                        <li>
                          <BiCategory className="configuration-icons-wrap" />
                          Category
                        </li>
                      </Link>
                      <Link
                              to={"/dashboard/configuration/AllSubCategories"}
                              className="sidebar-nav-link"
                            >
                              <li>
                                <BsListNested className="configuration-icons-wrap" />
                                SubCategory
                              </li>
                            </Link>
                      <Link to="/dashboard/configuration/allPrdoucts" className="sidebar-nav-link">
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
