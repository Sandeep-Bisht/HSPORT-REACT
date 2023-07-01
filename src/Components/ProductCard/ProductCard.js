import React, { useState, useEffect} from "react";
import "./ProductCard.css";
import Cookies from "js-cookie";
import product1 from "../../Images/product/product1.jpg";
import product2 from "../../Images/product/product2.jpg";
import { BsCurrencyRupee } from "react-icons/bs";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BsBagHeart } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

const ProductCard = (props) => {

  let { addToast } = useToasts();
  const [wishlistItem, setWishlistItem] = useState([]);
  const [userdata, setUserdata] = useState();
  const { productList } = props;
  let url = "http://localhost:8080/";
  let navigate = useNavigate();

  console.log(productList, "product list in product car");

  useEffect(() =>{
    let userdata = JSON.parse(decodeURIComponent(Cookies.get("userdata")))
    setUserdata(userdata);
    getUserWishlist(userdata._id)
  },[])

  console.log(wishlistItem, "wishlistItem wishlistItem")

  // Re Direction to single product page
  let redirectToProductDiscriptionPage = (name) => {
    // navigate(`/product/${name}`, { state: productId });
    navigate(`/product/${name}`);
  };

  // Add to wishlist
  const onClickWishListHandler = async (productId) => { 
    let data = {}; 
    const foundNumber = wishlistItem.find((item) => item.productId._id === productId);
    console.log("foundNumber", foundNumber)
      if(foundNumber){

        addToast("Success!", {
          appearance: "success",
          content: `Product is already in wishlist`,
        });
        
      } else{
        let userId = userdata._id;
        data["productId"] =productId;
        data["userId"] = userId;
    
        
        let url = "http://localhost:8080/api/wishlist/add_to_wishlist"
        let response = await axios.post(url, data);
        try {
          if(response){
            getUserWishlist(userdata._id)
            console.log(response)
            addToast("Success!", {
              appearance: "success",
              content: `Product added to wishlist`,
            });
          }
        } catch (error) {
          console.log(error)
          addToast("error!", {
            appearance: "error",
            content: `Something went wrong`,
          });
        }
        
      }
 
  };

  // Get Wishlist Item
  const getUserWishlist = async (userid) => {
    let url = "http://localhost:8080/api/wishlist/wishlist_by_id";
    let response = await axios.post(url, userid);
      try {
        if(response){
           console.log(response,"response of produsct") 
           setWishlistItem(response.data.data) 
         
        }
      } catch (error) {
        console.log(error)
      }
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
                            redirectToProductDiscriptionPage(item.name)
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

                            <li
                              onClick={() => onClickWishListHandler(item._id)}
                            >
                              <span className="product-card-icon">
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
