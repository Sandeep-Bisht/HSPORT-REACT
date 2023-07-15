import React,{useState} from 'react'
import logo from "../../Images/logo.png"
import "./TopBrands.css"
import Slider from "react-slick";


const TopBrand =(props)=> {

  const [sliderRef, setSliderRef] = useState(null);

  let url = "http://localhost:8080/";

  const {allTopBrands}=props;

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

  return (
    <div className='container top-brand-container m-auto'>
        <div className='row logo-wrap brand-main'>
        <div className="col-md-12 ">
              <h1 className="common-heading text-center mb-lg-5">
                Top Brands
              </h1>
            </div>
        <Slider ref={setSliderRef} {...settings} className="mb-4 featured-slide">
          {allTopBrands && allTopBrands.map((item,index)=>{
            if(index<4)
            {
            return(
              <div className='col-3 brands-image'>
                <div className='brands-inner-div'>
              <img className="single-image" src={`${url}${item?.image[0].path}`} alt=''></img>
              </div>
              </div>
            )
            }
          })}
          </Slider>
        </div>
    </div>
  )
}

export default TopBrand