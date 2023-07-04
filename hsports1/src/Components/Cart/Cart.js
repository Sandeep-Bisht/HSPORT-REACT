import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Empty from "../../Images/wishlist-empty-icon.png";
import "./Cart.css"
import logo from "../../Images/slider2.jpg"
import { MdDelete } from 'react-icons/md';


const Cart = () => {
  const [cart, setCart] = useState(true);
  const navigate = useNavigate();

  return (
    <section className="cart-section">
      <div className="container">
        <div className="row mt-3 mb-3">

          <div className="col-8">
          <div className="col-row card-header">
                <div className="col-2"></div>
                <div className="col-5">
                  <span className="card-heading">Item Name</span>
                </div>
                <div className="col-2">
                  <span className="card-heading">Quantity</span>
                </div>
                <div className="col-2">
                  <span className="card-heading">Price</span>
                </div>
                <div className="col-1">
                  
                </div>
              </div>
            {
              cart ?
              <>
                <div className="card card-after-header">
                  <div className="cart-body card-body-after-header p-2">
                    <div className="row">
                      <div className="col-2">
                        <div className="card-image">
                        <img src={logo} style={{ width: "60%" }} alt="" />
                        </div>
                      </div>
                      <div className="col-5">
                        <span className="product-name">Hindustan-sports</span>
                        <span className="product-description">Some quick example text to build on the card title and make up the bulk of the card's content.</span>
                      </div>
                      <div className="col-2 amount mt-2 card-image ps-2">
                                      {" "}
                                      <div className="input-counter">
                                        <div className="plus-minus-btn">
                                        <span>
                                          -
                                        </span>
                                        </div>
                                        <span className="m-2 quantity-div">
                                          12
                                        </span>
                                        <div className="plus-minus-btn">
                                        <span>
                                         +
                                        </span>
                                        </div>
                                      </div>
                                    </div>
                      <div className="col-2 product-price">
                        <span className="product-name">1200</span>
                      </div>
                      <div className="col-1 product-delete">
                        <span><MdDelete className="delete-icon"/></span>
                      </div>
                    </div>
                  </div>
                </div>
                </>
                :
                <div className="row">
                  <div className="col-12 cart-card">
                    <p className="cart-card-text">
                      <span>YOUR CART IS EMPTY</span>
                    </p>
                    <div>
                      <p className="m-0 cart-para">
                        Add items that you like to your cart. Review them anytime and
                        easily move them to the bag.
                      </p>
                    </div>
                    <div className="cart-empty-icon">
                      <img src={Empty} alt="" className="img-fluid" />
                    </div>
                    <div>
                      <button
                        className="cart-button"
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                </div>
            }
          </div>
          <div className="col-4">
            <div className="card">
              <div className="card-body checkout-card">
                <h5>Order Summary</h5>
              </div>
              <div>
                <ul className="product-checkout-price">
                  <li className="list-style">Sub Total
                    <span>2000</span>
                  </li>
                  <li className="list-style">Discount
                  <span>200</span>
                  </li>
                  <li className="list-style">Payable Amount
                  <span>1800</span>
                  </li>
                </ul>
              </div>
              <div className="checkout-button-div">
                <button className="checkout-button">Checkout</button>
              </div>
            </div>
          </div>
          </div>
      </div>
    </section>
  );
};

export default Cart;
