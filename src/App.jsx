// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "@components/layout/Layout";
import HomePage from "@pages/HomePage";
import ShopPage from "@pages/ShopPage";
import ProductDetailPage from "@pages/ProductDetailPage";
import CartPage from "@pages/CartPage";
import EnquiryPage from "@pages/EnquiryPage";
import AboutPage from "@pages/AboutPage";
import TrendingPage from "@pages/TrendingPage";
import ContactPage from "@pages/ContactPage";
import WishlistPage from "@pages/WishlistPage";
import NotFoundPage from "@pages/NotFoundPage";
import ScrollToTop from "@components/layout/ScrollToTop";
import ProfilePage from "@pages/ProfilePage";
import TermsPage from "@pages/TermsPage";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LatestPage from '@pages/LatestPage';

function App() {
  useEffect(() => {
    // Check API health on app start
    const checkApiHealth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/1`);
        if (response.ok) {
          console.log("✅ API is reachable");
        } else {
          console.warn("⚠️ API is not reachable, using fallback data");
        }
      } catch (error) {
        console.warn("⚠️ API connection failed, using fallback data");
      }
    };
    checkApiHealth();
  }, []);

  return (
    <Router>
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/latest" element={<LatestPage />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="enquiry" element={<EnquiryPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
