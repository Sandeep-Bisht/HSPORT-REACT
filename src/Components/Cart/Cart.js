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

  const [data, Setdata] = useState({
    
    order: [],
    userid: "",
    order_no: "",
    mobile:"",
    username: "",
    status: "pending",
    totalamount: "",
    actualamount: "",
    email: "",
  });
  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let cartState = useSelector(
    (state) => state?.UserCartReducer?.userCartDetails
  );

  useEffect(() => {
    if (cartState) {
      setUserCart(cartState[0]?.order);
      setUserCartDetail(cartState[0]);
      cartAmount(cartState[0]?.order);
      Setdata({ ...data, order: JSON.stringify(cartState[0]?.order) });
          
    }
    window.scroll(0, 0);
  }, [cartState]);


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
        CartById()
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

  const deleteCartHandler = async (productId) => {
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
          dispatch(COMMON_ACTIONS.getCartItem(cartItems));
          dispatch(ACTIONS.getCartDetails(data.data))
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  let redirectToProductDiscriptionPage = (name, productId) => {
    navigate(`/product/${name}`, { state: productId });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    

    // let { order } = data;
    // let neworder = JSON.parse(order);
    // neworder.forEach(function (item) {
    //   delete item.category;
    //   delete item.description;
    //   delete item.delivery_time;
    //   delete item.justification;
    //   delete item.manufacturer;
    //   delete item.mrp;
    // });

    
  


    const formData = new FormData();
     formData.append("order", JSON.stringify(userCart));
     formData.append("userid", userdata._id);
     formData.append("username", userdata.username);
     formData.append("mobile", userdata.phonenumber);
      formData.append("status", data.status);
     formData.append("order_no", Math.floor(Math.random() * 1000000));
      formData.append("totalamount", payableAmount);
      formData.append("actualamount", subTotal);
     formData.append("email", userdata.email);
     console.log("user dtata ", userdata)


    const url = `http://localhost:8080/api/order/create-checkout-session`;
     await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        window.location.href = res.url;
      })
      .catch((err) => console.log(err));
  };



  return (
    <section className="cart-section">
      <div className="container">
        <div className="row mt-3 mb-3">
          {userCart && userCart?.length ? (
            <>
              <div className="col-lg-8 col-md-7 col-sm-7">
                <div className="col-row card-header">
                  <div className="col-2"></div>
                  <div className="col-4">
                    <span className="card-heading">Item Name</span>
                  </div>
                  <div className="col-3">
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
                                  className="cursor-btn"
                                  onClick={() =>
                                    redirectToProductDiscriptionPage(
                                      item?.slug,
                                      item?.productid
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-4 d-flex align-item-center">
                              <span className="product-name">{item?.name}</span>
                              <span className="product-description">
                                {item?.description}
                              </span>
                            </div>
                            <div className="col-3 amount mt-2 card-image ps-2">
                              <div className="input-counter">
                                <div className="plus-minus-btn cursor-btn"
                                  onClick={() =>
                                    minusHander(item?.quantity, index)
                                  }>
                                  <span>
                                    -
                                  </span>
                                </div>
                                <span className="m-2 quantity-div">
                                  {item?.quantity}
                                </span>
                                <div className="plus-minus-btn cursor-btn" onClick={() =>
                                  plusHander(item?.quantity, index)
                                }>
                                  <span>
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
                            <div className="col-1 product-delete cursor-btn">
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

              <div className="col-lg-4 col-md-5 col-sm-5">
                <div className="card">
                  <div className="card-body checkout-card">
                    <h5 className="order-payment-detail">Order Summary</h5>
                  </div>
                  <div>
                    <ul className="product-checkout-price">
                      <li className="list-style">
                        <spam className="product-name">Sub Total</spam>
                        <span>{subTotal}</span>
                      </li>
                      <li className="list-style">
                      <spam className="product-name"> Discount</spam>
                        <span>{discount}</span>
                      </li>
                      <li className="list-style">
                      <spam className="product-name">Payable Amount</spam>
                        <span>{payableAmount}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="checkout-button-div">
                    <button className="checkout-button" onClick={(e)=> handleCheckout(e)}>Checkout</button>
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
