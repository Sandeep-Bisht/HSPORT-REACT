import React from 'react'
import './Header.css'
import '../../Css/Common.css'
import logo from '../../Images/logo.png'
import { Link } from "react-router-dom";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2"
const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>


          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='header-wrapper'>
                    <div className='header-left'>
                      <Link className="all-sports-toggler" to="/">
                        <div className='me-2'><HiOutlineBars3BottomLeft className='text-white' /></div>
                        <div><span className='f1 text-uppercase text-white'>
                          All<br />
                          Sports
                        </span></div>
                      </Link>
                      <Link className="navbar-brand p-0" to="/">
                        <img src={logo} alt="" className="img-fluid main-logo" />
                      </Link>
                    </div>
                    <div className='header-middle'>
                      <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                      </form>
                    </div>
                    <div className='header-right'>
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                          </a>
                          <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                          </ul>
                        </li>

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
  )
}

export default Header