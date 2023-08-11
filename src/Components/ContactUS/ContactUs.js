import React,{useEffect} from 'react'
import "./ContactUs.css"


const ContactUs = () => {
  useEffect(()=>{
    window.scroll(0,0);
  },[])

  return (
   <>
  <section className='contact-us'>
    <div className='container'>
      <div className='row'>
        <div className='col-md-5'>
          <div className='left-side-text'>
            <div className='discover-wrap'>
              <h1 className='common-heading text-start'>Discover Us</h1>
              <p className='common-para paragraph-footer f1'>
              Discover the timeless elegance and joy of antique and vintage 
              decorative arts with a visit to our studio in Noida.
              </p>
            </div>
            <div className='visit-us'>
              <h2 className='common-heading text-start'>Visit Us</h2>
                <p className='common-para paragraph-footern f1'> Hindustan Sports,</p>
                  <p className='common-para paragraph-footer f1'>22 Connaught Place,
                  Dehradun Uttarakhand 248001, India</p>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <div className='email-wrap'>
                  <h2 className='common-heading text-start'>Email Us</h2>
                  <p className='common-para paragraph-footer f1'>
                  For customer service, product or order related inquiries, and suggestions, 
                  please contact us by completing the form below or via email at:
                  <a href="mailto:hindustan.com">hindustan.com</a>
                  </p>
                </div>
              </div>
              <div className='col-md-12'>
                <div className='callus-wrap'>
                  <h2 className='common-heading text-start'>Call Us</h2>
                    <p className='common-para paragraph-footer f1'> You can also call us at: +919582081905</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-7 form-section'> 
            <div className='col-md-12 removed'>
              <div className='form-wrap'></div>
                <h2 className='common-heading text-start'>Get in touch with us</h2>
                <p className='common-para paragraph-footer f1'>Thank you for getting in touch!</p>
                <p className='common-para paragraph-footer f1'>Kindly fill the form, have a great day!</p>
            </div>
       
          <div className='col-md-12 removed'>
            <div className='from-wrap'>
              <form>
                <div className='row'>
                   <div className='col-md-6 col-6'>
                    <input type='text' placeholder='Your Name' className='name'></input>
                    </div> 
                   <div className='col-md-6 col-6'>
                     <input type='text' placeholder='Your Email' className='emailaddress'></input>
                    </div> 
                </div>
                <div className='row py-5 removed-1'>
                  <div className='col-md-6 col-6'>
                  <input type='number' placeholder='Phone Number' className='phoneNumber'></input>
                  </div>
                  <div className='col-md-6 col-6'>
                  <input type='text' placeholder='Country' className='country'></input>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                  <input type='message' placeholder='Message' className='message'></input>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6 mt-4'>
                    <button type='submit' className='contact-us-submit'>Submit</button>
                  </div>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
   
   </>
    
  )
}

export default ContactUs