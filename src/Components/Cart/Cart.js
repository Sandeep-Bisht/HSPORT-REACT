import React from "react";
import { useNavigate } from "react-router-dom";
import Empty from "../../Images/wishlist-empty-icon.png";
import "./Cart.css"


const Cart = () => {
  const navigate = useNavigate();

  return (
    <section className="cart-section">
      <div className="row">
        <div className="col-md-12">
          <div className="cart-card">
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
      </div>
    </section>
  );
};

export default Cart;
