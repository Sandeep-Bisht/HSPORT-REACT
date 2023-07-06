import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Empty from "../../Images/wishlist-empty-icon.png";
import "./Cart.css"
import logo from "../../Images/slider2.jpg"
import { MdDelete } from 'react-icons/md';
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import * as ACTIONS from "../../CommonServices/Action";

var subTotal=0;
var discount=0
var PayableAmount=0;

const Cart = () => {
  const [cart, setCart] = useState(true);
  const [userCart, setUserCart] = useState([]);
  const [userCartDetail, setUserCartDetail] = useState()
  const [userdata, setUserdata] = useState();
  const [newUserCart,setNewUserCart]=useState();



  const navigate = useNavigate();
  const dispatch=useDispatch();

let cartState = useSelector((state) => state?.UserCartReducer?.userCartDetails);
const subTotalAmount=()=>{
  const subTotalAmount=userCart.reduce((total,item)=>{
    return total+(item.quantity*item.salePrice)
  },0);
  subTotal=subTotalAmount;
}

const DiscountAmount=()=>{
const discountTotalAmount=userCart.reduce((total,item)=>{
 return total+(item.quantity*(item.mrp-item.salePrice))
},0)
discount=discountTotalAmount;
PayableAmount=subTotal-discount;

}

useEffect(()=>{
  if(cartState || newUserCart){
  setUserCart(newUserCart?newUserCart:cartState[0]?.order)
  setUserCartDetail(cartState[0])
  subTotalAmount();
  DiscountAmount();
  }
},[cartState,userCart,newUserCart])

let url = "http://localhost:8080/";

  useEffect(() => {
    let userdata = JSON.parse(decodeURIComponent(Cookies.get("userdata")));
    setUserdata(userdata);
  }, [cartState]);

  const UpdateCart = (cartId,order) => {
    fetch( `${url}api/cart/update_cart_by_id`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: cartId,
        userid: userdata._id,
        order: order ? order : userCart,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setUserCart(res?.data?.order)
      })
      .then((err) => console.log(err, "inside update cart"));
  };

  const minusHander=(quantity,index)=>{
    if (quantity > 1 ) {
      userCart[index].quantity = quantity - 1;
      UpdateCart(userCartDetail._id);
    }
  }

  const plusHander=(quantity,index)=>{
    if (quantity >= 1 ) {
      userCart[index].quantity = quantity + 1;
      UpdateCart(userCartDetail._id);
    }
  }



  const deleteCartHandler = async (productId) => {
    try {
      const response = userCart.filter((item)=>{
        return item.productid!==productId
      })
      setNewUserCart(response);
      UpdateCart(userCartDetail._id,response);

    } catch (error) {
      console.error(error);
    }
  };
  

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
    <div className="col-1"></div>
  </div>

  {userCart && userCart?.length > 0 ? (
  userCart.map((item, index) => {
    return (
      <div className="card card-after-header" key={index}>
        <div className="cart-body card-body-after-header p-2">
          <div className="row">
            <div className="col-2">
              <div className="card-image">
                <img src={`${url}${item?.image}`} style={{ width: "60%" }} alt="" />
              </div>
            </div>
            <div className="col-5">
              <span className="product-name">{item?.name}</span>
              <span className="product-description">{item?.description}</span>
            </div>
            <div className="col-2 amount mt-2 card-image ps-2">
              <div className="input-counter">
                <div className="plus-minus-btn">
                  <span onClick={()=>minusHander(item?.quantity,item?.productid,index)}>-</span>
                </div>
                <span className="m-2 quantity-div">{item?.quantity}</span>
                <div className="plus-minus-btn">
                  <span onClick={()=>plusHander(item?.quantity,item?.productid,index)}>+</span>
                </div>
              </div>
            </div>
            <div className="col-2 every-product-price">
              <span className="product-name">{item?.quantity*item?.salePrice}</span>
            </div>
            <div className="col-1 product-delete">
              <span onClick={()=>deleteCartHandler(item?.productid)}><MdDelete className="delete-icon" /></span>
            </div>
          </div>
        </div>
      </div>
    );
  })
) : (
  <div className="row">
    <div className="col-12 cart-card">
      <p className="cart-card-text">
        <span>YOUR CART IS EMPTY</span>
      </p>
      <div>
        <p className="m-0 cart-para">
          Add items that you like to your cart. Review them anytime and easily move them to the bag.
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
)}

</div>

          <div className="col-4">
            <div className="card">
              <div className="card-body checkout-card">
                <h5>Order Summary</h5>
              </div>
              <div>
                <ul className="product-checkout-price">
                  <li className="list-style">Sub Total
                    <span>{subTotal}</span>
                  </li>
                  <li className="list-style">Discount
                  <span>{discount}</span>
                  </li>
                  <li className="list-style">Payable Amount
                  <span>{PayableAmount}</span>
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
