import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Popconfirm, Typography, Space } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom"
import { FaTrashAlt } from 'react-icons/fa';
import { MdOutlineEditNote } from 'react-icons/md';
import { MdPlaylistAdd } from 'react-icons/md';
import "./Dashboard.css"
import { baseUrl } from "../../Utils/Service";
import axios from "axios";


export default function AllProductsDetails() {

  const [getuser, setGetuser] = useState([])
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [filteredData] = useState([]);
  const [products, Setproducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [prticularUserOrder, setPrticularUserOrder] = useState([]);

  const navigate=useNavigate()

useEffect(()=>{
  GetProducts();
},[]);

  const onChangeHandler = (e) => {
    setSearchVal(e.target.value);
    if (e.target.value == "") {
    }
  };

  const searchHandler = () => {
    const filteredData = getuser.filter((value) => {
      return value.name.toLowerCase().includes(searchVal.toLowerCase());
    });
    setGetuser(filteredData);
  };

  const GetProducts = async () => {
    setLoading(true);
    const response=await axios.get(`${baseUrl}/api/product/all_product`)
    setGetuser(response.data.data);
    setLoading(false);
  };

  const showModal = (order) => {
    const orderDetails=[];
    orderDetails.push(order)
    setPrticularUserOrder(orderDetails);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (_id) => {
    try {
      const DeletedData = await axios.delete(
        `${baseUrl}/api/product/delete_product_by_id`,
        { data: { _id: _id } }
      );
      GetProducts();
    } catch (error) {}
  };

  const editFormHandler = (productFormDetails)=>{
    navigate("/dashboard/create-product", {state:{...productFormDetails}})
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "inrMrp",
      key: "inrMrp",
    },
    {
      title: "Discount",
      dataIndex: "inrDiscount",
      key: "inrDiscount",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
    title: "Height",
    dataIndex: "height",
    key: "height",
  },
  {
    title: "Width",
    dataIndex: "width",
    key: "width",
  },
  {
    title: "Weight",
    dataIndex: "weight",
    key: "weight",
  },
    {
      title: "Image",
      dataIndex: "image[0].path",
      width: 80,
      maxWidth: 90,
      render: (t, r) => <img src={`${baseUrl}/${r?.image[0]?.path}`} style={{width:"100%"}}/>,
    },
    {
      title: "Action",
      dataIndex: "Action",
      width: "20%",
      render: (_, record) =>
        getuser.length >= 1 ? (
          <Space size="middle">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record._id)}
            >
              <a className="delete-icon-wrap" title="Delete" style={{ color: "blue" }}><FaTrashAlt /></a>
            </Popconfirm>
            <Typography.Link>
              <Button
                title="Edit"
                className="edit-icon-wrap"
                style={{ color: "blue" }}
                onClick={()=>editFormHandler(record)}
              >
                <MdOutlineEditNote className="edit-icon-button"/>
              </Button>
            </Typography.Link>
          </Space>
        ) : null,
    },
    {
      title: "View Order",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => showModal(record)} className="see-order-button">
          See Order
        </Button>
      ),
    },
  ];

  const imageHandler = (id) => {
    navigate("/SingleProduct/" + id);
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

  const rowClassName = (record) => {
    if (record.quantity < 5) {
      return "red-row";
    }
    return "";
  };
  return (
    <>
      <section id="body-pd" className="allProducts-section">
        <div className="container-fluid">

          <div className="row px-0 dashboard-container">
            
            <div className="col-12 mt-2">
              <div className="all-products-details-section">
                <h3 className="all-products-head">All Products <span className="count">{products}</span></h3>
                <div className="all-products-search-wrap">
                  <div>
                  <Link to="/dashboard/create-product" className="add-icon">
                    <MdPlaylistAdd />Add
                  </Link>
                  </div>
                  <div>
                  <input
                    type='text'
                    onChange={e => onChangeHandler(e)}
                    onKeyUp={searchHandler}
                    placeholder="Search.."
                    enterButton
                    style={{ position: "sticky", top: "0", left: "0" }}
                  />
                  <button type="button" className="dashboard-search-btn"><BiSearchAlt /></button>
                </div>
                </div>
              </div>
              <Table
                
                rowKey="name"
                dataSource={filteredData && filteredData.length ? filteredData : getuser}
                columns={columns}
                loading={loading}
                pagination={false}
                rowClassName={rowClassName}
              />
            </div>
          </div>
          <Modal
          className="product-details New-order-details"
          title="Order Details"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          closeIcon={<CustomCloseIcon />}
        >
        <table className="table order-details ">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Brand</th>
                <th scope="col">Category</th>
                <th scope="col">Subcatrgory</th>
              </tr>
            </thead>
            <tbody>
              {prticularUserOrder &&
                prticularUserOrder.length > 0 &&
                prticularUserOrder.map((item, ind) => {
                  return (
                    <>
                      <tr key={ind}>
                        <td className="width-adjust-of-td">
                          <div className="width-adjust-of-image">
                            <img
                              onClick={() => imageHandler(item.productid)}
                              style={{ cursor: "pointer",width:"40px", height:"40px" }}
                              src={`${baseUrl}/${item.image[0].path}`}
                            ></img>
                          </div>
                        </td>
                        <td className="width-adjust-of-td">{item.name}</td>
                        <td className="width-adjust-of-td">{item.inrDiscount}</td>
                        <td className="width-adjust-of-td">{item.quantity}</td>
                        <td className="width-adjust-of-td">{item.brand.name}</td>
                        <td className="width-adjust-of-td">{item.category.name}</td>
                        <td className="width-adjust-of-td">{item.subcategory.name}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </Modal>
        </div>
      </section>
    </>
  );
}
