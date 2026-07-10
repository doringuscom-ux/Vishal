import React from 'react';
import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/admin" />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('refreshToken');
    navigate('/admin');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className="block p-2 rounded hover:bg-gray-700">Dashboard</Link>
          <Link to="/admin/products" className="block p-2 rounded hover:bg-gray-700">Products</Link>
          <Link to="/admin/industries" className="block p-2 rounded hover:bg-gray-700">Industries</Link>
          <Link to="/admin/pages" className="block p-2 rounded hover:bg-gray-700">Pages</Link>
          <Link to="/admin/blogs" className="block p-2 rounded hover:bg-gray-700">Blogs</Link>
          <Link to="/admin/gallery" className="block p-2 rounded hover:bg-gray-700">Gallery</Link>
          <Link to="/admin/contacts" className="block p-2 rounded hover:bg-gray-700">Contact Leads</Link>
          <Link to="/admin/seo" className="block p-2 rounded hover:bg-gray-700">SEO Manager</Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 p-2 rounded text-white">
            Logout
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
