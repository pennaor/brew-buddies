import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Manage from './pages/Manage';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/customer/products" element={ <Products /> } />
        <Route path="/seller/orders" element={ <Orders /> } />
        <Route path="/admin/manage" element={ <Manage /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/login" element={ <Login /> } />
        <Route exact path="/" element={ <Navigate to="/login" /> } />
      </Routes>
    </div>
  );
}

export default App;
