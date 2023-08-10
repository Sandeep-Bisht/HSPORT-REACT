import React,{useEffect} from "react";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import "./policy.css"

function Faq () {
  useEffect(()=>{
    window.scroll(0,0);
  },[])

    return (
        <>
        <div className="container m-auto mt-4 mb-5">
        <div className="single-faq">
          <div className="row mb-2">
            <div className="col-md-10 col-lg-10 mx-auto">
            <div className="col-12">
              <h1 className="mb-4 pb-2 common-heading text-start">FAQ Area</h1>
            </div>
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button accordion-custom-btn collapsed"
                     id="accordionOne"
                      type="button" 
                      data-bs-toggle="collapse"
                     data-bs-target="#collapseOne" 
                      aria-expanded="false"
                     aria-controls="collapseOne"
                      >
                     <span className="one faq-headings f1">What is Sell on Hindustan</span> 
                      {/* <span className="two">                    
                      <AiOutlineMinus className="icon1"/>
                      <AiOutlinePlus className="icon2" />

                    </span> */}
                    </button>
                    
              
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                       <p className="common-para-3 common-para f1 paragraph-footer f1">
                       Sell on Hindustan is a program that enables you to list and sell your unique product on https://Hindustan.com/.
                       </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button accordion-custom-btn collapsed" 
                    type="button" data-bs-toggle="collapse" id="accordionTwo" data-bs-target="#collapseTwo" 
                    aria-expanded="false" aria-controls="collapseTwo" 
                    >
                   <span className="one one faq-headings f1">What products can I sell on Hindustan?</span>
                      {/* <span className="two">
                    <AiOutlineMinus className="icon1"/>
                      <AiOutlinePlus className="icon2" />
                    </span> */}
                    </button>
                   
              
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    <p className="common-para-3 common-para f1 paragraph-footer f1">
                       Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, 
                       whatever poutine normcore fixie cred kickstarter post-ironic street art.
                       Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, 
                       whatever poutine normcore fixie cred kickstarter post-ironic street art.
                       </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button  accordion-custom-btn collapsed" type="button"  id="accordionThree"
                    data-bs-toggle="collapse" data-bs-target="#collapseThree" 
                    aria-expanded="false" aria-controls="collapseThree" 
                    >
                      <span className="one faq-headings f1">What do I need to register as a seller on Hindustan?</span>
                      {/* <span className="two">
                    <AiOutlineMinus className="icon1"/>
                      <AiOutlinePlus className="icon2" />
                    </span> */}
                    </button>
                  
              
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    <p className="common-para-3 common-para f1 paragraph-footer f1">
                       Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, 
                       whatever poutine normcore fixie cred kickstarter post-ironic street art.
                       Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, 
                       whatever poutine normcore fixie cred kickstarter post-ironic street art.
                       </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button accordion-custom-btn collapsed" type="button"  id="accordionFour"
                    data-bs-toggle="collapse" data-bs-target="#collapseFour" 
                    aria-expanded="false" aria-controls="collapseThree" 
                    >
                      <span className="one faq-headings f1">I don’t have a website, can I still sell on Hindustan?</span>
                      {/* <span className="two">
                    <AiOutlineMinus className="icon1"/>
                      <AiOutlinePlus className="icon2" />
                    </span> */}
                    </button>
                  
              
                  </h2>
                  <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    <p className="common-para-3 common-para f1 paragraph-footer f1">
                       Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, 
                       whatever poutine normcore fixie cred kickstarter post-ironic street art.
                       Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, 
                       whatever poutine normcore fixie cred kickstarter post-ironic street art.
                       </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button className="accordion-button accordion-custom-btn collapsed" type="button"  id="accordionFive"
                    data-bs-toggle="collapse" data-bs-target="#collapseFive" 
                    aria-expanded="false" aria-controls="collapseFive" 
                    >
                      <span className="one faq-headings f1">Can customers leave feedback and why is customer feedback important?</span>
                      {/* <span className="two">
                    <AiOutlineMinus className="icon1"/>
                      <AiOutlinePlus className="icon2" />
                    </span> */}
                    </button>
                  
              
                  </h2>
                  <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    <p className="common-para-3 common-para f1 paragraph-footer f1">
                       Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, 
                       whatever poutine normcore fixie cred kickstarter post-ironic street art.
                       Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, 
                       whatever poutine normcore fixie cred kickstarter post-ironic street art.
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
        </div>
        </>
    )
}
export default Faq;