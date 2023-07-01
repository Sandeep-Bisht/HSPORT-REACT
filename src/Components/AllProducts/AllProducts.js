import React, { useState,useEffect } from 'react'
import { BsBagHeart } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { BsCurrencyRupee } from 'react-icons/bs'
import { Link } from "react-router-dom";
import product1 from '../../Images/product/product1.jpg'
import product2 from '../../Images/product/product2.jpg'
import './AllProducts.css'
import { baseUrl } from '../../Utils/Service';
import axios from 'axios';

function AllProducts() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedAlphabetic, setSelectedAlphabetic] = useState('');
    const [allProduct,setAllProduct]=useState([]);

    const handleCheckboxCategory = (event) => {
        setSelectedCategory(event.target.value);
    };
    const handleCheckboxPrice=(event)=>{
        setSelectedPrice(event.target.value);
    }
    const handleCheckboxAlphabetic=(event)=>{
        setSelectedAlphabetic(event.target.value);
    }

    useEffect(()=>{
        allProducts();
    },[])
    const allProducts=async()=>{
        const response=await axios.get(`${baseUrl}/api/product/all_product`);
        setAllProduct(response.data.data);
        console.log(response,"response");
    }

    return (
        <div className='container-fluid'>
            <div className='row sidebar-filter'>
                <div className='col-2 ps-4'>
                    <div className='sidebar-filter-heading'>
                        <h4>Filters</h4>
                    </div>
                    <div class="accordion" id="accordionExample">
                        <div className='sidebar-category-filter p-1'>
                            <div class="accordion-item accordion-items">
                                <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button accordion-buttons" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <div className='sidebar-category-heading'>
                                            <span className='category-main-div'>Category</span>
                                        </div>
                                    </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div class="accordion-body accordion-bodies">
                                        <div className='filter-category'>
                                            <label htmlFor="outdoorSports" className='filter-category-name pt-1'>Outdoor sports</label>
                                            <input type="checkbox" id="outdoorSports" name="category" value="outdoorSports" className='pt-1' onChange={handleCheckboxCategory} checked={selectedCategory === "outdoorSports"} />
                                            <br />
                                            <label htmlFor="indoorSports" className='filter-category-name pt-1'>Indoor sports</label>
                                            <input type="checkbox" id="indoorSports" name="category" value="indoorSports" className='pt-1' onChange={handleCheckboxCategory} checked={selectedCategory === "indoorSports"} />
                                            <br />
                                            <label htmlFor="waterSports" className='filter-category-name pt-1'>Water sports</label>
                                            <input type="checkbox" id="waterSports" name="category" value="waterSports" className='pt-1' onChange={handleCheckboxCategory} checked={selectedCategory === "waterSports"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='sidebar-category-filter p-1'>
                            <div className='sidebar-category-heading'>
                                <span className='category-main-div'>Price</span>
                            </div>
                            <div className='filter-category'>
                                <label htmlFor='lowToHigh' className='filter-category-name pt-1'>
                                    Low to High
                                </label>
                                <input type='checkbox' id='lowToHigh' name='price' value='lowToHigh' onChange={handleCheckboxPrice} checked={selectedPrice === 'lowToHigh'} />
                                <br />
                                <label htmlFor='highToLow' className='filter-category-name pt-1'>
                                    High to Low
                                </label>
                                <input type='checkbox' id='highToLow' name='price' value='highToLow' onChange={handleCheckboxPrice} checked={selectedPrice === 'highToLow'} />
                            </div>
                        </div>
                        <div className='sidebar-category-filter p-1'>
                            <div className='sidebar-category-heading'>
                                <span className='category-main-div'>Allphabetically sort</span>
                            </div>
                            <div className='filter-category'>
                                <label htmlFor='AtoZ' className='filter-category-name pt-1'>
                                    A to Z
                                </label>
                                <input type='checkbox' id='AtoZ' name='alphabeticSort' value='AtoZ' onChange={handleCheckboxAlphabetic} checked={selectedAlphabetic === 'AtoZ'} />
                                <br />
                                <label htmlFor='ZtoA' className='filter-category-name pt-1'>
                                    Z to A
                                </label>
                                <input type='checkbox' id='ZtoA' name='alphabeticSort' value='ZtoA' onChange={handleCheckboxAlphabetic} checked={selectedAlphabetic === 'ZtoA'} />
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-10'>
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
                                {
                                    allProduct && allProduct.length>0 &&
                                    <div className='col-lg-3'>
                                    <div className='product-single-card'>
                                        <div className='product-pic'>
                                            <img src={product1} className="img-fluid" alt="..." />
                                            <div className='product-content-lower'>
                                                <ul>
                                                    <li>
                                                        <Link className="" to="/">
                                                            <span className='product-card-icon'>
                                                                <AiOutlineShoppingCart />
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link className="" to="/">
                                                            <span className='product-card-icon'>
                                                                <BsBagHeart />
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='product-content'>
                                            <div className='product-content-upper'>
                                                <p className='product-name f1'>Football</p>
                                                <p className='product-desc'>
                                                    Waterproof Mobile Phone
                                                </p>

                                            </div>

                                            <div className='add-to-cart-box'>
                                                <div>
                                                    <p className='product-price f1'><BsCurrencyRupee />600</p>
                                                </div>
                                                <div>
                                                    <p className='discount-price f1'><BsCurrencyRupee /><del>1200</del></p>
                                                </div>


                                            </div>
                                        </div>

                                    </div>
                                </div>
                                }
  
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default AllProducts