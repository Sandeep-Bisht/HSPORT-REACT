import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from '../Components/HomePage/HomePage';
import Dashboard from '../Components/Admin/Dashboard';
import PageNotFound from '../PageNotFound';
import AllProductsDetails from '../Components/Admin/AllProductDetails';
import AdminDashboard from '../Components/Admin/AdminDashboard';
import ProductForm from '../Components/Forms/ProductForm';
import ProductCard from '../Components/ProductCard/ProductCard';

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/dashboard' element={<Dashboard />} >
      <Route index element={< AdminDashboard/>} />
        <Route path='/dashboard/allPrdoucts' element={< AllProductsDetails />} />
        <Route path='/dashboard/create-product' element={< ProductForm />} />
        </Route>
      <Route path="/PageNotFound" element={ <PageNotFound />} />
      <Route path='/product-card' element={ <ProductCard />} />
    </Routes>
  )
}

export default ApplicationRoutes