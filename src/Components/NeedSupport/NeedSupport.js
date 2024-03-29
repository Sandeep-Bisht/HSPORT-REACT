import React, { useEffect } from "react";
import "./NeedSupport.css";
import help from "../../Images/tech-support.png"

const NeedSupport = () => {
    useEffect(()=>{
        window.scroll(0,0);
    },[])
    return (
        <>
            <section className="need-support-main">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 support-text">
                            <div className="text">
                                <h1 className="common-heading text-start">Our Customer Support 24/7</h1>
                                <p className="f1">Experience exceptional customer support anytime, anywhere with our 24/7 service.
                                 Our expert team is always available to address your queries and provide timely solutions.
                                  Convenience and customer satisfaction are our top priorities, ensuring a seamless experience with us. Reach out to us via phone, email, live chat, or social media for immediate assistance.
                                </p>
                                <button className="btn support-btn">Contact-us</button>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 need-support-image-box">
                            <div className="support-image-div">
                                <img className="support-image" alt="need-support-image" src={help}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default NeedSupport