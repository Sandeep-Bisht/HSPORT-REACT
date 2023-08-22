import React from 'react';
import {  Route, Routes, Navigate } from "react-router-dom";
import HomePage from '../Components/HomePage/HomePage';
import Dashboard from '../Components/Admin/Dashboard';
import PageNotFound from '../PageNotFound';
import AllProductsDetails from '../Components/Admin/AllProductDetails';
import AdminDashboard from '../Components/Admin/AdminDashboard';
import ProductForm from '../Components/Forms/ProductForm';
import CategoryForm from '../Components/Forms/CategoryForm';
import AllCategoriesDetails from '../Components/Admin/AllCategoriesDetails';
import AllBrandsDetails from '../Components/Admin/AllBrandsDetails';
import PackedOrder from '../Components/Admin/PackedOrder'
import InProgressOrder from '../Components/Admin/InProgressOrder'
import ShippedOrder from '../Components/Admin/ShippedOrder'
import DeliveredOrder from '../Components/Admin/DeliveredOrder'
import CancelOrder from '../Components/Admin/CancelOrder'
import NewOrder from '../Components/Admin/NewOrder';
import TermsConditions from '../Components/TermsConditions';
import ReturnRefund from '../Components/ReturnRefund';
import ShippingPolicy from '../Components/ShippingPolicy';
import PrivacyPolicy from '../Components/PrivacyPolicy';
import Faq from '../Components/Faq';
import TopBrandsForm from '../Components/Forms/TopBrandsForm';
import SubCategoryForm from '../Components/Forms/SubCategoryForm';
import AllSubCategoriesDetails from '../Components/Admin/AllSubCategoriesDetails';
import Cart from '../Components/Cart/Cart';
import Wishlist from '../Components/Wishlist/Wishlist';
import AllProducts from '../Components/AllProducts/AllProducts';
import ProductDetailPage from '../Components/ProductDetailPage/ProductDetailPage';
import SearchResult from '../Components/SearchResult/SearchResult';
import AboutUs from '../Components/AboutUs/AboutUs';
import UserOrder from '../Components/UserOrder/UserOrder';
import PaymentSuccessfull from '../Components/PaymentSuccessfull/PaymentSuccessfull';
import ContactUs from '../Components/ContactUS/ContactUs';
import Cookies from 'js-cookie';
import UserProfile from '../Components/UserProfile/userprofile';
import NeedAndSupport from '../Components/NeedSupport/NeedSupport';
import VerifyToken from '../Components/VerifyToken/VerifyToken';
import ForgetPassword from '../Components/ForgetPassword/ForgetPassword';



const Authanticated = (props) => {
  if (Cookies.get("userdata")) {
  let userdata = JSON.parse(decodeURIComponent(Cookies.get("userdata")));
  if(userdata?.role != "admin") {
     return <Navigate to="/" replace />
  }
  
} else{
  return <Navigate to="/" replace />
}
return props.component
}

const ApplicationRoutes = () => {
  
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/dashboard"  element={<Authanticated component= {<Dashboard />} /> } >
      <Route index element={< AdminDashboard/>} />
        <Route path='/dashboard/configuration/all-prdoucts' element={< AllProductsDetails />} />
        <Route path='/dashboard/configuration/all-categories' element={<AllCategoriesDetails/>}/>
        <Route path='/dashboard/configuration/all-sub-categories' element={<AllSubCategoriesDetails/>}/>
        <Route path='/dashboard/configuration/all-brands' element={<AllBrandsDetails/>}/>
        <Route path='/dashboard/configuration/create-product' element={< ProductForm />} />
        <Route path='/dashboard/configuration/create-brand' element={<TopBrandsForm/>}/>
        <Route path='/dashboard/configuration/create-category' element={< CategoryForm />} />
        <Route path='/dashboard/configuration/create-sub-category' element={< SubCategoryForm />} />


        <Route path='/dashboard/order/pending' element={<NewOrder/>} />
        <Route path='/dashboard/order/in-progress' element={<InProgressOrder/>} />
        <Route path='/dashboard/order/packed' element={<PackedOrder/>} />
        <Route path='/dashboard/order/shipped' element={<ShippedOrder/>} />
        <Route path='/dashboard/order/delivered' element={<DeliveredOrder/>} />
        <Route path='/dashboard/order/canceled' element={<CancelOrder/>} />
        <Route/>
        </Route>
      <Route path="*" element={ <PageNotFound />} />
      <Route path="/terms&condition" element={ <TermsConditions />} />
      <Route path="/return&refund" element={ <ReturnRefund />} />
      <Route path="/shippingPolicy" element={ <ShippingPolicy />} />
      <Route path='/privacy&policy' element={<PrivacyPolicy/>}/>
      <Route path='/faq' element={<Faq/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/allproducts' element={<AllProducts/>}/>
      <Route path='/allproducts/:slug' element={<AllProducts/>}/>
      <Route path='/product/:id' element={<ProductDetailPage />} />
      <Route path='/collection/:id' element={<AllProducts />} />

      <Route path='SearchResult' element={<SearchResult/>} />
      <Route path='/about-us' element={<AboutUs />} />
      <Route path='/UserOrder' element={<UserOrder />} />
      <Route path='/PaymentSuccessfull' element={<PaymentSuccessfull />} />
      <Route path='/contact-us' element={<ContactUs />} />
      <Route path='/userProfile' element={<UserProfile/>} />
      <Route path='/needAndSupport' element={<NeedAndSupport/>} />
      <Route path='/subscribed/:token' element={<VerifyToken/>} />
      <Route path='/forgetpassword' element={<ForgetPassword/>} />

    </Routes>
  )
}

export default ApplicationRoutes