import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";
import './Footer.css'
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Footer = () => {
  const [msg, setMsg] = useState();
  const [message, setMessage] = useState();
  const [userData, setUserData] = useState();
  const [isUserData,setIsUserData] = useState();


  let userDetails = useSelector(
    (state) => state?.UserCartReducer?.userDetail
  );
console.log(userDetails,"inside footer for checking user|Details")
  useEffect(() => {
    if (userDetails) {
      setIsUserData(userDetails);
    }
  },[userDetails]);

  useEffect(() => {
    if (isUserData) {
      console.log("inside the useEffect")
      setUserData(isUserData);
    }
  }, [isUserData]);
  console.log(userData,"userdatauserdatauserdata helooooooooo")


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  const Subscribed = async (data) => {
    // try {
    //   const response = await axios.post(
    //     `${baseUrl}/api/subscribed/subscribed`,
    //     {
    //       email: data.email,
    //     }
    //   );
    //   if (response && response.data.success === 200) {
    //     setMessage(response.data.message);
    //     setInterval(function() {
    //       setMessage("");
    //     }, 5000);
    //   } else {
    //     setMsg(response.data.message);
    //     setInterval(function() {
    //       setMsg("");
    //     }, 5000);
    //   }
    // } catch (error) {
    //   setMessage("User already subscribed");
    //   setInterval(function() {
    //     setMessage("");
    //   }, 5000);
    // }
    reset();
  };
  return (
    <>
      <footer className="footer-area">
        <div className="container m-auto">
          <div className="row">
            <div className="col-lg-3 col-sm-6 col-md-6">
              <div className="single-footer-widget">
                <h3 className="footer-heading f1">Reach us</h3>
                <ul className="footer-contact-info px-0">
                  <li>
                    <span className="contact-heading">Phone:</span>{" "}
                    <Link to="tel:+91-7500872014" className="footer-links f2">
                      +91-98975 77558
                    </Link>
                  </li>
                  <li>
                    <span className="contact-heading">Email:</span>{" "}
                    <Link
                      to="mailto:hindustan.com"
                      target="_blank"
                      className="footer-links f2"
                    >
                      hindustan.com
                    </Link>
                  </li>
                  <li>
                    <span className="contact-heading">Address:</span>{" "}
                    <span className="address-footer f2">
                      22 Connaught Place Dehradun, Uttarakhand 248001, India
                    </span>{" "}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-6 col-6">
              <div className="single-footer-widget">
                <h3 className="footer-heading f1">Information</h3>
                <ul className="link-list footer-contact-info px-0">
                  <li>
                    <Link to="/about-us" className="footer-links f2">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact-us" className="footer-links f2">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy&policy" className="footer-links f2">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms&condition" className="footer-links f2">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/shippingPolicy" className="footer-links f2">
                      Shipping Policy
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/return&refund" className="footer-links f2">
                      Return & Refund
                    </Link>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-6 col-6">
              <div className="single-footer-widget single-footer-widget-newslatter">
                <h3 className="footer-heading f1">Customer Care</h3>
                <ul className="link-list footer-contact-info px-0">
                  <li>
                    <Link to="/Faq" className="footer-links f2">
                      FAQs
                    </Link>
                  </li>
                  <div>
                    {
                      userData ?
                        <li>
                          <Link to="/userProfile" className="footer-links f2">
                            My Account
                          </Link>
                        </li> :
                        <button
                          className="footer-links f2 order-history-btn"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          type="button"
                        >
                          My Account
                        </button>
                    }
                  </div>
                  <div>
                    {
                      userData ?
                        <li>
                          <Link to="/UserOrder" className="footer-links f2">
                            Order History
                          </Link>
                        </li> :
                        <button
                          className="footer-links f2 order-history-btn"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          type="button"
                        >
                          Order History
                        </button>
                    }
                  </div>
                  <li>
                    <Link to="/NeedSupport" className="footer-links f2">
                      Need Support?
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-6">
              <div className="single-footer-widget single-footer-widget-newslatter">
                <h3 className="footer-heading f1">Newsletter</h3>
                <p className="Subscribe-para f2">
                  Sign up for our mailing list to get the latest updates &amp;
                  offers.
                </p>
                <form
                  className="newsletter-form mt-3"
                  onSubmit={handleSubmit(Subscribed)}
                >
                  <div>
                    <div className="subscribe-main">
                      <div>
                        <input
                          type="text"
                          className="input-newsletter"
                          placeholder="Enter your email address"
                          onInput={() => setMessage("")}
                          {...register("email", {
                            required: true,
                            pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.com+$/,
                          })}
                        />
                      </div>
                      <div className="align-items-center subs-btn">
                        <button type="submit" className="default-btn">
                          Subscribe
                          <FaTelegramPlane className="subscribe-icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {errors?.email?.type === "pattern" && (
                    <p className="text-danger">
                      Please enter Valid email Address
                    </p>
                  )}
                  <p className="sendSubscribeLink">{message}</p>
                  <p className="sendSubscribeError">{msg}</p>

                  <div id="validator-newsletter" className="form-result"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <section>
        <div className="container-fluid">
          <div className="row footer-end">
            <div className="col-lg-6 col-md-6 col-sm-6 link-footer-first">
              <p className="footer-end-para footer-links f2 mb-0">
                Designed & Developed by <i className="bx bx-copyright"></i>
                2023
                <Link
                  to="https://giksindia.com/"
                  target="_blank"
                  className="giks-link f2"
                >
                  {" "}
                  GIKSINDIA
                </Link>
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 link-footer-second">
              <div className="payment-types">
                <ul className="d-flex align-items-center justify-content-end mb-0 footer-end-text">
                  <li className="footer-end-para footer-links footer-contact-info me-3 f2">
                    We accept payment via:
                  </li>
                  <li className="footer-contact-info">
                    <Link to="#" target="_blank">
                      <img
                        src={require("../../Images/payment-types/visa.png")}
                        alt="image"
                        className="footer-ends-link f2"
                      />
                    </Link>
                  </li>
                  <li className="footer-contact-info">
                    <Link to="#" target="_blank">
                      <img
                        src={require("../../Images/payment-types/mastercard.png")}
                        alt="image"
                        className="footer-ends-link f2"
                      />
                    </Link>
                  </li>
                  <li className="footer-contact-info">
                    <Link to="#" target="_blank">
                      <img
                        src={require("../../Images/payment-types/paypal.png")}
                        alt="image"
                        className="footer-ends-link f2"
                      />
                    </Link>
                  </li>
                  <li className="footer-contact-info">
                    <Link to="#" target="_blank">
                      <img
                        src={require("../../Images/payment-types/descpver.png")}
                        alt="image"
                        className="footer-ends-link f2"
                      />
                    </Link>
                  </li>
                  <li className="footer-contact-info">
                    <Link to="#" target="_blank">
                      <img
                        src={require("../../Images/payment-types/american-express.png")}
                        alt="image"
                        className="footer-ends-link f2"
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
