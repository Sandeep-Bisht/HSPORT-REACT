import React from 'react'
import tick from "../../Images/tick.png"
import {MdCheck} from "react-icons/md"
import {Link} from "react-router-dom"
import "./PaymentSuccessfull.css"
function PaymentSuccessfull() {
  return (
<div className="bg-gray-100 h-screen mt-5">
      <div className="bg-white p-6  d-flex justify-content-center">
        <div className='successfull-check'>
      <MdCheck className='payment-check-icon'/>
      </div>
        </div>
        <div className="text-center mt-4">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
            <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
            <p> Have a great day!  </p>
            <div className="py-10 text-center">
                <a href="#" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO BACK 
               </a>
            </div>
        </div>
        <div className='d-flex justify-content-center mb-5'>
        <Link rel="canonical" to="/" className='btn common-btn span'>Go Back</Link>
        </div>
  </div>
  )
}

export default PaymentSuccessfull