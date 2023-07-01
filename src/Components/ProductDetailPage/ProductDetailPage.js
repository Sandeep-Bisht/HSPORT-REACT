import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import product1 from "../../Images/product/product1.jpg";
import "./ProductDetailPage.css";
import { async } from "q";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const [productDetail, setProductDetail] = useState([]);
  let url = "http://localhost:8080/";

  useEffect(() => {
    if (location?.state) {
      getProductDetails(location?.state);
    }
  }, [location.state]);

  const getProductDetails = async (productId) => {
    try {
      let url = "http://localhost:8080/api/product/product_by_id";
      let data = {};
      data["_id"] = productId;
      let response = await axios.post(url, data);
      if (response) {
        console.log(response, "response of produsct get ");
        setProductDetail(response?.data?.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let rediretToSubCategories = (subCategoryId, subCategoriesName) => {
    // var subCategories = subCategoriesName.replace(/\s/g, "");
    // navigate(`/collections/${subCategories}`, { state: subCategoryId });
  };

  console.log("sdasd", productDetail?.image?.[0]?.path);

  return (
    <>
      <div className="prod-wrapper py-lg-4 py-md-3 py-3">
        <div className="container">
          <div className="row">
            
            <div className="col-sm-12 col-md-12 col-lg-12">
              <span>
                <Link to="/" className="bred-crumb-one">
                  Home
                </Link>
              </span>
              <span className="separator">/</span>
              <span
                className="bred-crumb-one"
                onClick={() => rediretToSubCategories()}
              >
                Categories
              </span>
              <span className="separator">/</span>
              <span className="bred-crumb-two">{productDetail?.name}</span>
            </div>
          </div>
        </div>
      </div>
      <section className="product-description ">
        <div className="container">
          <div className="row custom-gutter">
            <div className="col-md-6 desktop-view-image">
              <div
                className="single-image-detail"
                // onClick={() => showImageOnModal(imageUrl)}
              >
                <img
                  src={`${url}${ productDetail?.image?.[0]?.path }`}
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="product-details">
                <h2 className="title-wrap common-heading">
                  {productDetail?.name}
                  <div
                    className="wishlist-div ps-3"
                    // onClick={() =>
                    //   onClickWishListHandler()}
                  >
                    <span className="wishlist-btn" id="wishlisted">
                      <AiFillHeart />
                    </span>
                  </div>
                </h2>
                <div className="product-detail-box-1">
                  <div className="price-wrapper-3 common-para-3">
                    <b>
                      <span className="price-wrap">
                        &#x20b9; {Math.round(productDetail?.inrMrp)}{" "}
                      </span>
                    </b>
                    <p className="para-styling">
                      {/* {converter.convert(productDetails.sortDescription)} */}
                      {productDetail.sortDescription}
                    </p>
                    <div className="specification">
                      <ul className="specification-of-para">
                        <li className="common-para-3 mb-0">
                          Height x Width : {productDetail?.height} x{" "}
                          {productDetail?.width}{" "}
                        </li>

                        <li className="common-para-3 mb-0">
                          Weight : {productDetail?.weight}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="quantity">
                  <div className="row my-4">
                    <div>
                      <div className="col-md-6">
                        <button
                          className="common-btn w-100 login-btn"
                          // onClick={() =>
                          //   addProductToCart()
                          // }
                        >
                          <span className="btn-icon">
                            {/* <AiOutlineShoppingCart /> */}
                          </span>
                          <span className="btn-text ps-2">Add to Cart</span>
                        </button>

                        {/* <button className="disabled-btn w-auto" disabled>
                            <span className="btn-text">Out of Stock</span>
                          </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row custom-gutter">
              <div className="col-md-12">
                <div className="tabs-section">
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="tab-btn-ui"
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        Product Details
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active tab-1 para-styling"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <div className="">
                        {/* {converter.convert(productDetails.description)} */}
                        {productDetail.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailPage;
