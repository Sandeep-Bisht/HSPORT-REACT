import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./CategoryProduct.css"
function CategoryProduct(props) {

    const [sliderRef, setSliderRef] = useState(null);

    const {allCategories}=props;

    let url = "http://localhost:8080";

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        speed: 4000,
        autoplay: true,
        pauseOnHover: true,
        autoPlaySpeed: 3000,
      };

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
                <Slider ref={setSliderRef} {...settings} className="mb-4">
                  {allCategories &&
                    allCategories.length > 0 &&
                    allCategories.map((item, index) => {
                        return (
                          <div className="col-12" key={index}>
                            <div className="Category-container">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="category-left-side">
                                    <div>
                                      <div className="category-heading">
                                        <h4>{item.name}</h4>
                                      </div>
                                      <div className="category-text">
                                        <p>{item.description}</p>
                                      </div>
                                      <Link to={"/Subcategories/" + item._id}>
                                        <button className="common-btn btn category-Button">
                                          Shop Now
                                        </button>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <Link to={"/Subcategories/" + item._id}>
                                    <div className="Image-Container">
                                      <img
                                        src={
                                          `${url}/`+ item?.image[0]?.path
                                        }
                                        alt=""
                                        className="cat-left-side-image img-fluid"
                                      />
                                    </div>
                                  </Link>
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
    </>  )
}

export default CategoryProduct