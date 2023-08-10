import React from 'react'
import {BsGem} from "react-icons/bs"
import {AiOutlineCheckCircle} from "react-icons/ai"
import {AiOutlineInbox} from "react-icons/ai"
import {GoHistory} from "react-icons/go"
import {PiTruckDuotone} from "react-icons/pi"
import {BsHeadset} from "react-icons/bs"
import "./BaseLine.css"

function BaseLine() {
  return (
    <section className='container-fluie baseLine-container mt-5'>
        <div className='row baseLine-row'>
            <div className='col-lg-2 col-md-2 col-sm-4 col-6 d-flex justify-content-center align-item-center baseLine-content'>
                <div className='d-flex justify-content-center baseLine-main'>
                    <div>
                    <BsGem className='baseLine-icon'/>
                    </div>
                    <div>
                        <p className='f1 baseLine-text'>AUTHENTIC PRODUCTS</p>
                    </div>
                </div>
            </div>
            <div className='col-lg-2 col-md-2 col-sm-4 col-6 d-flex justify-content-center align-item-center baseLine-content'>
                <div className='d-flex justify-content-center baseLine-main'>
                    <div>
                    <AiOutlineCheckCircle className='baseLine-icon'/>
                    </div>
                    <div>
                         <p className='f1 baseLine-text'>100% SAFE & SECURE CHECKOUT</p>
                    </div>
                </div>
            </div>
            <div className='col-lg-2 col-md-2 col-sm-4 col-6 d-flex justify-content-center align-item-center baseLine-content'>
                <div className='d-flex justify-content-center baseLine-main'>
                    <div>
                    <AiOutlineInbox className='baseLine-icon'/>
                    </div>
                    <div>
                         <p className='f1 baseLine-text'>CASH ON DELIVERY</p>
                    </div>
                </div>
            </div>
            <div className='col-lg-2 col-md-2 col-sm-4 col-6 d-flex justify-content-center align-item-center baseLine-content'>
                <div className='d-flex justify-content-center baseLine-main'>
                    <div>
                    <GoHistory className='baseLine-icon'/>
                    </div>
                    <div>
                         <p className='f1 baseLine-text'>7 DAYS EASY RETURNS</p>
                    </div>
                </div>
            </div>
            <div className='col-lg-2 col-md-2 col-sm-4 col-6 d-flex justify-content-center align-item-center baseLine-content'>
                <div className='d-flex justify-content-center baseLine-main'>
                    <div>
                    <PiTruckDuotone className='baseLine-icon'/>
                    </div>
                    <div>
                         <p className='f1 baseLine-text'>FREE SHIPPING IN DEHRADUN CITY</p>
                    </div>
                </div>
            </div>
            <div className='col-lg-2 col-md-2 col-sm-4 col-6 d-flex justify-content-center align-item-center baseLine-content'>
                <div className='d-flex justify-content-center baseLine-main'>
                    <div>
                    <BsHeadset className='baseLine-icon'/>
                    </div>
                    <div>
                         <p className='f1 baseLine-text'>CUSTOMER SERVICE</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default BaseLine