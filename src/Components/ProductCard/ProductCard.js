import React from 'react'
import './ProductCard.css'
import product1 from '../../Images/product/product1.png'
import product2 from '../../Images/product/product2.png'
import {BsCurrencyRupee} from 'react-icons/bs'
import {AiOutlineSearch,AiOutlineShoppingCart} from "react-icons/ai"
import {BsBagHeart} from "react-icons/bs";
import {BsEye} from "react-icons/bs"
import { Link } from "react-router-dom";


const ProductCard = () => {
  return (
    <>
       <section className='product-card-area'>
           <div className='container'>
               <div className='row'>
                  <div className='col-md-12 '>
                    <h1 className='common-heading text-center mb-lg-5'>
                         Our Products
                    </h1>
                  </div>
               </div>
               <div className='row'>
                   <div className='col-lg-3'>
                       <div className='product-single-card'>
                           <div className='product-pic'>
                               <img src={product1} className="img-fluid" alt="..." />
                           </div>
                            <div className='product-content'>
                                <div className='product-content-upper'>
                                  <p className='product-name f1'>Football</p>
                                  <p className='product-price f1'><BsCurrencyRupee/>600</p>
                                </div>
                                <div className='product-content-lower'>
                                     <ul>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                   <AiOutlineShoppingCart/> 
                                                 </span>
                                            </Link>
                                        </li>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                    <BsEye/>
                                                 </span>
                                            </Link>
                                        </li>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                 <BsBagHeart/>
                                                 </span>
                                            </Link>
                                        </li>
                                     </ul>
                                </div>
                                <div className='add-to-cart-box'>
                            <Link className="add-to-cart" to="/" >
                                 Add to cart
                            </Link>
                            </div>
                            </div>
                           
                       </div>
                   </div>
                   <div className='col-lg-3'>
                       <div className='product-single-card'>
                           <div className='product-pic'>
                               <img src={product2} className="img-fluid" alt="..." />
                           </div>
                            <div className='product-content'>
                                <div className='product-content-upper'>
                                  <p className='product-name f1'>Cricket Bat</p>
                                  <p className='product-price f1'><BsCurrencyRupee/>600</p>
                                </div>
                                <div className='product-content-lower'>
                                     <ul>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                   <AiOutlineShoppingCart/> 
                                                 </span>
                                            </Link>
                                        </li>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                    <BsEye/>
                                                 </span>
                                            </Link>
                                        </li>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                 <BsBagHeart/>
                                                 </span>
                                            </Link>
                                        </li>
                                     </ul>
                                </div>
                                <div className='add-to-cart-box'>
                            <Link className="add-to-cart" to="/" >
                                 Add to cart
                            </Link>
                            </div>
                            </div>
                           
                       </div>
                   </div>
                   <div className='col-lg-3'>
                       <div className='product-single-card'>
                           <div className='product-pic'>
                               <img src={product1} className="img-fluid" alt="..." />
                           </div>
                            <div className='product-content'>
                                <div className='product-content-upper'>
                                  <p className='product-name f1'>Football</p>
                                  <p className='product-price f1'><BsCurrencyRupee/>600</p>
                                </div>
                                <div className='product-content-lower'>
                                     <ul>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                   <AiOutlineShoppingCart/> 
                                                 </span>
                                            </Link>
                                        </li>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                    <BsEye/>
                                                 </span>
                                            </Link>
                                        </li>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                 <BsBagHeart/>
                                                 </span>
                                            </Link>
                                        </li>
                                     </ul>
                                </div>
                                <div className='add-to-cart-box'>
                            <Link className="add-to-cart" to="/" >
                                 Add to cart
                            </Link>
                            </div>
                            </div>
                           
                       </div>
                   </div>
                   <div className='col-lg-3'>
                       <div className='product-single-card'>
                           <div className='product-pic'>
                               <img src={product1} className="img-fluid" alt="..." />
                           </div>
                            <div className='product-content'>
                                <div className='product-content-upper'>
                                  <p className='product-name f1'>Football</p>
                                  <p className='product-price f1'><BsCurrencyRupee/>600</p>
                                </div>
                                <div className='product-content-lower'>
                                     <ul>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                   <AiOutlineShoppingCart/> 
                                                 </span>
                                            </Link>
                                        </li>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                    <BsEye/>
                                                 </span>
                                            </Link>
                                        </li>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                 <BsBagHeart/>
                                                 </span>
                                            </Link>
                                        </li>
                                     </ul>
                                </div>
                                <div className='add-to-cart-box'>
                            <Link className="add-to-cart" to="/" >
                                 Add to cart
                            </Link>
                            </div>
                            </div>
                           
                       </div>
                   </div>
                   <div className='col-lg-3'>
                       <div className='product-single-card'>
                           <div className='product-pic'>
                               <img src={product1} className="img-fluid" alt="..." />
                           </div>
                            <div className='product-content'>
                                <div className='product-content-upper'>
                                  <p className='product-name f1'>Football</p>
                                  <p className='product-price f1'><BsCurrencyRupee/>600</p>
                                </div>
                                <div className='product-content-lower'>
                                     <ul>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                   <AiOutlineShoppingCart/> 
                                                 </span>
                                            </Link>
                                        </li>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                    <BsEye/>
                                                 </span>
                                            </Link>
                                        </li>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                 <BsBagHeart/>
                                                 </span>
                                            </Link>
                                        </li>
                                     </ul>
                                </div>
                                <div className='add-to-cart-box'>
                            <Link className="add-to-cart" to="/" >
                                 Add to cart
                            </Link>
                            </div>
                            </div>
                           
                       </div>
                   </div>
                   <div className='col-lg-3'>
                       <div className='product-single-card'>
                           <div className='product-pic'>
                               <img src={product2} className="img-fluid" alt="..." />
                           </div>
                            <div className='product-content'>
                                <div className='product-content-upper'>
                                  <p className='product-name f1'>Cricket Bat</p>
                                  <p className='product-price f1'><BsCurrencyRupee/>600</p>
                                </div>
                                <div className='product-content-lower'>
                                     <ul>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                   <AiOutlineShoppingCart/> 
                                                 </span>
                                            </Link>
                                        </li>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                    <BsEye/>
                                                 </span>
                                            </Link>
                                        </li>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                 <BsBagHeart/>
                                                 </span>
                                            </Link>
                                        </li>
                                     </ul>
                                </div>
                                <div className='add-to-cart-box'>
                            <Link className="add-to-cart" to="/" >
                                 Add to cart
                            </Link>
                            </div>
                            </div>
                           
                       </div>
                   </div>
                   <div className='col-lg-3'>
                       <div className='product-single-card'>
                           <div className='product-pic'>
                               <img src={product1} className="img-fluid" alt="..." />
                           </div>
                            <div className='product-content'>
                                <div className='product-content-upper'>
                                  <p className='product-name f1'>Football</p>
                                  <p className='product-price f1'><BsCurrencyRupee/>600</p>
                                </div>
                                <div className='product-content-lower'>
                                     <ul>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                   <AiOutlineShoppingCart/> 
                                                 </span>
                                            </Link>
                                        </li>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                    <BsEye/>
                                                 </span>
                                            </Link>
                                        </li>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                 <BsBagHeart/>
                                                 </span>
                                            </Link>
                                        </li>
                                     </ul>
                                </div>
                                <div className='add-to-cart-box'>
                            <Link className="add-to-cart" to="/" >
                                 Add to cart
                            </Link>
                            </div>
                            </div>
                           
                       </div>
                   </div>
                   <div className='col-lg-3'>
                       <div className='product-single-card'>
                           <div className='product-pic'>
                               <img src={product1} className="img-fluid" alt="..." />
                           </div>
                            <div className='product-content'>
                                <div className='product-content-upper'>
                                  <p className='product-name f1'>Football</p>
                                  <p className='product-price f1'><BsCurrencyRupee/>600</p>
                                </div>
                                <div className='product-content-lower'>
                                     <ul>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                   <AiOutlineShoppingCart/> 
                                                 </span>
                                            </Link>
                                        </li>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                    <BsEye/>
                                                 </span>
                                            </Link>
                                        </li>
                                        <li>
                                           <Link className="" to="/">
                                                 <span className='product-card-icon'>
                                                 <BsBagHeart/>
                                                 </span>
                                            </Link>
                                        </li>
                                     </ul>
                                </div>
                                <div className='add-to-cart-box'>
                            <Link className="add-to-cart" to="/" >
                                 Add to cart
                            </Link>
                            </div>
                            </div>
                           
                       </div>
                   </div>
               </div>
           </div>
       </section>

    </>
  )
}

export default ProductCard