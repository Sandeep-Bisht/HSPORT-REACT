import React, { useEffect } from "react";
import "./userprofile.css"

const Userprofile= ()=>{

    useEffect(()=>{
        window.scroll(0,0);
    },[])

return(
    <>
<section className="myAccount-area">
            <div className="Myacount-page">
                <form>
                    <div className="container mt-5 mb-4">
                        <div className="row">
                            <div className="col-12 Myacount-page">
                                <div className="card p-4 m-2">
                                    <h4 className="Myacount-heading text-center pb-3">My Account</h4>
                                    <div className="row">
                                        <div className="col-md-6 col-12 p-1">
                                                <p className="ps-1">Name:</p>
                                                <input type="text" className="form-control" placeholder row="3" name="name"></input>
                                        </div>
                                        <div className="col-md-6 col-12 p-1">
                                                <p className="ps-1">Mobile Number:</p>
                                                <input type="number" className="form-control bg-light" placeholder row="3" name="mobileNumber"></input>
                                        </div>
                                        <div className="col-md-6 col-12 p-1">
                                                <p className="ps-1">Email:</p>
                                                <input type="email" className="form-control bg-light" placeholder row="3" name="email"></input>
                                        </div>
                                        <div className="col-12 d-flex justify-content-center mt-4 p-2">
                                            <button className="Myacount-button btn btn-primary" type="submit">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
</section>
    </>
)
}
export default Userprofile;