import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsCurrencyRupee } from "react-icons/bs";
import { BsBagHeart } from "react-icons/bs";
import Empty from "../../Images/wishlist-empty-icon.png";
import "./Wishlist.css";
import axios from "axios";
import Cookies from "js-cookie";
import "../ProductCard/ProductCard.css";
import {RxCross2} from "react-icons/rx";
import Loader from "../Loader/Loader"

const Wishlist = () => {
  const navigate = useNavigate();
  const [userWishlist, setUserWishlist] = useState([]);
  const [userdata, setUserdata] = useState();
  const [isLoading,setIsLoading] = useState(false);
  let url = "http://localhost:8080/";

  useEffect(() => {
    let userdata = JSON.parse(decodeURIComponent(Cookies.get("userdata")));
    setUserdata(userdata);
    getUserWishlist(userdata._id);
    window.scroll(0,0);
  }, []);

  // Get Wishlist Item
  const getUserWishlist = async (userid) => {
    setIsLoading(true);
    let url = "http://localhost:8080/api/wishlist/wishlist_by_id";
    let response = await axios.post(url, { userId: userid });
    try {
      if (response) {
        setUserWishlist(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Re Direction to single product page
  let redirectToProductDiscriptionPage = (name, productId) => {
    navigate(`/product/${name}`, { state: productId });
    //navigate(`/product/${name}`);
  };

const deleteWishlist = async (productId) => {
  let url = "http://localhost:8080/api/wishlist/delete_wishlist_by_id"
  try {
    let response = await axios.delete(url, { data: { _id: productId } } )

    if(response) {
      getUserWishlist(userdata._id)
    }
  } catch (error) {
    console.log(error)
  }
}
  return (
    <section className="wishlist-section">
      {isLoading || (userWishlist && userWishlist.length > 0) ? (
        <section className="product-card-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="common-heading text-center mb-lg-5">
                  Your Wishlist
                </h1>
              </div>
            </div>
            {
              isLoading ?
              <div className="col-12 d-flex justify-content-center"> <Loader/> </div>
              :
              <div className="row">
              { 
              userWishlist.map((item, index) => {
                return (
                  <div className="col-lg-3 col-md-3 col-sm-4 col-6" key={index}>
                    <div className="product-single-card product-single-card-wishlist">
                      <div className="product-pic cursor-btn">
                        <img
                          src={`${url}${item?.productId?.image[0]?.path}`}
                          onClick={() =>
                            redirectToProductDiscriptionPage(
                              item?.productId.slug,
                              item?.productId._id
                            )
                          }
                          className="img-fluid"
                          alt="wishlit-product-image"
                        />
                      </div>
                      <RxCross2 className="crose-icon-delete cursor-btn" onClick={()=> deleteWishlist(item._id)}/>
                      <div
                        className="product-content"
                        onClick={() =>
                          redirectToProductDiscriptionPage(
                            item?.productId.slug,
                            item?.productId._id
                          )
                        }
                      >
                        <div className="product-content-upper">
                          <p className="product-name f1">
                            {item?.productId?.brand.name}
                          </p>
                          <p className="product-desc cursor-btn">{item?.productId?.name}</p>
                        </div>

                        <div className="add-to-cart-box">
                          <div>
                            <p className="product-price f1">
                              <BsCurrencyRupee />
                              {item?.productId?.inrDiscount}
                            </p>
                          </div>
                          <div>
                            <p className="discount-price f1">
                              <BsCurrencyRupee />
                              <del>{item?.productId?.inrMrp}</del>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
            </div>
            }

          </div>
        </section>
      ) : (
        <>
           <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="wishlist-card">
                <p className="wishlist-card-text">
                  <span className="common-heading">YOUR WISHLIST IS EMPTY</span>
                </p>
                <div>
                  <p className="m-0 wishlist-para f1">
                    Add items that you like to your wishlist. Review them
                    anytime and easily move them to the cart.
                  </p>
                </div>
                <div className="wishlist-empty-icon">
                  <img src={Empty} alt="wishlit-product-image" className="img-fluid" />
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
          </div></div>
        </>
      )}
    </section>
  );
};

export default Wishlist;
