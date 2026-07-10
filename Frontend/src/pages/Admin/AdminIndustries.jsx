import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { INDUSTRIES_API } from '../../utils/api';

export default function AdminIndustries() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const { data } = await axiosInstance.get(INDUSTRIES_API);
      setIndustries(data);
    } catch (error) {
      console.error('Failed to fetch industries', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this industry?')) {
      try {
        await axiosInstance.delete(`${INDUSTRIES_API}/${id}`);
        fetchIndustries();
      } catch (error) {
        console.error('Failed to delete industry', error);
      }
    }
  };

  const filteredIndustries = industries.filter(ind => 
    ind.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Industries</h1>
          <p className="text-gray-500 mt-1">Manage all your industries here</p>
        </div>
        <Link 
          to="/admin/industries/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center font-bold"
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Industry
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search industries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-700">Image</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700">Name</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700">Slug</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredIndustries.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No industries found.</td>
                </tr>
              ) : (
                filteredIndustries.map((industry) => (
                  <tr key={industry._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img 
                        src={industry.image} 
                        alt={industry.name} 
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">{industry.name}</td>
                    <td className="px-6 py-4 text-gray-500">{industry.slug}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button 
                          onClick={() => navigate(`/admin/industries/edit/${industry._id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(industry._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
