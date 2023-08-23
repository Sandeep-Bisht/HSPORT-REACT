import React, { useState,useEffect } from 'react'
import { useLocation,Link } from 'react-router-dom'
import {MdCheck} from "react-icons/md"
import { RxCross2 } from 'react-icons/rx';
import "./VerifyToken.css"
import axios from 'axios';
import { baseUrl } from '../../Utils/Service';

function VerifyToken() {
    const [verifiedToken,setVerifiedToken]=useState(true);
    const location=useLocation();
    const token = location.pathname;

    useEffect(()=>{ 
        if(token)
        {
            verifyToken(token)
        }
    },[token]);
    const verifyToken=async(token)=>{
        const response=await axios.post(`${baseUrl}/api/subscribed/verify`,
        {token:token}
        )
        if(response.data.status==400)
        {
            setVerifiedToken(false);
        }
       }

  return (
    <>
    {
        verifiedToken ?
<div className="bg-gray-100 h-screen mt-5">
      <div className="bg-white p-6  d-flex justify-content-center">
        <div className='subscribed-successfull-check'>
      <MdCheck className='subscribed-check-icon'/>
      </div>
        </div>
        <div className="text-center mt-4">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Subscribed Successfull</h3>
            <p className="text-gray-600 my-2 f1 ">Thank you for subscribing! You will receive updates about our latest offers and news.</p>
            <p className='f1'> Have a great day!  </p>
        </div>
        <div className='d-flex justify-content-center mb-5'>
        <Link rel="canonical" to="/" className='btn subscribed-common-btn span'>Go Back</Link>
        </div>
  </div> :
  <div className="bg-gray-100 h-screen mt-5">
  <div className="bg-white p-6  d-flex justify-content-center">
    <div className='subscribed-successfull-cross'>
  <RxCross2 className='subscribed-check-icon'/>
  </div>
    </div>
    <div className="text-center mt-4">
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Session expired</h3>
        <p className="text-gray-600 my-2 f1 ">Session has expired. Please re-subscribe.</p>
        <p className='f1'> Have a great day!  </p>
    </div>
    <div className='d-flex justify-content-center mb-5'>
    <Link rel="canonical" to="/" className='btn subscribed-common-btn span'>Go Back</Link>
    </div>
</div>
    }
 </>
  )
}

export default VerifyToken