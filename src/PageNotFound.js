import React from "react";
import { Link } from "react-router-dom";
import pageNotFound from "./Images/page-not-found.jpg";
import "./Css/PageNotFound.css"

function PageNotFound() {
  return (
    <>
      <section className="page-not-found-page">
        <div className="container m-auto">
          <div className="row mt-0">
            <div className="col-12 mx-auto">
              <div className="d-flex justify-content-center align-items-center">
                <div className="">
                  <img src={pageNotFound} alt="pageNotFound" className="error-image" />
                  <p className="error-1 text-center common-headig">Page Not Found</p>
                  <p className="error-message f1 text-center">
                  We're sorry, the page you requested could not be found. Please click on the Home.
                  </p><div className="error-home-btn">
                  <button type="button">
                    <Link to="/" rel="canonical">Back to Home</Link>
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PageNotFound;
