import React, { useEffect, useState } from "react";
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Button, Modal } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { baseUrl } from "../../Utils/Service";


var Userdata = "";

const InProgressOrder = () => {
  const [orders, setOrders] = useState([]);
  const [OrderDetails, setOrderDetails] = useState([]);
  const [filteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [prticularUserOrder, setPrticularUserOrder] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [shippedOrder, setShippedOrder] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [shipper, setShipper] = useState("Blue Dart");
  const [endDate, setEndDate] = useState("");
  const [vendor,setVendor]=useState(false);
  const today = new Date().toISOString().substr(0, 10);
  const [userData,setUserdata] = useState();
  const history = useNavigate();

  useEffect(() => {
    if (Cookies.get("userdata")) {
      let userdata = JSON.parse(decodeURIComponent(Cookies.get("userdata")));
      setUserdata(userdata);
      GetOrders();
    }
  },[])
  const GetOrders = async () => {
    setLoading(true);
    await fetch(`${baseUrl}/api/order/all_order`)
      .then((res) => res.json())
      .then(async (data) => {
        if (userData !== undefined || userData !== "") {
          let arr = [];
          for (let item of data.data) {
            if (
              item.orderStatus == "Packed"
            ) {
              arr.push(item);
            }
          }
          setOrderDetails(arr);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };
  const UpdateOrderStatus = async (e, order, orderStatus) => {
    e.preventDefault();
    order.shipperName = shipper;
    order.shippingDate = startDate;
    order.delivery_time = endDate;
    order.orderStatus = orderStatus;
    delete order.createdAt;
    await fetch(`${baseUrl}/api/order/update_order`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then(async (data) => {
        GetOrders();
        // if (order.orderStatus === "Shipped") {
        //   toast.success("Order move to Shipping", {
        //     position: "bottom-right",
        //     autoClose: 1000,
        //   });
        // } else {
        //   toast.success("Order move to Cancel", {
        //     position: "bottom-right",
        //     autoClose: 1000,
        //   });
        // }
        setShowShippingModal(false);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const onChangeHandler = (e) => {
    setSearchVal(e.target.value);
    if (e.target.value === "") {
      GetOrders();
    }
  };
  const searchHandler = () => {
    const filteredData = orders.filter((value) => {
      return value.name.toLowerCase().includes(searchVal.toLowerCase());
    });
    setOrders(filteredData);
  };
  const CustomCloseIcon = () => (
    <svg
      className="custom-close-icon-forget"
      viewBox="0 0 12 12"
      width="12"
      height="12"
    >
      <line x1="1" y1="11" x2="11" y2="1" strokeWidth="2" />
      <line x1="1" y1="1" x2="11" y2="11" strokeWidth="2" />
    </svg>
  );
  const columns = [
    { title: "Order No.", dataIndex: "order_no", key: "order_no" },
    {
      title: "Transaction Id",
      dataIndex: "transaction_id",
      key: "transaction_id",
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    { title: "Paid Amount.", dataIndex: "totalamount", key: "totalamount" },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "payment_status",
    },
    {
      title: "Action",
      key: "orderStatus",
      render: (_, item) => (
        <Button type="primary" onClick={() => moveForShipping(item)}>
          Move for Shipping
        </Button>
      ),
    },

    {
      title: "View Order",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          See Order
        </Button>
      ),
    },
  ];
  const showModal = (order) => {
    if(Userdata!==null || Userdata!=="")
    {
      if(Userdata.role==="Vendor")
      {
        const response=order.order[0].order.filter((item)=>{
        return (Userdata.manufacturer == item.manufacturer)
        })
        setPrticularUserOrder(response);
        setIsModalVisible(true);
      }
      else{
        setPrticularUserOrder(order.order);
        setIsModalVisible(true);
      }   
    }
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Move for shipping modal

  const moveForShipping = (item) => {
    setShippedOrder(item.address);
    setOrderItem(item);
    setShowShippingModal(true);
  };

  const handleShippingModal = () => {
    setShowShippingModal(false);
  };

  const cancelShippingModal = () => {
    setShowShippingModal(false);
  };

  const imageHandler = (id) => {
    history.push("/SingleProduct/" + id);
  };

  return (
    <>
      {/* table modal */}
      <div>
        <Modal
          title="Order Details"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          closeIcon={<CustomCloseIcon />}
          className="New-order-details"
        >
          <table className="table order-details">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
                      {
                      vendor ? (prticularUserOrder &&
                        prticularUserOrder.length > 0 &&
                        prticularUserOrder.map((item,ind) => {
;                          return (
                            <>
                              <tr key={ind}>
                                <td className="width-adjust-of-td">
                                  <div className="width-adjust-of-image">
                                    <img
                                      onClick={() =>
                                        imageHandler(item.productid)
                                      }
                                      style={{ cursor: "pointer",width:"40px",height:"40px" }}
                                      src={`${baseUrl}/${item.image}`}
                                      alt="order-image"
                                    ></img>
                                  </div>
                                </td>
                                <td className="width-adjust-of-td">{item.name}</td>
                                <td className="width-adjust-of-td">{item.singleprice}</td>
                              </tr>
                            </>
                          );
                        })):
                        (prticularUserOrder &&
                          prticularUserOrder.length > 0 &&
                          prticularUserOrder[0].order.length > 0 &&
                          prticularUserOrder[0].order.map((item, ind) => {
                            return (
                              <>
                                <tr key={ind}>
                                  <td className="width-adjust-of-td">
                                    <div className="width-adjust-of-image">
                                       <img
                                        onClick={() => imageHandler(item.productid)}
                                        style={{ cursor: "pointer",width:"40px",height:"40px" }}
                                        src={`${baseUrl}/${item.image}`}
                                        alt="order-image"
                                      ></img> 
                                    </div>
                                  </td>
                                  <td className="width-adjust-of-td">{item.name}</td>
                                  <td className="width-adjust-of-td">{item.singleprice}</td>
                                </tr>
                              </>
                            );
                          }))}
                    </tbody>
          </table>
        </Modal>
      </div>
      <ToastContainer />

      {/* end modal */}

      {/* table modal */}

      <div>
        <Modal
          title="Shipped Details"
          aria-hidden="true"
          visible={showShippingModal}
          onOk={handleShippingModal}
          onCancel={cancelShippingModal}
          closeIcon={<CustomCloseIcon />}
          className="New-order-details"
        >
          <form>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label for="line1" className="form-label">
                  Line 1
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="line1"
                  value={shippedOrder.line1}
                />
              </div>
              {shippedOrder && shippedOrder.line2 && (
                <div className="col-md-4 mb-3">
                  <label for="line2" className="form-label">
                    Line 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="line2"
                    value={shippedOrder.line2}
                  />
                </div>
              )}
              <div className="col-md-4 mb-3">
                <label for="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={shippedOrder.city}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label for="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  value={shippedOrder.state}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={shippedOrder.postal_code}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label for="country" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  value={shippedOrder.country == "IN" && "India"}
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label for="Blue Dart" className="form-label">
                  Choose a Shipper
                </label>
                <select
                  className="m-1 form-control custom-select"
                  onChange={(e) => {
                    setShipper(e.target.value);
                  }}
                >
                  <option value="Blue Dart">Blue Dart</option>
                  <option value="XpressBees">XpressBees</option>
                  <option value="DHL Shipping">DHL Shipping</option>
                  <option value="DTDC Courier">DTDC Courier</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="start-date-input" className="form-labe">
                  Shipping date
                </label>
                <input
                  className="form-control"
                  type="date"
                  id="start-date-input"
                  name="start-date-input"
                  min={today}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="end-date-input" className="form-labe">
                  Delivery date
                </label>
                <input
                  className="form-control"
                  type="date"
                  id="end-date-input"
                  name="end-date-input"
                  min={startDate}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn btn-primary m-2"
              onClick={(e) => UpdateOrderStatus(e, orderItem, "Shipped")}
            >
              Proceed for Shipping
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={(e) => UpdateOrderStatus(e, orderItem, "Cancel")}
            >
              Cancel Order
            </button>
          </form>
        </Modal>
      </div>

      {/* end modal */}

      <section id="body-pd" className="allProducts-section">
        <div className="container-fluid">
          <div className="row px-0 dashboard-container">
            <div className="col-xl-12 mt-2">
              <div className="category-details-section all-order-details-section ">
                <h3 className="all-category-head all-products-head">Orders </h3>
                <div className="all-category-search-wrap all-products-search-wrap input">
                  <input
                    type="text"
                    onChange={(e) => onChangeHandler(e)}
                    onKeyUp={searchHandler}
                    placeholder="Search.."
                    enterButton
                    style={{ position: "sticky", top: "0", left: "0" }}
                  />
                  <button type="button" className="dashboard-search-btn">
                    <BiSearchAlt />
                  </button>
                </div>
              </div>

              <Table
                rowKey="name"
                dataSource={
                  filteredData && filteredData.length
                    ? filteredData
                    : OrderDetails
                }
                columns={columns}
                loading={loading}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InProgressOrder;
