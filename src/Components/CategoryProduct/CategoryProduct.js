import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./CategoryProduct.css"
import aboutImage from "../../Images/about1.jpg"
import Loader from "../Loader/Loader";

function CategoryProduct(props) {

  const [sliderRef, setSliderRef] = useState(null);

  const { allCategories } = props;

  const navigate=useNavigate();

  let url = "http://localhost:8080/";

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    speed: 4000,
    autoplay: true,
    pauseOnHover: true,
    autoPlaySpeed: 3000,
    responsive:[
      {
      breakpoint:767,
      settings : {
        slidesToShow: 2,
      }
    }
    ]
  };
  const categoryHander=(categoryId,slugName)=>{
    navigate(
      `/allproducts/${slugName}`,
      {state:{categoryId:categoryId,slugName:slugName}}
    )
  }

  return (
    <>
      <section className="categories-section">
        <div className="container m-auto">
          <div className="row mt-0 featured-products">
            <div className="col-md-12 ">
              <h1 className="common-heading text-center mb-lg-5">
                Featured Categories
              </h1>
            </div>
            {
              allCategories==true ? 
              <div className="col-12 d-flex justify-content-center">
                <Loader/>
              </div>:
              <div className="col-md-12">
                <Slider ref={setSliderRef} {...settings} className="mb-4 featured-slide">
              {allCategories &&
                allCategories.length > 0 &&
                allCategories.map((item, index) => {
                  return (
                    <div className="featured-card-row pe-0 d-flex" key={index}>
                      <div className={` featured-card ${index % 2 === 0 ? 'even-featured-card' : ''}`}>
                        <div className="card featured-card-inside m-2">
                          <img src={`${url}${item?.image[0].path}`} alt="all-category-image" className="card-img-top featured-image cursor-btn" alt=""
                          onClick={()=>categoryHander(item._id,item.slug)} />
                          <div className={`card-body featured-card-body ${index % 2 === 0 ? 'even-featured-card' : ''}`}>
                            <h5 className={`card-title category-title cursor-btn ${index % 2 === 0 ? 'even-title' : ''}`}
                            onClick={()=>categoryHander(item._id,item.slug)}>
                              {item.name}
                            </h5>
                            <p className="card-text category-description">
                              {item.description}
                            </p>
                            <button onClick={()=>categoryHander(item._id,item.slug)} className="btn featured-shop-btn common-btn">Shop Now</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider></div>
            }
          </div>
        </div>
      </section>
    </>)
}

export default CategoryProduct