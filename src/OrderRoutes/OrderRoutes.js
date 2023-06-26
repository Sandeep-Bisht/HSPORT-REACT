import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NewOrder from '../Components/Admin/NewOrder'
import HomePage from '../Components/HomePage/HomePage'
import Dashboard from '../Components/Admin/Dashboard'
import PackedOrder from '../Components/Admin/PackedOrder'
import InProgressOrder from '../Components/Admin/PackedOrder'
import ShippedOrder from '../Components/Admin/ShippedOrder'
import DeliveredOrder from '../Components/Admin/DeliveredOrder'
import CancelOrder from '../Components/Admin/CancelOrder'

function OrderRoutes() {
  return (  
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<Dashboard />}>
        <Route index element={< OrderRoutes/>} />
        <Route path='/dashboard/Order/Pending' element={<NewOrder/>} />
        <Route path='/dashboard/Order/InProgress' element={<InProgressOrder/>} />
        <Route path='/dashboard/Order/Canceled' element={<PackedOrder/>} />
        <Route path='/dashboard/Order/Packed' element={<ShippedOrder/>} />
        <Route path='/dashboard/Order/Shipped' element={<DeliveredOrder/>} />
        <Route path='/dashboard/Order/Delivered' element={<CancelOrder/>} />
        </Route>
    </Routes>
  )
}

export default OrderRoutes