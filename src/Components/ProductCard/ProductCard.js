import React, { useState, useEffect } from "react";
import "./ProductCard.css";
import Cookies from "js-cookie";
import { BsCurrencyRupee } from "react-icons/bs";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BsBagHeart } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import * as ACTIONS from "../../CommonServices/Action";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = (props) => {
  let { addToast } = useToasts();
  let dispatch = useDispatch();
  const [wishlistItem, setWishlistItem] = useState([]);
  const [userdata, setUserdata] = useState();
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);
  const [order, Setorder] = useState([]);

  const { productList } = props;

  let cartState = useSelector((state) => state.UserCartReducer);


  useEffect(() => {
    if (cartState.userCartDetails) {
      if (cartState.userCartDetails) {
        setUserCart(cartState.userCartDetails);
      }
    }
  }, [cartState.userCartDetails]);

  let url = "http://localhost:8080/";
  let navigate = useNavigate();

  useEffect(() => {
    if(Cookies.get("userdata")){
    let userdata = JSON.parse(decodeURIComponent(Cookies.get("userdata")));
    setUserdata(userdata);
    getUserWishlist(userdata._id);
    }
  }, []);

  // Re Direction to single product page
  let redirectToProductDiscriptionPage = (name, productId) => {
    navigate(`/product/${name}`, { state: productId });
    //navigate(`/product/${name}`);
  };

  // Add to wishlist
  const onClickWishListHandler = async (productId) => {
    let data = {};
    const foundNumber = wishlistItem.find(
      (item) => item.productId._id === productId
    );
    if (foundNumber) {
      addToast("Success!", {
        appearance: "success",
        content: `Product is already in wishlist`,
      });
    } else {
      let userId = userdata._id;
      data["productId"] = productId;
      data["userId"] = userId;

      let url = "http://localhost:8080/api/wishlist/add_to_wishlist";
      let response = await axios.post(url, data);
      try {
        if (response) {
          getUserWishlist(userdata._id);
          addToast("Success!", {
            appearance: "success",
            content: `Product added to wishlist`,
          });
        }
      } catch (error) {
        console.log(error);
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
    let response = await axios.post(url, { userId: userid });
    try {
      if (response) {
        setWishlistItem(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //cart finction

  const cartfunction = async (
    productid,
    name,
    quantity,
    mrp,
    salePrice,
    sortDescription,
    category,
    brand,
    subcategory,
    image
  ) => {
    if (quantity > 0) {
      var merged = false;
      var newItemObj = {
        productid: productid,
        name: name,
        image: image,
        quantity: quantity,
        mrp: parseInt(mrp),
        salePrice: parseInt(salePrice),
        sortDescription: sortDescription,
        category: category,
        subcategory: subcategory,
        brand: brand,
        status: "Pending",
        delivery_time: "No Status",
      };
      if (userCart.order == null || userCart.order == []) {
        for (var i = 0; i < order.length; i++) {
          if (order[i].productid == newItemObj.productid) {
            order[i].quantity += newItemObj.quantity;
            merged = true;
            setQuantity(1);
          }
        }
        if (!merged) {
          order.push(newItemObj);
          setQuantity(1);
          AddtoCart();
          
        }
      } else {
        for (var i = 0; i < userCart.order.length; i++) {
          if (userCart.order[i].productid == newItemObj.productid) {
            userCart.order[i].quantity += newItemObj.quantity;
            merged = true;
          }
          setQuantity(1);
        }
        if (!merged) {
          userCart.order.push(newItemObj);
        }
        setQuantity(1);
         UpdateCart();
      }
    }
  };

  // cart by id

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
          dispatch(ACTIONS.getCartItem(cartItems));
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  };

  // Add to cart
  const AddtoCart = async () => {
    if (!userdata == []) {
      await fetch(`${url}api/cart/add_to_cart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: userdata._id,
          order: order,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          // setUserCart(data.data);
          CartById();
          addToast("Success!", {
            appearance: "success",
            content: `Product added to cart`,
          });
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  };

  //update cart

  const UpdateCart = () => {
    fetch( `${url}api/cart/update_cart_by_id`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: userCart._id,
        userid: userdata._id,
        order: userCart.order,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        CartById();
        addToast("Success!", {
          appearance: "success",
          content: `Product added to cart`,
        });
      })
      .then((err) => console.log(err, "inside update cart"));
  };

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
                          src={`${url}${item?.image[0]?.path}`}
                          onClick={() =>
                            redirectToProductDiscriptionPage(
                              item?.slug,
                              item._id
                            )
                          }
                          className="img-fluid"
                          alt="..."
                        />
                        <div className="product-content-lower">
                          <ul>
                            <li
                              onClick={() =>
                                cartfunction(
                                  item._id,
                                  item.name,
                                  quantity,
                                  item.inrMrp,
                                  item.inrDiscount,
                                  item.sortDescription,
                                  item.category.name,
                                  item.brand.name,
                                  item.subcategory.name,
                                  item.image[0].path
                                )
                              }
                            >
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
                          <p className="product-desc">{item?.name}</p>
                        </div>

                        <div className="add-to-cart-box">
                          <div>
                            <p className="product-price f1">
                              <BsCurrencyRupee />
                              {item?.inrDiscount}
                            </p>
                          </div>
                          <div>
                            <p className="discount-price f1">
                              <BsCurrencyRupee />
                              <del>{item?.inrMrp}</del>
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
