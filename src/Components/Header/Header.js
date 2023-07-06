import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import * as ACTIONS from "./Action";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { FiUserCheck } from "react-icons/fi";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { BsBagHeart } from "react-icons/bs";
import "./Header.css";
import "../../Css/Common.css";
import logo from "../../Images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "bootstrap";

const Header = () => {
  let dispatch = useDispatch();
  const [successMsg, setSuccessMsg] = useState();
  const [userdata, setUserdata] = useState();
  const loginModalRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState();
  const [toggle, setToggle] = useState();
  const [categoryList, setCategoryList] = useState();
  const [subCategoryList, setSubCategoryList] = useState();
  let userid = "649e74f60540afa40dc097e0";

  useEffect(() => {
    getUserCart(userid);
    getAllCategory();
    getAllSubCategory();
  }, []);

  const getAllCategory = async () => {
    let url = "http://localhost:8080/api/category/all_category";
    try {
      let response = await axios.get(url);
      if (response) {
        console.log(response.data.data, "inside response of acategory");
        setCategoryList(response.data.data);
        dispatch(ACTIONS.getAllCategoryList(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllSubCategory = async () => {
    let url = "http://localhost:8080/api/subcategory/all_subcategory";
    try {
      let response = await axios.get(url);
      if (response) {
        console.log(response.data.data, "inside response of subCategoryList");
        setSubCategoryList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let userId = "";

  useEffect(() => {
    if(Cookies.get("userdata")){
    userId = JSON.parse(decodeURIComponent(Cookies.get("userdata")));
    getUserCart(userId?._id);
    }
  },[]);


  const getUserCart = async (userid) => {
    try {
      let url = "http://localhost:8080/api/cart/cart_by_id";
      let response = await axios.post(url, { userid: userid });
      if (response) {
        if (response?.data) {
          dispatch(ACTIONS.getCartDetails(response?.data.data));
        } else {
          setErrorMsg(response.data.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [searchResult, setSearchResult] = useState("");

  const navigate = useNavigate();

  // ----Login Form ---------
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetLoginForm,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const handleLogin = async (data) => {
    let url = "http://localhost:8080/api/auth/login";

    let response = await axios.post(url, data);
    try {
      if (response) {
        if (response?.data?.success === 200) {
          resetLoginForm();
          setUserdata(response.data.user);
          Cookies.set("hsports_token", response?.data.token, { expires: 7 }); // 'expires' sets the expiration time in days
          Cookies.set(
            "userdata",
            encodeURIComponent(JSON.stringify(response?.data.user)),
            { expires: 7 }
          );
          dispatch(ACTIONS.getUserDetails(response.data.user));
          loginModalRef.current.click();
        } else {
          setErrorMsg(response.data.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ------Registration Form---------

  const {
    register: registrationRegister,
    handleSubmit: registration,
    formState: { errors: registrationError },
    reset: resetRegistration,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const handleRegistration = async (data) => {
    data["role"] = "user";
    let url = "http://localhost:8080/api/auth/register";

    let response = await axios.post(url, data);
    try {
      if (response) {
        resetRegistration();
        setSuccessMsg(`${response?.data.msg} Please login to enjoy shopping`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchResultHandler = (e) => {
    setSearchResult(e.target.value);
  };

  const searchData = (searchResult) => {
    dispatch(ACTIONS.getSearchValue(searchResult));
    navigate("/SearchResult");
  };

  const logOutUser = () => {
    setUserdata(undefined);
    Cookies.remove("userdata");
    Cookies.remove("hsports_token");
  };

   // Re Direction to all product page
  const redirectToAllProductPage = async (categoryName, categoeyId) => {
    setToggle(false)
    navigate(`/collection/${categoryName}`, { state: categoeyId });
  }



  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="all-sports-toggler" onClick={() => setToggle(true)}>
              <div className="me-2">
                <HiOutlineBars3BottomLeft className="text-white" />
              </div>
              <div>
                <span className="f1 text-uppercase text-white">
                  All
                  <br />
                  Sports
                </span>
              </div>
            </div>
            {toggle && (
              <div className="mega-menu visible">
                <div className="close-box">
                  <span onClick={() => setToggle(false)}>
                    <IoMdClose />
                  </span>
                </div>
                <div className="mega-menu-tab">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <div>
                          <ul
                            className="nav nav-pills mb-3 mega-menu-tab-heading"
                            id="pills-tab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                id="pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-home"
                                type="button"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected="true"
                              >
                                All Sports
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="pills-profile-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-profile"
                                type="button"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected="false"
                              >
                                Profile
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="pills-contact-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-contact"
                                type="button"
                                role="tab"
                                aria-controls="pills-contact"
                                aria-selected="false"
                              >
                                Contact
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="pills-disabled-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-disabled"
                                type="button"
                                role="tab"
                                aria-controls="pills-disabled"
                                aria-selected="false"
                                disabled
                              >
                                Disabled
                              </button>
                            </li>
                          </ul>
                          <div
                            className="tab-content mega-menu-tab-content"
                            id="pills-tabContent"
                          >
                            <div
                              className="tab-pane fade show active"
                              id="pills-home"
                              role="tabpanel"
                              aria-labelledby="pills-home-tab"
                              tabIndex={0}
                            >
                              <div className="row">
                                {categoryList &&
                                  categoryList.length > 0 &&
                                  categoryList.map((item, index) => {
                                    return (
                                      <div className="col-lg-3" key={index}>
                                        <p className="mega-menu-sub-heading">
                                          {item.name}
                                        </p>
                                        {subCategoryList &&
                                          subCategoryList.length > 0 &&
                                          subCategoryList.map(
                                            (element, ind) => {
                                              if (
                                                item._id ===
                                                element.category._id
                                              ) {
                                                return (
                                                  <ul className="mega-menu-sub-heading-list" key={ind}>
                                                    <li onClick={()=>redirectToAllProductPage( item.name , element.category._id)}>
                                                      {" "}
                                                      <Link
                                                        className="mega-menu-list-item"
                                                        to="/allproducts"
                                                      />
                                                      {element.name}
                                                    </li>
                                                  </ul>
                                                );
                                              }
                                            }
                                          )}
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="pills-profile"
                              role="tabpanel"
                              aria-labelledby="pills-profile-tab"
                              tabIndex={0}
                            >
                              ...
                            </div>
                            <div
                              className="tab-pane fade"
                              id="pills-contact"
                              role="tabpanel"
                              aria-labelledby="pills-contact-tab"
                              tabIndex={0}
                            >
                              ...
                            </div>
                            <div
                              className="tab-pane fade"
                              id="pills-disabled"
                              role="tabpanel"
                              aria-labelledby="pills-disabled-tab"
                              tabIndex={0}
                            >
                              ...
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="header-wrapper">
                      <div className="header-left">
                        <Link className="navbar-brand p-0" to="/">
                          <img
                            src={logo}
                            alt=""
                            className="img-fluid main-logo"
                          />
                        </Link>
                      </div>
                      <div className="header-middle">
                        <form
                          className="d-flex header-search-feild"
                          role="search"
                        >
                          <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            value={searchResult}
                            aria-label="Search"
                            onChange={(e) => searchResultHandler(e)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && searchResult.length) {
                                e.preventDefault(); // Prevent form submission
                                searchData(searchResult);
                                // Additional logic or function calls for handling the search
                              }
                            }}
                          />
                          <button className="search-btn" type="submit">
                            <AiOutlineSearch />
                          </button>
                        </form>
                      </div>
                      <div className="header-right">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          <Link
                            className="nav-link header-right-link me-lg-4"
                            to="/cart"
                          >
                            <span>
                              <AiOutlineShoppingCart />
                            </span>
                            Cart
                          </Link>
                          {userdata ? (
                            <Link
                              className="nav-link header-right-link  me-lg-4"
                              to="/wishlist"
                            >
                              <span>
                                <BsBagHeart />
                              </span>
                              Wishlist
                            </Link>
                          ) : (
                            <button
                              className="nav-link header-right-link  me-lg-4 header-right-link nav-link "
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              type="button"
                            >
                              <span>
                                <BsBagHeart />
                              </span>
                              Wishlist
                            </button>
                          )}
                          {userdata ? (
                            <div className="dropdown after-login-dropdown">
                              <a
                                className="header-right-link nav-link  icon m-0 dropdown-toggle"
                                role="button"
                                id="dropdownMenuButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                aria-current="page"
                              >
                                <div className="me-1">
                                  <FiUserCheck className="one" />
                                </div>
                                <div>
                                  <IoIosArrowDown className="mobile-user-view-icon" />
                                </div>
                              </a>

                              <ul
                                className="dropdown-menu br-dr after-login-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <li>
                                  <Link
                                    className="dropdown-item-1"
                                    to="/user/profile"
                                  >
                                    My Profile
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    className="dropdown-item-2"
                                    to="/wishlist"
                                  >
                                    Wishlist
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/"
                                    className="dropdown-item-1"
                                    onClick={() => logOutUser()}
                                  >
                                    Logout
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          ) : (
                            <button
                              className="header-right-link nav-link "
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              type="button"
                            >
                              <span>
                                <AiOutlineUser />
                              </span>
                              Login/Register
                            </button>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content registration-section">
            <div className="modal-header modal-header-top">
              <button
                ref={loginModalRef}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row inside-modal-body">
                <div className="col-md-6 left-login-modal">
                  <div className="m-3">
                    <h3 className="login-left-first">LOGIN</h3>
                    <div className="mt-5">
                      <h3 className="login-left-mid pt-2">Get</h3>
                      <h3 className="login-left-mid pt-2">access to</h3>
                      <h3 className="login-left-second pt-2">personalised</h3>
                      <h3 className="login-left-mid pt-2">
                        shopping experience
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mx-auto mt-3">
                  <div className="row">
                    <ul
                      className="nav nav-pills mb-3 login-section"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-home-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                          onClick={() => setSuccessMsg("")}
                        >
                          LOGIN
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-profile-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-profile"
                          type="button"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected="false"
                          onClick={() => setErrorMsg()}
                        >
                          SIGNUP
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        <div className="col-md-12">
                          <form
                            className="newsletter-form"
                            onSubmit={handleSubmit(handleLogin)}
                          >
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-fields">
                                  <input
                                    type="text"
                                    className="form-control"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Enter your email address"
                                    {...register("email", {
                                      required: true,
                                      pattern:
                                        /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.com+$/,
                                    })}
                                  />

                                  {errors?.email?.type === "required" && (
                                    <p className="text-danger">
                                      This field is required
                                    </p>
                                  )}

                                  {errors?.email?.type === "pattern" && (
                                    <p className="text-danger">
                                      Please enter Valid email Address
                                    </p>
                                  )}
                                </div>

                                <div className="form-fields">
                                  <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    autoComplete="off"
                                    placeholder="Password"
                                    {...register("password", {
                                      required: true,
                                    })}
                                  />

                                  {errors?.password?.type === "required" && (
                                    <p className="text-danger">
                                      This field is required
                                    </p>
                                  )}
                                </div>

                                <div className="form-fields">
                                  <button className="common-btn w-100 login-btn">
                                    LOGIN
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>

                          <div className="text-center">
                            <span>NEW TO HINDUSTAN SPORTS ?</span>
                          </div>
                          <div className="text-center text-danger">
                            <p>{errorMsg}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                      >
                        <div className="col-md-12">
                          <form
                            className="newsletter-form"
                            onSubmit={registration(handleRegistration)}
                          >
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-fields">
                                  <input
                                    type="text"
                                    className="form-control"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Enter your email address"
                                    // onInput={() => setMessage("")}
                                    {...registrationRegister("email", {
                                      required: true,
                                      pattern:
                                        /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.com+$/,
                                    })}
                                  />

                                  {registrationError?.email?.type ===
                                    "required" && (
                                    <p className="text-danger">
                                      This field is required
                                    </p>
                                  )}

                                  {registrationError?.email?.type ===
                                    "pattern" && (
                                    <p className="text-danger">
                                      Please enter Valid email Address
                                    </p>
                                  )}
                                </div>

                                <div className="form-fields">
                                  <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    autoComplete="off"
                                    placeholder="Password"
                                    {...registrationRegister("password", {
                                      required: true,
                                      pattern:
                                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                    })}
                                  />
                                  {registrationError?.password?.type ===
                                    "required" && (
                                    <p className="text-danger">
                                      This field is required
                                    </p>
                                  )}
                                  {registrationError?.password?.type ===
                                    "pattern" && (
                                    <p className="text-danger password-err">
                                      Must have atleast 8 characters, one
                                      number, upper & lowercase letters &
                                      special character
                                    </p>
                                  )}
                                </div>

                                <div className="form-fields">
                                  <input
                                    type="password"
                                    className="form-control"
                                    name="confirmPassword"
                                    autoComplete="off"
                                    placeholder="Confirm Password"
                                    {...registrationRegister(
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
                                  {registrationError?.confirmPassword?.type ===
                                    "required" && (
                                    <p className="text-danger">
                                      This field is required
                                    </p>
                                  )}
                                  {registrationError?.confirmPassword?.type ===
                                    "validate" && (
                                    <p className="text-danger">
                                      Password does not match
                                    </p>
                                  )}
                                </div>

                                <div className="form-fields">
                                  <button className="common-btn w-100 login-btn">
                                    SIGNUP
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>

                          <div className="text-center">
                            <span>ALREADY HAVE AN ACCOUNT LOGIN ?</span>
                          </div>
                          <div className=" text-center text-success ">
                            <p>{successMsg}</p>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Header;
