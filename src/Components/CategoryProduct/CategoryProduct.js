import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./CategoryProduct.css"
import aboutImage from "../../Images/about1.jpg"
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
  };
  const categoryHander=(categoeyId)=>{
    navigate(
      '/allProducts',
      {state:categoeyId}
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
            <Slider ref={setSliderRef} {...settings} className="mb-4 featured-slide">
              {allCategories &&
                allCategories.length > 0 &&
                allCategories.map((item, index) => {
                  return (
                    <div className="row featured-card-row pe-0 d-flex" key={index}>
                      <div className={`col-12 featured-card ${index % 2 === 0 ? 'even-featured-card' : ''}`}>
                        <div className="card featured-card-inside m-2">
                          <img src={`${url}${item?.image[0].path}`} className="card-img-top featured-image" alt="" />
                          <div className={`card-body ${index % 2 === 0 ? 'even-featured-card' : ''}`}>
                            <h5 className={`card-title category-title ${index % 2 === 0 ? 'even-title' : ''}`}>
                              {item.name}
                            </h5>
                            <p className="card-text category-description">
                              {item.description}
                            </p>
                            <button onClick={()=>categoryHander(item._id)} className="btn featured-shop-btn common-btn">Shop Now</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>

          </div>
        </div>
      </section>
    </>)
}

export default CategoryProduct