/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { HomePage } from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import { ProductDetailPage } from './pages/ProductDetail/ProductDetailPage';
import { RecommendedPage } from './pages/Recommended/RecommendedPage';
import { CartPage } from './pages/Cart/CartPage';

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Toaster position="bottom-right" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/recommended" element={<RecommendedPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}
