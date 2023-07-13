import React from 'react'
import "./ContactUs.css"

const ContactUs = () => {
  return (
   <>
  <section className='contact-us'>
    <div className='container'>
      <div className='row'>
        <div className='col-md-5'>
          <div className='left-side-text'>
            <div className='discover-wrap'>
              <p className='contact-heading'>Discover Us</p>
              <p>
              Discover the timeless elegance and joy of antique and vintage 
              decorative arts with a visit to our studio in Noida.
              </p>
            </div>
            <div className='visit-us'>
              <p className='contact-heading'>Visit Us</p>
                <p> Hindustan Sports,</p>
                  <p>22 Connaught Place,
                  Dehradun Uttarakhand 248001, India</p>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <div className='email-wrap'>
                  <p className='contact-heading'>Email Us</p>
                  <p>
                  For customer service, product or order related inquiries, and suggestions, 
                  please contact us by completing the form below or via email at:
                  <a href="mailto:info@giksindia.com">info@giksindia.com</a>
                  </p>
                </div>
              </div>
              <div className='col-md-12'>
                <div className='callus-wrap'>
                  <p className='contact-heading'>Call Us</p>
                    <p> You can also call us at: +919582081905</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            <div className='col-md-12 removed'>
              <div className='form-wrap'></div>
                <p className='contact-heading'>Get in touch with us</p>
                <p>Thank you for getting in touch!</p>
                <p>Kindly fill the form, have a great day!</p>
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
                    <button type='submit' className='login-btn'>Submit</button>
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