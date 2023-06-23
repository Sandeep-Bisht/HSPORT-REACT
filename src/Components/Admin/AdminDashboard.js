import React, {useState} from "react";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { GiFactory } from "react-icons/gi";
import { FiUserCheck } from "react-icons/fi";
import { GiBoxUnpacking } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { BsListNested } from "react-icons/bs";

const AdminDashboard = () => {

    const [products, Setproducts] = useState("");
  const [categories, setCategories] = useState("");
  const [subCategories, setSubCategories] = useState("");


  return (
    <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8">
      <main className="main graph-main-div">
        <div className="row cardsec-row">
          <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
            <Link to="/dashboard/allPrdoucts">
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

          <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
            <Link to={"/Configuration/" + "AllProductsDetails"}>
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
          <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
            <Link to={"/Configuration/" + "AllCategoriesDetails"}>
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
          <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
            <Link to={"/Configuration/" + "AllSubCategoriesDetails"}>
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
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;