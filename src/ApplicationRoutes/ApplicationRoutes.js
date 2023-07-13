import React from 'react';
import { useLocation, Route, Routes, useNavigate } from "react-router-dom";
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
import InProgressOrder from '../Components/Admin/PackedOrder'
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

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/dashboard' element={<Dashboard />} >
      <Route index element={< AdminDashboard/>} />
        <Route path='/dashboard/allPrdoucts' element={< AllProductsDetails />} />
        <Route path='/dashboard/allCategories' element={<AllCategoriesDetails/>}/>
        <Route path='/dashboard/allSubCategories' element={<AllSubCategoriesDetails/>}/>
        <Route path='/dashboard/allBrands' element={<AllBrandsDetails/>}/>
        <Route path='/dashboard/create-product' element={< ProductForm />} />
        <Route path='/dashboard/create-brand' element={<TopBrandsForm/>}/>
        <Route path='/dashboard/create-category' element={< CategoryForm />} />SubCategoryForm
        <Route path='/dashboard/create-subCategory' element={< SubCategoryForm />} />


        <Route path='/dashboard/Order/Pending' element={<NewOrder/>} />
        <Route path='/dashboard/Order/InProgress' element={<InProgressOrder/>} />
        <Route path='/dashboard/Order/Canceled' element={<PackedOrder/>} />
        <Route path='/dashboard/Order/Packed' element={<ShippedOrder/>} />
        <Route path='/dashboard/Order/Shipped' element={<DeliveredOrder/>} />
        <Route path='/dashboard/Order/Delivered' element={<CancelOrder/>} />
        <Route/>
        </Route>
      <Route path="/PageNotFound" element={ <PageNotFound />} />
      <Route path="/terms&condition" element={ <TermsConditions />} />
      <Route path="/return&refund" element={ <ReturnRefund />} />
      <Route path="/shippingPolicy" element={ <ShippingPolicy />} />
      <Route path='/privacy&policy' element={<PrivacyPolicy/>}/>
      <Route path='/faq' element={<Faq/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/allproducts' element={<AllProducts/>}/>
      <Route path='/product/:id' element={<ProductDetailPage />} />
      <Route path='/collection/:id' element={<AllProducts />} />

      <Route path='SearchResult' element={<SearchResult/>} />
      <Route path='/about-us' element={<AboutUs />} />
      <Route path='/UserOrder' element={<UserOrder />} />
      <Route path='/PaymentSuccessfull' element={<PaymentSuccessfull />} />
      <Route path='/contact-us' element={<ContactUs />} />


    </Routes>
  )
}

export default ApplicationRoutes