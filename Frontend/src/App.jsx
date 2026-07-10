import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import BackgroundPattern from './components/BackgroundPattern';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import IndustriesPage from './pages/IndustriesPage';
import IndustryDetailsPage from './pages/IndustryDetailsPage';
import ProductsPage from './pages/ProductsPage';
import SingleProductPage from './pages/SingleProductPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import CityPage from './pages/CityPage';
import BlogPage from './pages/BlogPage';
import SingleBlogPage from './pages/SingleBlogPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminProductForm from './pages/Admin/AdminProductForm';
import AdminIndustries from './pages/Admin/AdminIndustries';
import AdminIndustryForm from './pages/Admin/AdminIndustryForm';
import AdminPages from './pages/Admin/AdminPages';
import AdminPageForm from './pages/Admin/AdminPageForm';
import AdminSeoManager from './pages/Admin/AdminSeoManager';
import AdminBlogs from './pages/Admin/AdminBlogs';
import AdminBlogForm from './pages/Admin/AdminBlogForm';
import AdminGallery from './pages/Admin/AdminGallery';
import AdminContact from './pages/Admin/AdminContact';
import DynamicHelmet from './components/DynamicHelmet';

function App() {
  return (
    <HelmetProvider>
      <DynamicHelmet />
      <div className="min-h-screen font-sans">
          <BackgroundPattern />
          <Routes>
            {/* Public Routes with Header/Footer */}
            <Route path="/" element={<><Header /><main><HomePage /></main><Footer /></>} />
            <Route path="/industries" element={<><Header /><main><IndustriesPage /></main><Footer /></>} />
            <Route path="/industry/:slug" element={<><Header /><main><IndustryDetailsPage /></main><Footer /></>} />
            <Route path="/products" element={<><Header /><main><ProductsPage /></main><Footer /></>} />
            <Route path="/product/:slug" element={<><Header /><main><SingleProductPage /></main><Footer /></>} />
            <Route path="/city/:cityName" element={<><Header /><main><CityPage /></main><Footer /></>} />
            <Route path="/contact" element={<><Header /><main><ContactPage /></main><Footer /></>} />
            <Route path="/gallery" element={<><Header /><main><GalleryPage /></main><Footer /></>} />
            <Route path="/blog" element={<><Header /><main><BlogPage /></main><Footer /></>} />
            <Route path="/blog/:slug" element={<><Header /><main><SingleBlogPage /></main><Footer /></>} />
            
            {/* Admin Routes (No public Header/Footer) */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<AdminProductForm />} />
              <Route path="products/edit/:id" element={<AdminProductForm />} />
              
              <Route path="industries" element={<AdminIndustries />} />
              <Route path="industries/new" element={<AdminIndustryForm />} />
              <Route path="industries/edit/:id" element={<AdminIndustryForm />} />
              
              <Route path="pages" element={<AdminPages />} />
              <Route path="pages/new" element={<AdminPageForm />} />
              <Route path="pages/edit/:id" element={<AdminPageForm />} />
              <Route path="seo" element={<AdminSeoManager />} />
              
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="blogs/new" element={<AdminBlogForm />} />
              <Route path="blogs/edit/:id" element={<AdminBlogForm />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="contacts" element={<AdminContact />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<><Header /><main><NotFoundPage /></main><Footer /></>} />
          </Routes>
        </div>
    </HelmetProvider>
  );
}

export default App;
