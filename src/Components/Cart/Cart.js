import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Empty from "../../Images/wishlist-empty-icon.png";
import "./Cart.css";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import * as ACTIONS from "../Header/Action";
import * as COMMON_ACTIONS from "../../CommonServices/Action"
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";


const Cart = () => {
  const [userCart, setUserCart] = useState([]);
  const [userCartDetail, setUserCartDetail] = useState();
  const [userdata, setUserdata] = useState();
  const [newUserCart, setNewUserCart] = useState();
  const [subTotal, setSubTotal] = useState();
  const [discount, setDiscount] = useState();
  const [payableAmount, setPayableAmount] = useState();
  const [checkoutForm, setCheckoutForm] = useState(false);
  const [isUserData, setIsUserData] = useState();
  const [guestData,setGuestData]=useState()


  const [data, Setdata] = useState({

    order: [],
    userid: "",
    order_no: "",
    mobile: "",
    username: "",
    status: "pending",
    totalamount: "",
    actualamount: "",
    email: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      phonenumber: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",

  });

  let { addToast } = useToasts();

  let userDetails = useSelector(
    (state) =>{ 
      return state?.UserCartReducer?.userDetail}
  );


  useEffect(() => {
    if (userDetails) {
      setIsUserData(userDetails);
    }
  }, [userDetails]);

  useEffect(() => {
    if (isUserData) {
      setUserdata(isUserData);
    }
  }, [isUserData]);


  const handleRegistration = async (data) => {
    console.log(data, "check checkout register page");
  };


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

  useEffect(() => {
    const storedData = localStorage.getItem('guestData');
    if (storedData) {
      setGuestData(storedData);
    }
  },[]);

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

  const updateCart = (cartId, updateOrder) => {
    fetch(`${url}api/cart/update_cart_by_id`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: cartId,
        userid: `${userdata ? userdata._id : guestData}`,
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

  const plusHander = (quantity, maximumOrder, index) => {
    if (quantity && quantity >= 1 && (quantity < maximumOrder) && userCart) {
      let updateOrder = userCart
      updateOrder[index].quantity = quantity + 1;
      updateCart(userCartDetail._id, updateOrder);
    }else{
      addToast("Success!", {
        appearance: "success",
        content: `You have exceed the maximum limit`,
      });
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
    if (!userdata == [] || guestData) {
      await fetch(`${url}api/cart/cart_by_id`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: `${userdata ? userdata._id : guestData}`,
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
    if (!userdata == []) {
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
    }
    else {
      reset();
      setCheckoutForm(true);
    }

  };

  return (
    <>
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
                                    alt="cart-product-image"
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
                                    plusHander(item?.quantity,item?.maximumOrder, index)
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
                    {
                      userdata ?
                        <div className="checkout-button-div pb-2">
                          <button className="checkout-button" onClick={(e) =>
                            handleCheckout(e)}>Checkout</button>
                        </div> :
                        <div className="checkout-button-div pb-2">
                          <button
                            type="button"
                            className="checkout-button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={(e) => {
                              handleCheckout(e);
                            }}
                          >
                            Checkout
                          </button>
                        </div>
                    }

                  </div>
                </div>
              </>
            ) : (
              <div className="col-12 cart-card">
                <p className="cart-card-text">
                  <span className="common-heading">YOUR CART IS EMPTY</span>
                </p>
                <div>
                  <p className="m-0 cart-para">
                    Add items that you like to your cart. Review them anytime
                    and easily move them to the bag.
                  </p>
                </div>
                <div className="cart-empty-icon">
                  <img src={Empty} alt="empty-cart-image" className="img-fluid" />
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
            )}
          </div>
        </div>
      </section>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content checkout-modal-content">
            <div className=" modal-header checkout-modal-header">
              <button type="button" className="btn-close checkout-close-btn" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body checkout-modal-body">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <form
                      className="newsletter-form"
                      onSubmit={handleSubmit(handleRegistration)}
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <h1 className="common-heading checkout-heading" id="exampleModalLabel">Checkout Registration</h1>
                          <div className="form-fields checkout-form-fields">
                            <input
                              type="text"
                              placeholder="Enter your name"
                              className="form-control placeholder-text"
                              {...register("username", {
                                required: true,
                              })}
                              onInput={(event) =>
                                (event.target.value = event.target.value.toLowerCase())
                              }
                            />
                            {errors?.username?.type === "required" && (
                              <p className="text-danger error-text-form">
                                This field is required
                              </p>
                            )}

                          </div>

                          <div className="form-fields checkout-form-fields">
                            <input
                              type="text"
                              className="form-control placeholder-text"
                              autoComplete="off"
                              name="email"
                              placeholder="Enter your email address"
                              // onInput={() => setMessage("")}
                              {...register("email", {
                                required: true,
                                pattern:
                                  /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.com+$/,
                              })}
                            />

                            {errors?.email?.type ===
                              "required" && (
                                <p className="text-danger error-text-form">
                                  This field is required
                                </p>
                              )}

                            {errors?.email?.type ===
                              "pattern" && (
                                <p className="text-danger error-text-form">
                                  Please enter Valid email Address
                                </p>
                              )}
                          </div>

                          <div className="form-fields checkout-form-fields">
                            <input
                              type="number"
                              placeholder="Enter your phone number"
                              className="form-control placeholder-text"
                              {...register("phonenumber", {
                                required: true,
                                minLength: 10,
                              })}
                              onInput={(e) => {
                                if (
                                  e.target.value.length > e.target.maxLength
                                )
                                  e.target.value = e.target.value.slice(
                                    0,
                                    e.target.maxLength
                                  );
                              }}
                              maxlength={10}
                            />
                            {errors?.phonenumber?.type === "required" && (
                              <p className="text-danger error-text-form">
                                This field is required
                              </p>
                            )}
                            {errors?.phonenumber?.type === "minLength" && (
                              <p className="text-danger error-text-form">
                                Please enter a valid phone number.
                              </p>
                            )}
                          </div>

                          <div className="form-fields checkout-form-fields">
                            <input
                              type="password"
                              className="form-control placeholder-text"
                              name="password"
                              autoComplete="off"
                              placeholder="Password"
                              {...register("password", {
                                required: true,
                                pattern:
                                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                              })}
                            />
                            {errors?.password?.type ===
                              "required" && (
                                <p className="text-danger error-text-form">
                                  This field is required
                                </p>
                              )}
                            {errors?.password?.type ===
                              "pattern" && (
                                <p className="text-danger error-text-form password-err">
                                  Must have atleast 8 characters, one
                                  number, upper & lowercase letters &
                                  special character
                                </p>
                              )}
                          </div>

                          <div className="form-fields checkout-form-fields">
                            <input
                              type="password"
                              className="form-control placeholder-text"
                              name="confirmPassword"
                              autoComplete="off"
                              placeholder="Confirm Password"
                              {...register(
                                "confirmPassword",
                                {
                                  required: true,
                                  validate: (val) => {
                                    if (watch("password") !== val) {
                                      return "Your Password Does not Match";
                                    }
                                  },
                                }
                              )}
                            />
                            {errors?.confirmPassword?.type ===
                              "required" && (
                                <p className="text-danger error-text-form">
                                  This field is required
                                </p>
                              )}
                            {errors?.confirmPassword?.type ===
                              "validate" && (
                                <p className="text-danger error-text-form">
                                  Password does not match
                                </p>
                              )}
                          </div>

                          <div className="form-fields checkout-form-fields">
                            <button className="common-btn w-100 login-btn"
                            >
                              SIGNUP
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
