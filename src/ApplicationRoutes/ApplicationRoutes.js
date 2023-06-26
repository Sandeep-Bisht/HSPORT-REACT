import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
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

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/dashboard' element={<Dashboard />} >
      <Route index element={< AdminDashboard/>} />
        <Route path='/dashboard/allPrdoucts' element={< AllProductsDetails />} />
        <Route path='/dashboard/allCategories' element={<AllCategoriesDetails/>}/>
        <Route path='/dashboard/allBrands' element={<AllBrandsDetails/>}/>
        <Route path='/dashboard/create-product' element={< ProductForm />} />
        <Route path='/dashboard/create-category' element={< CategoryForm />} />

        <Route path='/dashboard/Order/Pending' element={<NewOrder/>} />
        <Route path='/dashboard/Order/InProgress' element={<InProgressOrder/>} />
        <Route path='/dashboard/Order/Canceled' element={<PackedOrder/>} />
        <Route path='/dashboard/Order/Packed' element={<ShippedOrder/>} />
        <Route path='/dashboard/Order/Shipped' element={<DeliveredOrder/>} />
        <Route path='/dashboard/Order/Delivered' element={<CancelOrder/>} />
        <Route/>
        </Route>
      <Route path="/PageNotFound" element={ <PageNotFound />} />
    </Routes>
  )
}

export default ApplicationRoutes