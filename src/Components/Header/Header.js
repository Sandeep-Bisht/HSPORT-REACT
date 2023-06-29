import React from 'react'
import './Header.css'
import '../../Css/Common.css'
import logo from '../../Images/logo.png'
import { Link } from "react-router-dom";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2"
import {AiOutlineSearch,AiOutlineShoppingCart,AiOutlineUser} from "react-icons/ai"
import {BsBagHeart} from "react-icons/bs"
const Header = () => {
  return (
    <>
    <header>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" 
          aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>


          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='header-wrapper'>
                    <div className='header-left'>
                      <Link className="all-sports-toggler" to="/">
                        <div className='me-2'><HiOutlineBars3BottomLeft className='' /></div>
                        <div><span className='f1 text-uppercase '>
                          All<br />
                          Sports
                        </span></div>
                      </Link>
                      <Link className="navbar-brand p-0" to="/">
                        <img src={logo} alt="" className="img-fluid main-logo" />
                      </Link>
                    </div>
                    <div className='header-middle'>
                      <form className="d-flex header-search-feild" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="search-btn" type="submit"><AiOutlineSearch/></button>
                      </form>
                    </div>
                    <div className='header-right'>
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        <Link className="nav-link header-right-link me-lg-4" to="/">
                              <span><AiOutlineShoppingCart/></span>
                              Cart
                        </Link>
                        <Link className="nav-link header-right-link  me-lg-4" to="/">
                              <span><BsBagHeart/></span>
                              Wishlist
                        </Link>
                         <button className='header-right-link nav-link' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                         <span><AiOutlineUser/></span>
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
 
   
    
    
   <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Header