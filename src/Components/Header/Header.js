import React from "react";
import "./Header.css";
import "../../Css/Common.css";
import logo from "../../Images/logo.png";
import { Link } from "react-router-dom";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { BsBagHeart } from "react-icons/bs";
const Header = () => {
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

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="header-wrapper">
                      <div className="header-left">
                        <div className="all-sports-toggler">
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
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Header;
