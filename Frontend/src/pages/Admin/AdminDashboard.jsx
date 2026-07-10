import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Factory, 
  FileText, 
  Image as ImageIcon, 
  Mail, 
  ArrowRight,
  TrendingUp,
  Clock,
  Plus
} from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { ADMIN_STATS_API } from '../../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await axiosInstance.get(ADMIN_STATS_API);
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, link }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className={`absolute right-0 top-0 w-24 h-24 -mt-6 -mr-6 rounded-full opacity-10 ${color}`}></div>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-black text-gray-900">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-current`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {link && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link to={link} className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            View Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" /> Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="New Leads" 
          value={stats?.counts?.leads?.new || 0} 
          icon={Mail} 
          color="bg-red-500 text-red-600" 
          link="/admin/contacts"
        />
        <StatCard 
          title="Total Products" 
          value={stats?.counts?.products || 0} 
          icon={Package} 
          color="bg-blue-500 text-blue-600" 
          link="/admin/products"
        />
        <StatCard 
          title="Total Blogs" 
          value={stats?.counts?.blogs || 0} 
          icon={FileText} 
          color="bg-indigo-500 text-indigo-600" 
          link="/admin/blogs"
        />
        <StatCard 
          title="Gallery Images" 
          value={stats?.counts?.gallery || 0} 
          icon={ImageIcon} 
          color="bg-emerald-500 text-emerald-600" 
          link="/admin/gallery"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Leads Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" /> Recent Contact Inquiries
              </h2>
              <Link to="/admin/contacts" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                View All
              </Link>
            </div>
            
            <div className="divide-y divide-gray-100">
              {stats?.recentLeads?.length > 0 ? (
                stats.recentLeads.map((lead) => (
                  <div key={lead._id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{lead.firstName} {lead.lastName}</span>
                        {lead.status === 'new' && (
                          <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider">New</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-[300px] md:max-w-md">
                        {lead.message}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 font-medium whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Mail className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                  <p>No recent inquiries.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-5 space-y-3">
              <Link to="/admin/blogs/new" className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-blue-700">Write New Blog</span>
                </div>
                <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              </Link>
              
              <Link to="/admin/gallery" className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-blue-700">Upload to Gallery</span>
                </div>
                <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              </Link>

              <Link to="/admin/products" className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-blue-700">Manage Products</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              </Link>

              <Link to="/admin/seo" className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-blue-700">Update SEO Tags</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
