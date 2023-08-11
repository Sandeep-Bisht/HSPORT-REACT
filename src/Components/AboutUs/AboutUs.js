import React,{useEffect} from 'react'
import About1 from "../../Images/about1.jpg"
import "./About.css"
import About2 from "../../Images/about2.jpg"
import About3 from "../../Images/about3.jpg"


const AboutUs = () => {
  useEffect(()=>{
    window.scroll(0,0);
  },[])
  return (
    <>
    <section className="about-page">
      <div className="container">
        <div className="row">
          <div className='col-md-6'>
            <div className='about-image'>
              <img src={About1} alt className='img-fluid' />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='about-text'>
              <h1 className='common-heading'>Our Story</h1>
              <p className='common-para f1 text-justify'>
                The Hindustan sports was founded with a passion for vintage &amp; antiques. At Hindustan Sports, 
              we believe that each artefact is made to perfection. We take pride in our ability 
              to carefully select and curate only the most beautiful objects of the highest standard.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className='about-2'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='about-section'>
              <h2 className='common-heading'>Who We Are</h2>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8 mx-auto'>
            <div className='about-section'>
              <p className='common-para f1 text-center pb-5'>
              After seeing a gap in the Indian market for genuine high-quality vintage & antiques, we decided to start Hindustan Sports India with love & passion. 
              We opened our first studio in Noida, India, with a mission to provide customers with the best vintage & antiques from around the world. 
              Since then, Hindustan Sports has grown to become one of the most respected and reputable antique dealers in India. We have expanded our collection to 
              include a wide range of vintage & antiques, from fine art to decorative antiques and collectibles.
              </p>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='about-section'>
             <img src={About2} alt className='img-fluid'/>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className='about-3'>
      <div className='container'>
        <div className='row align-item-center'>
          <div className='col-md-5 mx-auto'>
            <div className='our-vision-right-text'>
              <h2 className='common-heading'>Our Vision</h2>
              <p className='common-para  f1 text-justify'>
              At Hindustan Sports, our mission is to provide an exceptional shopping experience for antiques in India, 
              from the moment you step into our experience studio or visit our website or Instagram, to the moment your artefact is delivered to you. </p>
              
              <p className='common-para f1 text-justify'>
              We are passionate about preserving the history and beauty of antiques for future generations. 
              We hope that our passion and commitment to quality inspire you to explore the world of vintage & antiques and find something unique for your collection.
              </p>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='our-vision-left-image'>
              <img src={About3} alt className='img-fluid'/>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12 mt-4 pt-3 text-center'>
            <span className='fw-bold'>
            " Thank you for considering  of Hindustan Sports. 
            We look forward to sharing our love for vintage & antiques with you! "
            </span>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default AboutUs