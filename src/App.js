import React from "react";

import { useLocation } from "react-router";
import Header from "./Components/Header/Header";
import ApplicationRoutes from "./ApplicationRoutes/ApplicationRoutes";
import Footer from "./Components/Footer/Footer";
function App() {
  const match=useLocation();
  return (  
    <>
    <Header />
    <ApplicationRoutes />
    {
      (match.pathname.includes("/dashboard")) ? null : <Footer />    
    }
    </>  
  );
}

export default App;
