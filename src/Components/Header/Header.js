import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io"
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { BsBagHeart } from "react-icons/bs";
import "./Header.css";
import "../../Css/Common.css";
import logo from "../../Images/logo.png";

const Header = () => {

  const [successMsg, setSuccessMsg] = useState()
  const loginModalRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState()
  const [toggle, setToggle] = useState()

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
    console.log(data, "inside handle login");
    let url = "http://localhost:8080/api/auth/login";

    let response = await axios.post(url, data);
    try {
      if (response) {
        console.log(response, "api tressss")
        if (response?.data?.success === 200) {
          console.log(response.data, "inside login")
          resetLoginForm();
          Cookies.set("hsports_token", response?.data.token, { expires: 7 }); // 'expires' sets the expiration time in days
          loginModalRef.current.click();
        } else {
          setErrorMsg(response.data.error)
        }

      }
    } catch (error) {
      console.log(error)
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
    console.log(data, "inside registration");
    data["role"] = "user";
    console.log(data, "before sending api")
    let url = "http://localhost:8080/api/auth/register";

    let response = await axios.post(url, data);
    try {
      if (response) {
        console.log(response.data, "inside response")
        resetRegistration();
        setSuccessMsg(`${response?.data.msg} Please login to enjoy shopping`)
      }
    } catch (error) {
      console.log(error)
    }
  };

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
                <div className="close-box"><span onClick={() => setToggle(false)}><IoMdClose /></span></div>
                <div className="mega-menu-tab">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <div>
                          <ul className="nav nav-pills mb-3 mega-menu-tab-heading" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">All Sports</button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button className="nav-link" id="pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#pills-disabled" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false" disabled>Disabled</button>
                            </li>
                          </ul>
                          <div className="tab-content mega-menu-tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
                              <div className="row">
                                <div className="col-lg-3">
                                  <p className="mega-menu-sub-heading">
                                  Outdoor Sports
                                  </p>
                                  <ul className="mega-menu-sub-heading-list">
                                     
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Wildlife Watching</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Camping</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Skiing and Snowboarding</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Fishing</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Horse Riding</li>
                                    
                                  </ul>
                                </div>
                                <div className="col-lg-3">
                                  <p className="mega-menu-sub-heading">
                                  Outdoor Sports
                                  </p>
                                  <ul className="mega-menu-sub-heading-list">
                                     
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Wildlife Watching</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Camping</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Skiing and Snowboarding</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Fishing</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Horse Riding</li>
                                    
                                  </ul>
                                </div>
                                <div className="col-lg-3">
                                  <p className="mega-menu-sub-heading">
                                  Outdoor Sports
                                  </p>
                                  <ul className="mega-menu-sub-heading-list">
                                     
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Wildlife Watching</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Camping</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Skiing and Snowboarding</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Fishing</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Horse Riding</li>
                                    
                                  </ul>
                                </div>
                                <div className="col-lg-3">
                                  <p className="mega-menu-sub-heading">
                                  Outdoor Sports
                                  </p>
                                  <ul className="mega-menu-sub-heading-list">
                                     
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Wildlife Watching</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Camping</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Skiing and Snowboarding</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Fishing</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Horse Riding</li>
                                    
                                  </ul>
                                </div>
                                <div className="col-lg-3">
                                  <p className="mega-menu-sub-heading">
                                  Outdoor Sports
                                  </p>
                                  <ul className="mega-menu-sub-heading-list">
                                     
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Wildlife Watching</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Camping</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Skiing and Snowboarding</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Fishing</li>
                                    <li> <Link className="mega-menu-list-item" to="/cart"/>Horse Riding</li>
                                    
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>...</div>
                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>...</div>
                            <div className="tab-pane fade" id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab" tabIndex={0}>...</div>
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
                            aria-label="Search"
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
                          <Link
                            className="nav-link header-right-link  me-lg-4"
                            to="/wishlist"
                          >
                            <span>
                              <BsBagHeart />
                            </span>
                            Wishlist
                          </Link>
                          <button
                            className="header-right-link nav-link btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            type="button"
                          >
                            <span>
                              <AiOutlineUser />
                            </span>
                            Login/Register
                          </button>
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
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content registration-section">
            <div class="modal-header modal-header-top">
              <button
                ref={loginModalRef}
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
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
                      class="nav nav-pills mb-3 login-section"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link active"
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
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
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
                    <div class="tab-content" id="pills-tabContent">
                      <div
                        class="tab-pane fade show active"
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
                            <p>
                              {errorMsg}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
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
                                  <button className="common-btn w-100 login-btn"
                                  >
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
