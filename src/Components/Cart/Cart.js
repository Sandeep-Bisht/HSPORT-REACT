import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Empty from "../../Images/wishlist-empty-icon.png";
import "./Cart.css";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import * as ACTIONS from "../Header/Action";
import * as COMMON_ACTIONS from "../../CommonServices/Action"


const Cart = () => {
  const [userCart, setUserCart] = useState([]);
  const [userCartDetail, setUserCartDetail] = useState();
  const [userdata, setUserdata] = useState();
  const [newUserCart, setNewUserCart] = useState();
  const [subTotal, setSubTotal] = useState();
  const [discount, setDiscount] = useState();
  const [payableAmount, setPayableAmount] = useState();
  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let cartState = useSelector(
    (state) => state?.UserCartReducer?.userCartDetails
  );

  useEffect(() => {
    if (cartState) {
      console.log("inisde use Effect", cartState)
      console.log("after updating",cartState[0]?.order)
      setUserCart(cartState[0]?.order);
      setUserCartDetail(cartState[0]); 
      cartAmount(cartState[0]?.order);
    }
    window.scroll(0,0);
  }, [cartState]);

 console.log(userCart, "usercar")

  const cartAmount = (order) => {

    const subTotalAmount = order?.reduce((total, item) => {
      return total + item?.quantity * item?.salePrice;
    }, 0);
    setSubTotal(subTotalAmount);

    const discountTotalAmount = order?.reduce((total, item) => {
      return total + item.quantity * (item.mrp - item.salePrice);
    }, 0);
    
    setDiscount(discountTotalAmount)
    let discount = discountTotalAmount;
    let discountedPrice = subTotalAmount - discount;
    setPayableAmount(discountedPrice)
  };

  let url = "http://localhost:8080/";

  useEffect(() => {
    if (Cookies.get("userdata")) {
      let userdata = JSON.parse(decodeURIComponent(Cookies.get("userdata")));
      setUserdata(userdata);
    }
  }, []);


  const updateCart = (cartId, updateOrder) => {
    console.log("inisde update cart qty")
    fetch(`${url}api/cart/update_cart_by_id`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: cartId,
        userid: userdata?._id,
        order: updateOrder?.length > 0 ? updateOrder : [],
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("inside response ", res)
        CartById()
          // dispatch(ACTIONS.getCartDetails(updateOrder));
          // console.log("inside response", updateOrder)
          // setUserCart(updateOrder)
          // dispatch(ACTIONS.getCartItem(order?.length))
      })
      .catch((err) => console.log(err, "error"));
  };

  const minusHander = (quantity, index) => {
    if (userCart && quantity > 1) {      
      let updateOrder = userCart
      updateOrder[index].quantity = quantity - 1;
       updateCart(userCartDetail._id, updateOrder);
    }
  };

  const plusHander = (quantity, index) => {
    if (quantity && quantity >= 1 && userCart) {
       let updateOrder = userCart
       updateOrder[index].quantity = quantity + 1;
        updateCart(userCartDetail._id, updateOrder);
    }
  };

  const deleteCartHandler = async ( productId) => {
    try {
      const updatedOrder = userCart.filter((item) => {
        return item.productid !== productId;
      });
      setNewUserCart(updatedOrder);      
      updateCart(userCartDetail?._id, updatedOrder);
    } catch (error) {
      console.error(error);
    }
  };


  const CartById = async () => {
    if (!userdata == []) {
      await fetch(`${url}api/cart/cart_by_id`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: userdata._id,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          setUserCart(data.data[0]);
          let cartItems = data.data[0].order.length;
          console.log(cartItems,"cartItemscartItems")
          dispatch(COMMON_ACTIONS.getCartItem(cartItems));
          dispatch(ACTIONS.getCartDetails(data.data))
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };



  return (
    <section className="cart-section">
      <div className="container">
        <div className="row mt-3 mb-3">
          {userCart && userCart?.length ? (
            <>
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

                {userCart &&
                  userCart?.length > 0 &&
                  userCart.map((item, index) => {
                    return (
                      <div className="card card-after-header" key={index}>
                        <div className="cart-body card-body-after-header p-2">
                          <div className="row">
                            <div className="col-2">
                              <div className="card-image">
                                <img
                                  src={`${url}${item?.image}`}
                                  style={{ width: "60%" }}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="col-5">
                              <span className="product-name">{item?.name}</span>
                              <span className="product-description">
                                {item?.description}
                              </span>
                            </div>
                            <div className="col-2 amount mt-2 card-image ps-2">
                              <div className="input-counter">
                                <div className="plus-minus-btn">
                                  <span
                                    onClick={() =>
                                      minusHander(item?.quantity, index)
                                    }
                                  >
                                    -
                                  </span>
                                </div>
                                <span className="m-2 quantity-div">
                                  {item?.quantity}
                                </span>
                                <div className="plus-minus-btn">
                                  <span
                                    onClick={() =>
                                      plusHander(item?.quantity, index)
                                    }
                                  >
                                    +
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-2 every-product-price">
                              <span className="product-name">
                                {item?.quantity * item?.salePrice}
                              </span>
                            </div>
                            <div className="col-1 product-delete">
                              <span
                                onClick={() =>
                                  deleteCartHandler(item?.productid)
                                }
                              >
                                <MdDelete className="delete-icon" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="col-4">
                <div className="card">
                  <div className="card-body checkout-card">
                    <h5>Order Summary</h5>
                  </div>
                  <div>
                    <ul className="product-checkout-price">
                      <li className="list-style">
                        Sub Total
                        <span>{subTotal}</span>
                      </li>
                      <li className="list-style">
                        Discount
                        <span>{discount}</span>
                      </li>
                      <li className="list-style">
                        Payable Amount
                        <span>{payableAmount}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="checkout-button-div">
                    <button className="checkout-button">Checkout</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="row">
              <div className="col-12 cart-card">
                <p className="cart-card-text">
                  <span>YOUR CART IS EMPTY</span>
                </p>
                <div>
                  <p className="m-0 cart-para">
                    Add items that you like to your cart. Review them anytime
                    and easily move them to the bag.
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
      </div>
    </section>
  );
};

export default Cart;
