import React from "react";
import "./ProductCard.css";
import Cookies from "js-cookie";
import product1 from "../../Images/product/product1.jpg";
import product2 from "../../Images/product/product2.jpg";
import { BsCurrencyRupee } from "react-icons/bs";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BsBagHeart } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { async } from "q";

const ProductCard = (props) => {
  const { productList } = props;
  let url = "http://localhost:8080/";
  let navigate = useNavigate();


  // Re Direction to single product page  
  let redirectToProductDiscriptionPage = (name, productId) => {
    navigate(`/product/${name}`, { state: productId });
    //navigate(`/product/${name}`);
  };

  // Add to wishlist
  const onClickWishListHandler = async(productId) => {
    const cookieValue = Cookies.get("userdata");
const userdata = JSON.parse(decodeURIComponent(cookieValue));
  }

  return (
    <>
      <section className="product-card-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12 ">
              <h1 className="common-heading text-center mb-lg-5">
                Our Products
              </h1>
            </div>
          </div>
          <div className="row">
            {productList &&
              productList.length > 0 &&
              productList.map((item, index) => {
                return (
                  <div className="col-lg-3" key={index}>
                    <div className="product-single-card">
                      <div className="product-pic">
                        <img
                          src={`${url}${item.image[0].path}`}
                          onClick={() =>
                            redirectToProductDiscriptionPage(item.slug,item._id)
                          }
                          className="img-fluid"
                          alt="..."
                        />
                        <div className="product-content-lower">
                          <ul>
                            <li>
                              
                                <span className="product-card-icon">
                                  <AiOutlineShoppingCart />
                                </span>
                             
                            </li>

                            <li onClick={()=>onClickWishListHandler(item._id)}>
                             
                                <span className="product-card-icon"
                                
                                >
                                  <BsBagHeart />
                                </span>
                              
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className="product-content"
                        onClick={() =>
                          redirectToProductDiscriptionPage(item.name)
                        }
                      >
                        <div className="product-content-upper">
                          <p className="product-name f1">{item?.brand.name}</p>
                          <p className="product-desc">{item.name}</p>
                        </div>

                        <div className="add-to-cart-box">
                          <div>
                            <p className="product-price f1">
                              <BsCurrencyRupee />
                              {item.inrDiscount}
                            </p>
                          </div>
                          <div>
                            <p className="discount-price f1">
                              <BsCurrencyRupee />
                              <del>{item.inrMrp}</del>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCard;
