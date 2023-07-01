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
import ProductCard from '../ProductCard/ProductCard';

function AllProducts() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedAlphabetic, setSelectedAlphabetic] = useState('');
    const [allProducts,setAllProducts]=useState([]);

    const handleCheckboxCategory = (event) => {
        setSelectedCategory(event.target.value);
    };
    const handleCheckboxPrice=(event)=>{
        setSelectedPrice(event.target.value);
    }
    const handleCheckboxAlphabetic=(event)=>{
        setSelectedAlphabetic(event.target.value);
    }

    useEffect(() => {
        getAllProducts()
      }, [])
      
      const getAllProducts = async() => {
        let url = "http://localhost:8080/api/product/all_product";
        let response = await axios.get(url);
          try {
            if(response){
               console.log(response,"response of produsct") 
               setAllProducts(response.data.data) 
             
            }
          } catch (error) {
            console.log(error)
          }
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
                <ProductCard  productList={allProducts}/>
                                </div>
            </div>
        </div>
    )
}

export default AllProducts