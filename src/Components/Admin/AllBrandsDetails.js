import React, { useState, useEffect } from "react";
import { Table, Space, Popconfirm, Typography, Button } from "antd";
import "./Dashboard.css";
import axios from "axios";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEditNote } from "react-icons/md";
import { MdPlaylistAdd } from "react-icons/md";
import { baseUrl } from "../../Utils/Service";

export default function AllBrandsDetails() {
  const [getuser, setGetuser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [filteredData] = useState([]);
  const [brands, setBrands] = useState("");


  const navigate = useNavigate();

  useEffect(() => {
    GetBrands();
  }, []);

  const GetBrands = async () => {
    setLoading(true);
    const response = await axios.get(`${baseUrl}/api/brands/all_brands`);
    setGetuser(response.data.data);
    setBrands(response.data.data.length);
    setLoading(false);
  };

  const onChangeHandler = (e) => {
    setSearchVal(e.target.value);
    if (e.target.value === "") {
      GetBrands();
    }
  };

  const searchHandler = () => {
    const filteredData = getuser.filter((value) => {
      return value.name.toLowerCase().includes(searchVal.toLowerCase());
    });
    setGetuser(filteredData);
  };

  const handleDelete = async (_id) => {
    try {
      const DeletedData = await axios.delete(
        `${baseUrl}/api/brands/delete_brands_by_id`,
        { data: { _id: _id } }
      );
      GetBrands();
    } catch (error) {}
  };

  const categoryEditHander=(topBrand)=>{
    navigate("/dashboard/configuration/create-brand", {state:{...topBrand}})    
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      responsive:["md"],
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image[0].path",
      width: 80,
      maxWidth: 90,
      render: (t, r) => <img src={`${baseUrl}/${r.image[0].path}`} style={{width:"100%"}}/>,
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
              <a
                className="delete-icon-wrap"
                title="Delete"
                style={{ color: "blue" }}
              >
                <FaTrashAlt />
              </a>
            </Popconfirm>
            <Typography.Link>
              <Button
                title="Edit"
                className="edit-icon-wrap"
                style={{ color: "blue" }}
                onClick={()=>categoryEditHander(record)}
              >
                <MdOutlineEditNote />
              </Button>
            </Typography.Link>
          </Space>
        ) : null,
    },
  ];

  return (
    <>
      <section id="body-pd" className="allProducts-section">
        <div className="container-fluid">
          <div className="row px-0 dashboard-container">
            <div className="col-12 mt-2">
              <div className="category-details-section all-products-details-section">
                <h3 className="all-products-head">
                  All Brands <span className="count">{brands}</span>
                </h3>
                <div className="all-category-search-wrap all-products-search-wrap">
                  <div>
                  <Link rel="canonical" to="/dashboard/configuration/create-brand" className="add-icon">
                    <MdPlaylistAdd />
                    Add
                  </Link>
                  </div>
                  <div>
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
              </div>

              <Table
                rowKey="name"
                dataSource={
                  filteredData && filteredData.length ? filteredData : getuser
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
}
