import React from 'react'
import { useNavigate } from 'react-router-dom';
import Empty from "../../Images/wishlist-empty-icon.png";
import "./Wishlist.css"

const Wishlist = () => {

    const navigate = useNavigate()
  return (

    
    <section className="wishlist-section">
      
      <div className="row">
        <div className="col-md-12">
          <div className="wishlist-card">
            <p className="wishlist-card-text">
              <span>YOUR WISHLIST IS EMPTY</span>
            </p>
            <div>
              <p className="m-0 wishlist-para">
                Add items that you like to your wishlist. Review them anytime and
                easily move them to the cart.
              </p>
            </div>
            <div className="wishlist-empty-icon">
              <img src={Empty} alt="" className="img-fluid" />
            </div>
            <div>
              <button
                className="wishlist-button"
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
  )
}

export default Wishlist