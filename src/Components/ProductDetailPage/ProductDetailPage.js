import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import Cookies from "js-cookie";
import { AiFillHeart } from "react-icons/ai";
import "./ProductDetailPage.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import * as ACTIONS from "../../CommonServices/Action";


const ProductDetailPage = () => {

  let { addToast } = useToasts();
  const wishlistRef = useRef();
  let dispatch = useDispatch()
  const navigate = useNavigate();
  let location = useLocation();
  const [productDetail, setProductDetail] = useState([]);
  const [wishlistItem, setWishlistItem] = useState([]);
  const [userdata, setUserdata] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);
  const [order, Setorder] = useState([]);

  let url = "http://localhost:8080/";

  useEffect(() => {
    if(Cookies.get("userdata"))
    {
    let userdata = JSON.parse(decodeURIComponent(Cookies.get("userdata")));
    setUserdata(userdata);
    getUserWishlist(userdata._id);
    }
  },[]);

  useEffect(() => {
    if (location?.state) {
      getProductDetails(location?.state);
    }
  }, [location.state]);

  const getProductDetails = async (productId) => {
    try {
      let url = "http://localhost:8080/api/product/product_by_id";
      let data = {};
      data["_id"] = productId;
      let response = await axios.post(url, data);
      if (response) {
        setProductDetail(response?.data?.data[0]);
       
      }
    } catch (error) {
      console.log(error);
    }
  };


  let rediretToSubCategories = (subCategoryId, subCategoriesName) => {
    // var subCategories = subCategoriesName.replace(/\s/g, "");
    // navigate(`/collections/${subCategories}`, { state: subCategoryId });
  };

  let imageOnClickHandler = (imageUrl) => {
    setImageUrl(imageUrl);
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
    },
  };

   // Get Wishlist Item
   const getUserWishlist = async (userid) => {
    let url = "http://localhost:8080/api/wishlist/wishlist_by_id";
    let response = await axios.post(url, { userId: userid });
    try {
      if (response) {
        setWishlistItem(response.data.data);
        let wishlist = response?.data?.data;
        console.log(wishlist,"wishlist wishlist", location?.state)
        const foundProduct = wishlist?.find((item) => item?.productId._id == location?.state);
        if(foundProduct){
          console.log(foundProduct,"foundProduct foundProduct")
          addColorClass()
        }

      }
    } catch (error) {
      console.log(error);
    }
  };

  const addColorClass = () => {
    wishlistRef.current.classList.add('wishlist-icon');
  };

   // Add to wishlist
   const onClickWishListHandler = async (productId) => {
    addColorClass()
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
      let userId = userdata?._id;
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
          console.log("inside add to  cart", userCart)
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
          console.log("inside update cart", userCart)
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
            console.log(data, "inside cart by iddddd")
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
            console.log(data, "inside adddddddd to cart")
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
      <div className="prod-wrapper py-lg-4 py-md-3 py-3">
        <div className="container">
          <div className="row">
            
            <div className="col-sm-12 col-md-12 col-lg-12">
              <span>
                <Link to="/" className="bred-crumb-one">
                  Home
                </Link>
              </span>
              <span className="separator">/</span>
              <span
                className="bred-crumb-one"
                onClick={() => rediretToSubCategories()}
              >
                Categories
              </span>
              <span className="separator">/</span>
              <span className="bred-crumb-two">{productDetail?.name}</span>
            </div>
          </div>
        </div>
      </div>
      <section className="product-description ">
        <div className="container">
          <div className="row custom-gutter">
            <div className="col-md-6 desktop-view-image">
              <div
                className="single-image-detail"
                // onClick={() => showImageOnModal(imageUrl)}
              >
                {
                  imageUrl ?
                  <img
                  src={imageUrl}
                  className="img-fluid"
                  alt=""
                />
                :
                <img
                src={`${url}${ productDetail?.image?.[0]?.path }`}
                className="img-fluid"
                alt=""
              />
                }

              </div>
              <div className="multiple-images">
              <div className="multiple-image-detail">
                {
                productDetail && productDetail.otherImage &&
                <Carousel
                swipeable={false}
                draggable={false}
                //showDots={true}
                ssr={true}
                infinite={true}
                autoPlay={false}
                responsive={responsive}
              >
                {productDetail.otherImage &&
                  productDetail.otherImage.map((item, index) => {
                    return (
                        <span key={index} className="multiple-image-1">
              <img
                className="img-fluid other-Images-carousl"
                onClick={() => imageOnClickHandler(`${url}${item.path}`)}
                src={`${url}${item.path}`}
                alt="Image"
              />
                        </span>
                    );
                  })}
              </Carousel>
                }
              </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="product-details">
                <h2 className="title-wrap common-heading">
                  {productDetail?.name}
                  <div
                    className="wishlist-div ps-3"
                    onClick={() => onClickWishListHandler(productDetail._id)}
                  >
                    <span className="wishlist-btn" id="wishlisted" ref={wishlistRef}>
                      <AiFillHeart />
                    </span>
                  </div>
                </h2>
                <div className="product-detail-box-1">
                  <div className="price-wrapper-3 common-para-3">
                    <b>
                      <span className="price-wrap">
                        &#x20b9; {Math.round(productDetail?.inrMrp)}{" "}
                      </span>
                    </b>
                    <p className="para-styling">
                      {/* {converter.convert(productDetails.sortDescription)} */}
                      {productDetail?.sortDescription}
                    </p>
                    <div className="specification">
                      <ul className="specification-of-para">
                        <li className="common-para-3 mb-0">
                          Height x Width : {productDetail?.height} x{" "}
                          {productDetail?.width}{" "}
                        </li>

                        <li className="common-para-3 mb-0">
                          Weight : {productDetail?.weight}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="quantity">
                  <div className="row my-4">
                    <div>
                      <div className="col-md-6">
                        <button
                          className="common-btn w-100 login-btn"
                          onClick={() =>
                            cartfunction(
                              productDetail._id,
                              productDetail.name,
                              quantity,
                              productDetail.inrMrp,
                              productDetail.inrDiscount,
                              productDetail.sortDescription,
                              productDetail.category.name,
                              productDetail.brand.name,
                              productDetail.subcategory.name,
                              productDetail.image[0].path
                            )
                          }
                        >
                          <span className="btn-icon">
                             {/* <AiOutlineShoppingCart />  */}
                          </span>
                          <span className="btn-text ps-2">Add to Cart</span>
                        </button>

                        {/* <button className="disabled-btn w-auto" disabled>
                            <span className="btn-text">Out of Stock</span>
                          </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row custom-gutter">
              <div className="col-md-12">
                <div className="tabs-section">
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="tab-btn-ui"
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        Product Details
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active tab-1 para-styling"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <div className="">
                        {/* {converter.convert(productDetails.description)} */}
                        {productDetail?.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailPage;
