import React, { useState, useEffect } from 'react';
import { Search, Edit3, Settings2 } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { PRODUCTS_API, PAGES_API, STATIC_SEO_API, INDUSTRIES_API, BLOGS_API } from '../../utils/api';
import SeoEditModal from './components/SeoEditModal';

export default function AdminSeoManager() {
  const [activeTab, setActiveTab] = useState('products');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Add Static Route Form
  const [showAddStatic, setShowAddStatic] = useState(false);
  const [newStaticPath, setNewStaticPath] = useState('');
  const [newStaticTitle, setNewStaticTitle] = useState('');
  const [addingStatic, setAddingStatic] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === 'products' ? PRODUCTS_API 
                     : activeTab === 'static' ? STATIC_SEO_API 
                     : activeTab === 'industries' ? INDUSTRIES_API
                     : activeTab === 'blogs' ? BLOGS_API
                     : PAGES_API;
      const { data } = await axiosInstance.get(endpoint);
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch data for SEO manager', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleSaveSeo = async (id, seoData, type) => {
    try {
      const endpoint = type === 'products' 
        ? `${PRODUCTS_API}/${id}/seo` 
        : type === 'static'
        ? `${STATIC_SEO_API}/${id}/seo`
        : type === 'industries'
        ? `${INDUSTRIES_API}/${id}/seo`
        : type === 'blogs'
        ? `${BLOGS_API}/${id}/seo`
        : `${PAGES_API}/${id}/seo`;
      
      await axiosInstance.put(endpoint, seoData);
      setModalOpen(false);
      fetchData(); // Refresh list to show updated status
    } catch (error) {
      console.error('Failed to save SEO data', error);
      alert('Failed to save SEO data');
    }
  };

  const handleAddStatic = async (e) => {
    e.preventDefault();
    setAddingStatic(true);
    try {
      await axiosInstance.post(STATIC_SEO_API, {
        path: newStaticPath,
        title: newStaticTitle
      });
      setNewStaticPath('');
      setNewStaticTitle('');
      setShowAddStatic(false);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add static route');
    } finally {
      setAddingStatic(false);
    }
  };

  const handleDeleteStatic = async (id) => {
    if (!window.confirm('Are you sure you want to delete this static route?')) return;
    try {
      await axiosInstance.delete(`${STATIC_SEO_API}/${id}`);
      fetchData();
    } catch (error) {
      alert('Failed to delete route');
    }
  };

  const filteredItems = items.filter(item => {
    const term = search.toLowerCase();
    const itemName = (item.name || item.title || item.path || '').toLowerCase();
    return itemName.includes(term);
  });

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Centralized tool to manage SEO for all your dynamic pages</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-6 font-semibold text-sm border-b-2 transition-colors ${activeTab === 'products' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={`py-3 px-6 font-semibold text-sm border-b-2 transition-colors ${activeTab === 'pages' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('pages')}
        >
          City Pages
        </button>
        <button
          className={`py-3 px-6 font-semibold text-sm border-b-2 transition-colors ${activeTab === 'static' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('static')}
        >
          Static Pages
        </button>
        <button
          onClick={() => setActiveTab('industries')}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === 'industries' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Industries
        </button>
        <button
          onClick={() => setActiveTab('blogs')}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === 'blogs' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Blogs
        </button>
      </div>

      {activeTab === 'static' && showAddStatic && (
        <form onSubmit={handleAddStatic} className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-bold text-gray-700 mb-1">Friendly Name</label>
            <input type="text" required value={newStaticTitle} onChange={e => setNewStaticTitle(e.target.value)} placeholder="e.g. Home Page" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-bold text-gray-700 mb-1">Route Path</label>
            <input type="text" required value={newStaticPath} onChange={e => setNewStaticPath(e.target.value)} placeholder="e.g. / or /contact" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
          </div>
          <button type="submit" disabled={addingStatic} className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold disabled:opacity-70">
            {addingStatic ? 'Adding...' : 'Add Route'}
          </button>
          <button type="button" onClick={() => setShowAddStatic(false)} className="w-full md:w-auto px-6 py-2 border border-gray-300 rounded-lg font-bold">
            Cancel
          </button>
        </form>
      )}

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        {activeTab === 'static' && !showAddStatic && (
          <button onClick={() => setShowAddStatic(true)} className="px-4 py-2 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors">
            + Add Static Route
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs text-gray-700 uppercase font-bold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Name / Title</th>
                <th className="px-6 py-4">URL Slug</th>
                <th className="px-6 py-4">SEO Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500 font-medium">
                    Loading data...
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500 font-medium">
                    No {activeTab} found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const hasSeo = Boolean(item.metaTitle || item.metaDescription);
                  return (
                    <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900">
                        {item.name || item.title}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {activeTab === 'products' ? `/product/${item.slug || item._id}` 
                         : activeTab === 'static' ? item.path 
                         : `/city/${item.slug || item._id}`}
                      </td>
                      <td className="px-6 py-4">
                        {hasSeo ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                            Optimized
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                            Missing Data
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(item)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Settings2 className="w-4 h-4" />
                            Edit SEO
                          </button>
                          {activeTab === 'static' && (
                            <button
                              onClick={() => handleDeleteStatic(item._id)}
                              className="px-3 py-1.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SeoEditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={selectedItem}
        type={activeTab}
        onSave={handleSaveSeo}
      />
    </div>
  );
}
