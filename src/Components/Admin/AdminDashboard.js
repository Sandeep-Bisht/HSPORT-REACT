import React, {useState} from "react";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { GiFactory } from "react-icons/gi";
import { FiUserCheck } from "react-icons/fi";
import { GiBoxUnpacking } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { BsListNested } from "react-icons/bs";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../Utils/Service.js";
import BarChart from "./BarChart.js/BarChart.js"
import PieChart from "./PieChart/PieChart";
const AdminDashboard = () => {

  const [products, Setproducts] = useState("");
  const [categories, setCategories] = useState("");
  const [subCategories, setSubCategories] = useState("");
  const [topbrands,setTopbrands] = useState("");

  useEffect(()=>{
    GetProducts();
    topBrands();
    GetCategory();
    GetSubCategory();
  },[])

  const GetProducts = async () => {
    const response=await axios.get(`${baseUrl}/api/product/all_product`)
    Setproducts(response.data.data.length);
  };

  const topBrands = async () => {
    const response = await axios.get(`${baseUrl}/api/brands/all_brands`);
    setTopbrands(response.data.data.length);
  };

  const GetCategory = async () => {
    const response = await axios.get(`${baseUrl}/api/category/all_category`);
    setCategories(response.data.data.length);
  };

  const GetSubCategory = async () => {
    const response = await axios.get(`${baseUrl}/api/subcategory/all_subcategory`);
    setSubCategories(response.data.data.length)
  };

  return (
    <div className="">
      <main className="main graph-main-div">
        <div className="row cardsec-row">
          <div className="col-lg-3 col-md-6 col-sm-6 col-6 pt-4">
            <Link rel="canonical" to="/dashboard/configuration/all-prdoucts" className="sidebar-nav-link">
              <div className="card cardsec">
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <GiBoxUnpacking className="cardicon" />
                        <h6 className="cardheads">Products </h6>
                      </div>
                      <div>
                        <span className="count1">{products}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-6 pt-4">
            <Link rel="canonical" to={"/dashboard/configuration/all-brands"} className="sidebar-nav-link">
              <div className="card cardsec">
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <GiBoxUnpacking className="cardicon" />
                        <h6 className="cardheads">Top Brand </h6>
                      </div>
                      <div>
                        <span className="count1">{topbrands}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-6 pt-4">
            <Link rel="canonical" to={"/dashboard/configuration/all-categories"} className="sidebar-nav-link">
              <div className="card cardsec">
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <BiCategory className="cardicon" />
                        <h6 className="cardheads">Category </h6>
                      </div>
                      <div>
                        <span className="count1">{categories}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-6 pt-4">
            <Link rel="canonical" to={"/dashboard/configuration/all-sub-categories"} className="sidebar-nav-link">
              <div className="card cardsec">
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <BsListNested className="cardicon" />
                        <h6 className="cardheads">Sub category</h6>
                      </div>
                      <div>
                        <span className="count1">{subCategories}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>  
          <div className="col-lg-6 col-md-6 col-sm-6 col-6 pt-5">
            <PieChart/>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-6 pt-5">
            <BarChart/>
          </div>    
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
