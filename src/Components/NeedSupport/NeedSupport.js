import React, { useEffect } from "react";
import "./NeedSupport.css";
import help from "../../Images/tech-support.png"

const NeedSupport = () => {
    useEffect(()=>{
        window.scroll(0,0);
    },[])
    return (
        <>
            <section className="main">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 support-text">
                            <div className="text">
                                <h1 className="common-heading text-start">Our Customer Support 24/7</h1>
                                <p className="f1">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <button className="btn support-btn">Contact-us</button>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 need-support-image-box">
                            <div className="support-image-div">
                                <img className="support-image" src={help}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default NeedSupport