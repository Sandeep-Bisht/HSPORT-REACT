import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";
import "./UserOrder.css";
import { ImCross } from "react-icons/im";
import { Accordion, AccordionTab } from "primereact/accordion";
import { RiRefund2Fill } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import { baseUrl } from "../../Utils/Service";
import Empty from "../../Images/wishlist-empty-icon.png";
import Cookies from "js-cookie";
import {
  Table,
  Input,
  Space,
  Popconfirm,
  Typography,
  Dropdown,
  Modal,
  Button,
} from "antd";
import { BiSearchAlt } from "react-icons/bi";
import { MdPlaylistAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { render } from "react-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { green } from "@mui/material/colors";
import { AiOutlineCheck } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import Base from "antd/es/typography/Base";
import { FaCheck } from "react-icons/fa";
import { FcProcess } from "react-icons/fc";
import Loader from "../Loader/Loader";

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const [OrderDetails, setOrderDetails] = useState([]);
  const [filteredData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [PendingOrders, setPendingOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [prticularUserOrder, setPrticularUserOrder] = useState([]);
  const [orderstatus, setOrderStatus] = useState();
  const location = useLocation();
  const [userData, setUserData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("userdata")) {
      let userdata = JSON.parse(decodeURIComponent(Cookies.get("userdata")));
      setUserData(userdata);
      window.scrollTo(0, 0);
    }
  }, []);
  useEffect(() => {
    if (userData) {
      GetOrders();
    }
  }, [userData]);

  const GetOrders = async () => {
    await fetch(`${baseUrl}/api/order/all_order`)
      .then((res) => res.json())
      .then(async (data) => {
        let arr = [];
        for (let item of data.data) {
          if (item?.userid === userData?._id) {
            arr.push(item);
          }
        }
        setOrderDetails(arr);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };
  console.log(OrderDetails, "OrderDetailsOrderDetails")
  return (
    <>
      <section className="orders-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {OrderDetails && OrderDetails.length > 0 &&
                <div className="user-order-head">
                  <h1 className="common-heading text-center mb-lg-5">Your Orders</h1>
                </div>}
            </div>
          </div>
          <div className="row">
            {isLoading ?
              <div className="col-12 d-flex justify-content-center mt-3">
                <Loader />
              </div>
              :
              <div className="col-md-12">
                {OrderDetails && OrderDetails.length > 0 ? (
                  OrderDetails.map((el, ind) => {
                    return (
                      <div className="Order-page">
                        <Accordion>
                          <AccordionTab
                            header={
                              <div className="container">
                                <div className="row">
                                  <div className="col-md-9">
                                    <div className="row">
                                      <div className="user-order-tracking-details">
                                        <div className="col-md-12 col-12">
                                          <div class="progress-div">
                                            {el.orderStatus === "Shipped" ||
                                              el.orderStatus === "In-Progress" ||
                                              el.orderStatus === "Packed" ||
                                              el.orderStatus === "Delivered" ? (
                                              <div class="progress-box">
                                                <div class="progress">
                                                  {el.orderStatus ===
                                                    "Shipped" && (
                                                      <div className="progress-color active35"></div>
                                                    )}
                                                  {el.orderStatus ===
                                                    "Delivered" && (
                                                      <div className="progress-color active36"></div>
                                                    )}
                                                  {el.orderStatus ===
                                                    "Packed" && (
                                                      <div className="progress-color active34"></div>
                                                    )}

                                                  {/* Circle */}
                                                  {el.orderStatus ===
                                                    "In-Progress" && (
                                                      <>
                                                        <div className="circle1 activecircles">
                                                          <FaCheck className="Check-icon" />
                                                        </div>
                                                        <div className="circle2"></div>
                                                        <div className="circle3"></div>
                                                        <div className="circle4"></div>
                                                      </>
                                                    )}
                                                  {el.orderStatus ===
                                                    "Packed" && (
                                                      <>
                                                        <div className="circle1 activecircles">
                                                          <FaCheck className="Check-icon" />
                                                        </div>

                                                        <div className="circle2 activecircles">
                                                          <FaCheck className="Check-icon" />
                                                        </div>
                                                        <div className="circle3"></div>
                                                        <div className="circle4"></div>
                                                      </>
                                                    )}
                                                  {el.orderStatus ===
                                                    "Shipped" && (
                                                      <>
                                                        <div className="circle1 activecircles">
                                                          <FaCheck className="Check-icon" />
                                                        </div>
                                                        <div className="circle2 activecircles">
                                                          <FaCheck className="Check-icon" />
                                                        </div>
                                                        <div className="circle3 activecircles">
                                                          <FaCheck className="Check-icon" />
                                                        </div>
                                                        <div className="circle4"></div>
                                                      </>
                                                    )}
                                                  {el.orderStatus ===
                                                    "Delivered" && (
                                                      <>
                                                        <div className="circle1 activecircles">
                                                          <FaCheck className="Check-icon" />
                                                        </div>
                                                        <div className="circle2 activecircles">
                                                          <FaCheck className="Check-icon" />
                                                        </div>
                                                        <div className="circle3 activecircles">
                                                          <FaCheck className="Check-icon" />
                                                        </div>
                                                        <div className="circle4 activecircles">
                                                          <FaCheck className="Check-icon" />
                                                        </div>
                                                      </>
                                                    )}
                                                </div>
                                                {/* circles end */}
                                                {/* progress Text  */}
                                                <div className="progress-text">
                                                  {el.orderStatus ===
                                                    "In-Progress" ? (
                                                    <span className="status-Highligted">
                                                      In Progress
                                                    </span>
                                                  ) : (
                                                    <span>In Progress</span>
                                                  )}
                                                  {el.orderStatus ===
                                                    "Packed" ? (
                                                    <span className="status-Highligted">
                                                      Packed
                                                    </span>
                                                  ) : (
                                                    <span>Packed</span>
                                                  )}
                                                  {el.orderStatus ===
                                                    "Shipped" ? (
                                                    <div className="shipped-status">
                                                      <span className="status-Highligted">
                                                        Shipped Date
                                                      </span>

                                                      <p className="shipped-time status-Highligted">
                                                        {el.shippingDate}
                                                      </p>
                                                    </div>
                                                  ) : (
                                                    <span>Shipped</span>
                                                  )}
                                                  {el.orderStatus ===
                                                    "Delivered" ? (
                                                    <div className="Delivery-status">
                                                      <span className="status-Highligted">
                                                        Delivered
                                                      </span>
                                                      <p className="Delivered-time">
                                                        {el.delivery_time}
                                                      </p>
                                                    </div>
                                                  ) : (
                                                    <span>Delivered</span>
                                                  )}
                                                </div>
                                              </div>
                                            ) : (
                                              <>
                                                {el.orderStatus ===
                                                  "Cancel" && (
                                                    <>
                                                      <div className="circle5">
                                                        <ImCross className="Check-icon" />
                                                      </div>
                                                      <div class="progress-box">
                                                        <div class="progress">
                                                          <div className="progress-color active37"></div>
                                                          <div class="progress-text">
                                                            <span className="text-danger">
                                                              Order Cancelled
                                                            </span>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </>
                                                  )}
                                                {el.orderStatus ===
                                                  "Pending" && (
                                                    <div class="progress-box pending-box">
                                                      <div class="progress">
                                                        <div className="progress-color pending-bar"></div>
                                                        <div class="progress-text">
                                                          <span className="Pending-text">
                                                            <FcProcess className="process-icon" />{" "}
                                                            Order is Being
                                                            Processed
                                                          </span>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )}
                                              </>
                                            )}
                                          </div>
                                          <div className="col-md-12">
                                            <div className="order-column p-2">
                                              <div className="row">
                                                <div className="order-tracking-details">
                                                  <div className="col-md-12">
                                                    <div className="Right-order-content">
                                                      <div className="col-md-3 col-3">
                                                        <div className="orderno-heading">
                                                          <h6 className="order-status-heading">
                                                            Order Number
                                                          </h6>
                                                        </div>
                                                        <p className="para-order-text">
                                                          {el.order_no}
                                                        </p>
                                                      </div>

                                                      <div className="col-md-3 col-3 px-0">
                                                        <div className="orderno-heading">
                                                          <h6 className="order-status-heading">
                                                            Total Amount
                                                          </h6>
                                                        </div>
                                                        <p className="para-order-text">
                                                          ₹{el.totalamount}
                                                        </p>
                                                      </div>

                                                      <div className="col-md-3 col-3 px-0">
                                                        <div className="orderno-heading">
                                                          <h6 className="order-status-heading">
                                                            Order Date
                                                          </h6>
                                                        </div>
                                                        <p className="para-text">
                                                          {el?.createdAt?.slice(
                                                            0,
                                                            10
                                                          )}
                                                        </p>
                                                      </div>
                                                      {el.orderStatus ===
                                                        "Delivered" ? (
                                                        <div className="col-md-3 col-3 px-0">
                                                          <div className="orderno-heading">
                                                            <h6 className="order-status-heading">
                                                              Delivered On
                                                            </h6>
                                                          </div>
                                                          {el.orderStatus ===
                                                            "Delivered" && (
                                                              <p className="para-text">
                                                                {
                                                                  el.delivery_time
                                                                }
                                                              </p>
                                                            )}
                                                        </div>
                                                      ) : (
                                                        " "
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="See-more-details">
                                      <div className="details-button">
                                        <button className="order-detail-button">
                                          See Details
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                          >
                            {el &&
                              el.order[0]?.order.map((item, ind) => {
                                return (
                                  <>
                                    <div className="row" key={ind}>
                                      <div className="see-user-order">
                                        <div className="col-md-12 ">
                                          <div className="row">
                                            <div className="col-md-2 col-sm-3">
                                              <div className="order-details-image">
                                                <img
                                                  src={`${baseUrl}/${item.image}`}
                                                  className="order-main-Image"
                                                ></img>
                                              </div>
                                            </div>
                                            <div className="col-md-3 col-sm-3">
                                              <div className="detail-box-order">
                                                <div>
                                                  <div className="Price-box">
                                                    <h6 className="userorder-product">
                                                      {item.name}
                                                    </h6>
                                                  </div>
                                                  <div className="Price-box">
                                                    <h6 className="userorder-product">
                                                      <sapn className="order-details">
                                                        {item.quantity}
                                                      </sapn>
                                                    </h6>
                                                  </div>
                                                  <div className="Price-box">
                                                    <h6 className="userorder-product">
                                                      <span>Price:</span>
                                                      <sapn className="order-details">
                                                        {item.singleprice}
                                                      </sapn>
                                                    </h6>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-md-5  col-sm-6">
                                              <div className="description-box">
                                                <div>
                                                  <p>{item.description}</p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-md-2 ">
                                              <div className="button-box">
                                                <div>
                                                  <Link
                                                    className="sidebar-nav-link"
                                                    to={
                                                      "/SingleProduct/" +
                                                      item.productid
                                                    }
                                                  >
                                                    <button className="Re-order-button">
                                                      Buy again
                                                    </button>
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {el.orderStatus === "Delivered" ? (
                                            <div className="row">
                                              <div className="col-md-12">
                                                <div className="Buttons-order-page">
                                                  <button>
                                                    <TbTruckReturn className="return-product" />
                                                    Return
                                                  </button>
                                                  <button>
                                                    <RiRefund2Fill className="return-product" />
                                                    Refund
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    <hr />
                                  </>
                                );
                              })}
                          </AccordionTab>
                        </Accordion>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center mt-4 no-order-page">
                    <div className="cart-card container">
                      <p className="order-card-text col-12">
                        <span className="common-heading">YOUR ORDERS IS EMPTY</span>
                      </p>
                      <div className="col-12 ">
                        <p className="m-0 order-para">
                        Step up your sports game with our cutting-edge products.
                         Don't miss out on the action start shopping today and gear up for victory!
                        </p>
                      </div>
                      <div className="order-icon col-12">
                        <div>
                        <img src={Empty} alt="" className="img-fluid" />
                        </div>
                      </div>
                      <div>
                        <button
                          className="continue-shopping-btn w-10 login-btn"
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          Continue Shopping
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default UserOrder;
