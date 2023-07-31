import React from "react";
import "./userprofile.css"

const userprofile= ()=>{
return(
    <>
<section>
<div className="Myacount-page">
    <form>
    <div className="container">
    <div className="col-12 acount-page">
    <div class="card">
  <span class="title">My Account</span>
  <form class="form">
    <div class="group">
    <input placeholder="" type="text" required=""></input>
    <label for="name">Name</label>
    </div>
<div class="group">
    <input placeholder="" type="text" name="address" required=""></input>
    <label for="address">Address</label>
    </div>
<div class="group">
    <input placeholder="" type="number" id="address" name="number" required=""></input>
    <label for="number">Mobile Number</label>
</div>
<div className="account-button">
    <button type="submit">Submit</button>
    </div>
  </form>
</div>

    </div>
    </div>
    </form>
</div>
</section>
    </>
)
}
export default userprofile;