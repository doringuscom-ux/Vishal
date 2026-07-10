import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { INDUSTRIES_API, PRODUCTS_API } from '../../utils/api';

export default function AdminIndustryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    desc: '',
    relatedProducts: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    if (isEditMode) {
      fetchIndustry();
    }
  }, [id]);

  const fetchIndustry = async () => {
    try {
      // API expects slug, but we usually route admin edits by ID in standard REST. 
      // We will need to fetch all and find by ID, or use a specific GET by ID endpoint.
      // Wait, our backend routes `GET /:slug` uses slug. 
      // Actually, since we're using Mongoose _id in the frontend list, let's fetch all and filter, or change the backend route.
      // Easiest is to fetch all industries since the list is small.
      const { data } = await axiosInstance.get(INDUSTRIES_API);
      const industry = data.find(ind => ind._id === id);
      if (industry) {
        setFormData({
          name: industry.name,
          slug: industry.slug,
          desc: industry.desc,
          relatedProducts: industry.relatedProducts || ''
        });
        setExistingImage(industry.image);
      }
    } catch (error) {
      console.error('Failed to fetch industry', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get(PRODUCTS_API);
      setAllProducts(data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from name if creating new
      ...(name === 'name' && !isEditMode && { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') })
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleProductToggle = (productName) => {
    setFormData(prev => {
      let currentProducts = prev.relatedProducts ? prev.relatedProducts.split(',').map(s => s.trim()).filter(Boolean) : [];
      if (currentProducts.includes(productName)) {
        currentProducts = currentProducts.filter(p => p !== productName);
      } else {
        currentProducts.push(productName);
      }
      return { ...prev, relatedProducts: currentProducts.join(', ') };
    });
  };

  const handleSelectAll = () => {
    setFormData(prev => {
      let currentProducts = prev.relatedProducts ? prev.relatedProducts.split(',').map(s => s.trim()).filter(Boolean) : [];
      
      // If all products are already selected, deselect all
      if (currentProducts.length === allProducts.length && allProducts.length > 0) {
        return { ...prev, relatedProducts: '' };
      } 
      
      // Otherwise, select all
      const allProductNames = allProducts.map(p => p.name);
      return { ...prev, relatedProducts: allProductNames.join(', ') };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('slug', formData.slug);
    submitData.append('desc', formData.desc);
    submitData.append('relatedProducts', formData.relatedProducts);
    
    if (imageFile) {
      submitData.append('imageFile', imageFile);
    } else if (existingImage) {
      submitData.append('imageUrl', existingImage);
    }

    try {
      if (isEditMode) {
        await axiosInstance.put(`${INDUSTRIES_API}/${id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axiosInstance.post(INDUSTRIES_API, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      navigate('/admin/industries');
    } catch (error) {
      console.error('Failed to save industry', error);
      alert(error.response?.data?.message || 'Failed to save industry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        {isEditMode ? 'Edit Industry' : 'Add New Industry'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Industry Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">URL Slug</label>
            <input
              type="text"
              name="slug"
              required
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Short Description</label>
          <textarea
            name="desc"
            required
            rows="3"
            value={formData.desc}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-gray-700">Related Products</label>
            <button 
              type="button" 
              onClick={handleSelectAll}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded transition-colors"
            >
              {formData.relatedProducts && formData.relatedProducts.split(',').filter(Boolean).length === allProducts.length && allProducts.length > 0 
                ? 'Deselect All' 
                : 'Select All'}
            </button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg max-h-[300px] overflow-y-auto bg-gray-50">
            {allProducts.length === 0 ? (
              <p className="text-sm text-gray-500">Loading products...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {allProducts.map(product => {
                  const isChecked = formData.relatedProducts.includes(product.name);
                  return (
                    <label key={product._id} className="flex items-center space-x-3 bg-white p-2 border border-gray-100 rounded shadow-sm cursor-pointer hover:bg-blue-50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={() => handleProductToggle(product.name)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 font-medium truncate">{product.name}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Industry Cover Image</label>
          {existingImage && (
            <div className="mb-4">
              <img src={existingImage} alt="Current" className="w-32 h-32 object-cover rounded-lg border border-gray-200" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={!isEditMode && !existingImage}
            className="w-full"
          />
        </div>

        <div className="pt-6 border-t border-gray-100 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Industry'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/industries')}
            className="px-6 py-2 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
