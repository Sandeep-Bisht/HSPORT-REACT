import React from 'react'
import './HomePage.css'
import slider1 from '../../Images/slider1.jpg'
import slider2 from '../../Images/slider2.jpg'
import slider3 from '../../Images/slider3.jpg'
import ProductCard from '../ProductCard/ProductCard'

const HomePage = () => {
  return (
    <>
     <div className="home-slider">
       <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className aria-label="Slide 1" />
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" className="active" aria-current="true" />
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" className />
    </div>
    <div className="carousel-inner">
      <div className="carousel-item">
        <img src={slider1} className="d-block w-100" alt="..." />
        
        <div className="carousel-caption d-md-block">
          <p className="slider-title">Amazing Tour In<br />
            madagascar </p>
          {/* <p className="tour-info">
            7 Days, 8 Night Tour

          </p> */}
           <a href="#" className="common-btn"><span>Book Now</span></a>
        </div>
      </div>
      <div className="carousel-item active">
      <img src={slider2} className="d-block w-100" alt="..." />
        <div className="carousel-caption  d-md-block">
          <p className="slider-title">Amazing Tour In<br />
            Hampshire </p>
          {/* <p className="tour-info">
            7 Days, 8 Night Tour
          </p> */}
          <a href="#" className="common-btn"><span className=''>Book Now</span></a>
        </div>
      </div>
      <div className="carousel-item">
      <img src={slider3} className="d-block w-100" alt="..." />
        <div className="carousel-caption  d-md-block">
          <p className="slider-title">Amazing Tour In<br />
            Indonesia </p>
          {/* <p className="tour-info">
            7 Days, 8 Night Tour
          </p> */}
          <a href="#" className="common-btn"><span className=''>Book Now</span></a>
        </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"><svg className="svg-inline--fa fa-angle-left fa-w-6" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" data-fa-i2svg><path fill="currentColor" d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z" /></svg><i className="fal fa-angle-left" /></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"><svg className="svg-inline--fa fa-angle-right fa-w-6" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" data-fa-i2svg><path fill="currentColor" d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" /></svg> <i className="fal fa-angle-right" /> </span>
      <span className="visually-hidden">Next</span>
    </button>
       </div>
     </div>
     <ProductCard/>

    </>
  )
}

export default HomePage