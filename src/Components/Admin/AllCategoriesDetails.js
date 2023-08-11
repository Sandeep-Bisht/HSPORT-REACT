import React, { useState, useEffect } from "react";
import { Table, Space, Popconfirm, Typography,Button } from "antd";
import axios from "axios";
import { baseUrl } from "../../Utils/Service";
import "./Dashboard.css";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEditNote } from "react-icons/md";
import { MdPlaylistAdd } from "react-icons/md";

export default function AllCategoriesDetails() {
  const [getuser, setGetuser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [filteredData] = useState([]);
  const [categories, setCategories] = useState("");



  const navigate = useNavigate();

  useEffect(() => {
    GetCategory();
  }, []);

  const GetCategory = async () => {
    setLoading(true);
    const response = await axios.get(`${baseUrl}/api/category/all_category`);
    setGetuser(response.data.data);
    setCategories(response.data.data.length);
    setLoading(false);
  };

  const onChangeHandler = (e) => {
    setSearchVal(e.target.value);
    if (e.target.value === "") {
      GetCategory();
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
        `${baseUrl}/api/category/delete_category_by_id`,
        { data: { _id: _id } }
      );
      GetCategory();
    } catch (error) {}
  };

  const categoryEditHander=(categoryItem)=>{
    navigate("/dashboard/configuration/create-category", {state:{...categoryItem}})    
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
      render: (text, record) => <img src={`${baseUrl}/${record.image[0].path}`} style={{width:"100%"}} />,
    },
    {
      title: "Action",
      dataIndex: "Action",
      width: "20%",
      render: (_, record) => {
  
        return getuser.length >= 1 ? (
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
        ) : null;
      },
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
                  All Category <span className="count">{categories}</span>
                </h3>
                <div className="all-category-search-wrap all-products-search-wrap">
                  <div>
                  <Link rel="canonical" to="/dashboard/configuration/create-category" className="add-icon">
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
