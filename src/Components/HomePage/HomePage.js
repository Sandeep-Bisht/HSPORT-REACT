import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import slider1 from "../../Images/banner-1.jpg";
import slider2 from "../../Images/slider2.jpg";
import slider3 from "../../Images/slider3.jpg";
import ProductCard from "../ProductCard/ProductCard";
import CategoryProduct from "../CategoryProduct/CategoryProduct";
import TopBrand from "../TopBrands/TopBrands";
import {Link, useNavigate} from "react-router-dom"
import Loader from "../Loader/Loader";

const HomePage = () => {

  const [allProducts, setAllProducts] = useState([])
  const [allCategories,setAllCategories]=useState([]);
  const [featruedCategories,setFeatruedCategories]=useState([]);
  const [allTopBrands,setAllTopBrands]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  

  let url="http://localhost:8080/"
  let navigate = useNavigate();

useEffect(() => {
  getAllProducts();
  getAllCategories();
  getTopBrands();
  window.scroll(0,0);
}, [])

const getAllProducts = async() => {
  setIsLoading(true);
  let url = "http://localhost:8080/api/product/all_product";
  let response = await axios.get(url);
    try {
      if(response){
         setAllProducts(response.data.data) ;
         let featuredBrand = response.data.data.filter((item)=>{
          return item.brand.featuredBrands=="Featured Categories"
         })
         setFeatruedCategories(featuredBrand);
         setIsLoading(false);
      }
    } catch (error) {
      console.log(error)
    }
}

const getAllCategories=async()=>{
  setIsLoading(true);
  let url = "http://localhost:8080/api/category/all_category";
  let response = await axios.get(url);
    try {
      if(response){
         setAllCategories(response.data.data) 
         setIsLoading(false);
      }
    } catch (error) {
      console.log(error)
    }
}

const getTopBrands=async()=>{
  setIsLoading(true);
  let url = "http://localhost:8080/api/brands/all_brands";
  const topBrands=await axios.get(url)
  {
    try{
      if(topBrands)
      {
        setAllTopBrands(topBrands.data.data);
        setIsLoading(false);
      }
    }catch(error)
    {
      console.log(error);
    }
  }
}

const bannerShopNowClickHandler = (categoryId,slugName)=>{
 navigate(`/allproducts/${slugName}`, {state:{categoryId:categoryId,slugName:slugName}})
}

  return (
    <>
      <div className="home-slider">
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={0}
              className
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={1}
              aria-label="Slide 2"
              className="active"
              aria-current="true"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={2}
              aria-label="Slide 3"
              className
            />
              <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={3}
              aria-label="Slide 4"
              className
            />
          </div>
          <div className="carousel-inner">
            {
              allCategories && allCategories.length>0 ?
              allCategories.map((item,index)=>{
                return (
                  <>
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={`duplicate-${index}`}>
              <img src={`${url}${item?.image[0].path}`} alt="home-page-image" className="d-block w-100" alt="..." />

              <div className="carousel-caption d-md-block">
                <p className="slider-title">
                  Amazing Shopping
                  <br />
                  Experience{" "}
                </p>
               
                <button className="common-btn" onClick={()=>bannerShopNowClickHandler(item?._id,item.slug)}>
                  <span>Shop Now</span>
                </button>
              </div>
            </div>
                  </>
                )
              })
              :
              <>
              <div className="carousel-item">
              <img src={slider1} className="d-block w-100" alt="home-page-image" />

              <div className="carousel-caption d-md-block">
                <p className="slider-title">
                  Amazing Shopping
                  <br />
                  Experience{" "}
                </p>
               
                <Link rel="canonical" to="/allproducts" className="common-btn">
                  <span>Shop Now</span>
                </Link>
              </div>
            </div>
              <div className="carousel-item active">
              <img src={slider2} className="d-block w-100" alt="home-page-image" />
              <div className="carousel-caption  d-md-block">
                <p className="slider-title">
                  Amazing Sports
                  <br />
                  Products{" "}
                </p>
                
                <Link rel="canonical" to="/allproducts" className="common-btn">
                  <span>Shop Now</span>
                </Link>
              </div>
            </div>
            <div className="carousel-item">
              <img src={slider3} className="d-block w-100" alt="home-page-image" />
              <div className="carousel-caption  d-md-block">
                <p className="slider-title">
                  Amazing Sports
                  <br />
                  Experience{" "}
                </p>               
                <Link rel="canonical" to="/allproducts" className="common-btn banner-shopnow-btn">
                  <span>Shop Now</span>
                </Link>
              </div>
            </div>
            </>
            }


          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true">
              <svg
                className="svg-inline--fa fa-angle-left fa-w-6"
                aria-hidden="true"
                focusable="false"
                data-prefix="fal"
                data-icon="angle-left"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192 512"
                data-fa-i2svg
              >
                <path
                  fill="currentColor"
                  d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"
                />
              </svg>
              <i className="fal fa-angle-left" />
            </span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true">
              <svg
                className="svg-inline--fa fa-angle-right fa-w-6"
                aria-hidden="true"
                focusable="false"
                data-prefix="fal"
                data-icon="angle-right"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192 512"
                data-fa-i2svg
              >
                <path
                  fill="currentColor"
                  d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"
                />
              </svg>{" "}
              <i className="fal fa-angle-right" />{" "}
            </span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <ProductCard  productList={isLoading ? isLoading : allProducts}/>
      <CategoryProduct allCategories={isLoading ? isLoading : allCategories}/>
      <ProductCard  featuredProductList={isLoading ? isLoading : featruedCategories}/>
      <TopBrand allTopBrands={isLoading ? isLoading : allTopBrands}/>
    </>
  );
};

export default HomePage;
