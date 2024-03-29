import React from "react";

import { useLocation } from "react-router";
import Header from "./Components/Header/Header";
import ApplicationRoutes from "./ApplicationRoutes/ApplicationRoutes";
import Footer from "./Components/Footer/Footer";
import "../src/Css/Common.css"
function App() {
  const match=useLocation();
  return (  
    <>
    {
      (match.pathname.includes("/dashboard")) ? null : <Header />    
    }
    <ApplicationRoutes />
    {
      (match.pathname.includes("/dashboard")) ? null : <Footer />    
    }
    </>  
  );
}

export default App;
