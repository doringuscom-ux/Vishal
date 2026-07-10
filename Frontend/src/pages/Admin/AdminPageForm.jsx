import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { PAGES_API } from '../../utils/api';

export default function AdminPageForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    metaCanonical: '',
    metaRobots: 'index, follow',
    customText: ''
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchPage();
    }
  }, [id]);

  const fetchPage = async () => {
    try {
      // For editing, we might need an endpoint to get by ID, but we only have get by slug in public.
      // Wait, let's just fetch all pages and find it, or we can add get by ID in the backend. 
      // Since it's admin, fetching all is fine for now if we didn't make a get by ID route.
      const { data } = await axiosInstance.get(PAGES_API);
      const page = data.find(p => p._id === id);
      if (page) {
        setFormData({
          title: page.title || '',
          slug: page.slug || '',
          metaTitle: page.metaTitle || '',
          metaDescription: page.metaDescription || '',
          metaKeywords: page.metaKeywords || '',
          metaCanonical: page.metaCanonical || '',
          metaRobots: page.metaRobots || 'index, follow',
          customText: page.customText || ''
        });
      }
    } catch (err) {
      console.error('Failed to fetch page', err);
      setError('Failed to fetch page data');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await axiosInstance.put(`${PAGES_API}/${id}`, formData);
      } else {
        await axiosInstance.post(PAGES_API, formData);
      }
      navigate('/admin/pages');
    } catch (err) {
      console.error('Failed to save page', err);
      setError(err.response?.data?.message || 'Failed to save page');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Link to="/admin/pages" className="mr-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Page' : 'Create Page'}</h1>
          <p className="text-gray-500 text-sm mt-1">Configure URL and SEO metadata for dynamic landing pages</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Basic Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Basic Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Page Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Conveyor Rollers in Delhi"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <span className="bg-gray-50 border border-r-0 border-gray-200 text-gray-500 px-3 py-2 rounded-l-lg text-sm">
                  /city/
                </span>
                <input
                  type="text"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="e.g., delhi"
                  className="w-full px-4 py-2 border border-gray-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Use lowercase letters and hyphens only.</p>
            </div>
          </div>
        </div>

        {/* Custom Text Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Page Content</h2>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Custom Detail / Text</label>
            <textarea
              name="customText"
              rows="3"
              value={formData.customText}
              onChange={handleChange}
              placeholder="e.g., We are the leading providers of industrial metal solutions in Delhi..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            ></textarea>
            <p className="text-xs text-gray-400 mt-1">This text will be displayed prominently on the specific city's landing page to make it unique.</p>
          </div>
        </div>

        {/* SEO Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">SEO Metadata (Optional)</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                placeholder="e.g., Buy Conveyor Rollers in Delhi | Vishal Industries"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Meta Description</label>
              <textarea
                name="metaDescription"
                rows="2"
                value={formData.metaDescription}
                onChange={handleChange}
                placeholder="Top manufacturer of Conveyor Rollers in Delhi. We supply premium industrial rollers for heavy duty applications."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Meta Keywords</label>
              <input
                type="text"
                name="metaKeywords"
                value={formData.metaKeywords}
                onChange={handleChange}
                placeholder="conveyor rollers delhi, drum pulleys, industrial manufacturing"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Canonical URL</label>
                <input
                  type="text"
                  name="metaCanonical"
                  value={formData.metaCanonical}
                  onChange={handleChange}
                  placeholder="e.g., https://vishalindustries.com/city/delhi"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Robots Tag</label>
                <select
                  name="metaRobots"
                  value={formData.metaRobots}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                >
                  <option value="index, follow">index, follow (Default)</option>
                  <option value="noindex, nofollow">noindex, nofollow (Hide from Search Engines)</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, follow">noindex, follow</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            to="/admin/pages"
            className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : (
              <>
                <Save className="w-4 h-4 mr-2" /> Save Page
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
