import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ordersummary from './pages/ordersummary';
import OrderConfirmation from './pages/OrderConfirmation';
import LoginRegister from './pages/LoginRegister'; //NEW COMBINED COMPONENT

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(savedLogin);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
        />

        {/*  COMBINED LOGIN/REGISTER PAGE */}
        <Route
          path="/auth"
          element={<LoginRegister onLogin={handleLogin} />}
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Checkout cartItems={cartItems} setCartItems={setCartItems} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-summary"
          element={<ordersummary cartItems={cartItems} />}
        />

        <Route
          path="/Order-Confirmation"
          element={<OrderConfirmation cartItems={cartItems} />}
        />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
