import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { BLOGS_API } from '../../utils/api';
import { Trash2, Upload, Link as LinkIcon, ImageIcon, X } from 'lucide-react';
import JoditEditor from 'jodit-react';

const AdminBlogForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const editorRef = useRef(null);

  const editorConfig = useMemo(() => ({
    readonly: false,
    height: 450,
    placeholder: 'Write your blog content here...',
    toolbarAdaptive: false,
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', '|',
      'font', 'fontsize', 'paragraph', '|',
      'align', '|',
      'brush', '|',
      'undo', 'redo', '|',
      'link', 'image', '|',
      'source', 'fullsize'
    ],
    uploader: {
      insertImageAsBase64URI: true
    },
    removeButtons: ['about'],
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
  }), []);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    author: 'Vishal Industries',
    isPublished: true
  });


  // Cover image state
  const [coverImageType, setCoverImageType] = useState('none'); // 'none' | 'existing' | 'file' | 'link'
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverImagePreview, setCoverImagePreview] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categoryOptions = [
    'Industry News',
    'Product Update',
    'Tips & Guides',
    'Company News',
    'Case Study',
    'Technology',
    'General'
  ];

  useEffect(() => {
    if (isEditMode) {
      const fetchBlog = async () => {
        try {
          const { data } = await axiosInstance.get(`${BLOGS_API}/${id}`);
          setFormData({
            title: data.title,
            slug: data.slug || '',
            excerpt: data.excerpt || '',
            content: data.content || '',
            category: data.category || '',
            author: data.author || 'Vishal Industries',
            isPublished: data.isPublished !== false
          });


          if (data.coverImage) {
            setCoverImageType('existing');
            setCoverImageUrl(data.coverImage);
            setCoverImagePreview(data.coverImage);
          }
        } catch (err) {
          setError('Failed to fetch blog data');
        }
      };
      fetchBlog();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Auto-generate slug from title if creating new
      ...(name === 'title' && !isEditMode && { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') })
    }));
  };


  // Cover image handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      setCoverImageType('file');
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUrlChange = (url) => {
    setCoverImageUrl(url);
    setCoverImageType('link');
    setCoverImagePreview(url);
  };

  const removeCoverImage = () => {
    setCoverImageType('none');
    setCoverImageFile(null);
    setCoverImageUrl('');
    setCoverImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('slug', formData.slug);
      data.append('excerpt', formData.excerpt);
      data.append('content', formData.content);
      data.append('category', formData.category);
      data.append('author', formData.author);
      data.append('isPublished', formData.isPublished);

      // Handle cover image
      if (coverImageType === 'file' && coverImageFile) {
        data.append('coverImageFile', coverImageFile);
      } else if (coverImageType === 'link' || coverImageType === 'existing') {
        data.append('coverImageUrl', coverImageUrl);
      } else {
        data.append('coverImageUrl', '');
      }

      if (isEditMode) {
        await axiosInstance.put(`${BLOGS_API}/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axiosInstance.post(BLOGS_API, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      navigate('/admin/blogs');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save blog');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit Blog' : 'Add New Blog'}</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Blog Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Enter blog title" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">URL Slug</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} required className="w-full border p-2 rounded bg-gray-50" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Excerpt / Summary</label>
              <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} className="w-full border p-2 rounded" rows="2" placeholder="Short summary for blog card..."></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Article Content</label>
              <JoditEditor
                ref={editorRef}
                value={formData.content}
                config={editorConfig}
                onBlur={(newContent) => setFormData(prev => ({ ...prev, content: newContent }))}
              />
            </div>
          </div>

          {/* Right Column - Settings & Image */}
          <div className="space-y-6">
            
            {/* Publish Settings */}
            <div className="bg-gray-50 p-4 rounded border">
              <h3 className="font-bold text-gray-700 mb-3">Settings</h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded">
                  <option value="">Select Category</option>
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Author</label>
                <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>

              <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded">
                <input 
                  type="checkbox" 
                  name="isPublished" 
                  checked={formData.isPublished} 
                  onChange={handleChange} 
                  className="form-checkbox h-5 w-5 text-blue-600 rounded"
                />
                <span className="font-medium text-gray-700">Published</span>
              </label>
            </div>


            {/* Cover Image */}
            <div className="bg-gray-50 p-4 rounded border">
              <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <ImageIcon size={18} /> Cover Image
              </h3>

              {/* Preview */}
              {coverImagePreview && (
                <div className="relative mb-3 rounded overflow-hidden border">
                  <img src={coverImagePreview} alt="Cover preview" className="w-full h-40 object-cover" onError={(e) => e.target.style.display='none'} />
                  <button type="button" onClick={removeCoverImage} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                    <Trash2 size={14} />
                  </button>
                </div>
              )}

              {/* Upload Options */}
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-gray-600 font-medium mb-1 block">Upload Image</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="w-full text-sm"
                  />
                </div>
                <div className="text-center text-gray-400 text-xs font-bold">— OR —</div>
                <div>
                  <label className="text-sm text-gray-600 font-medium mb-1 block">Image URL</label>
                  <input 
                    type="url" 
                    value={coverImageType === 'link' || coverImageType === 'existing' ? coverImageUrl : ''}
                    placeholder="https://example.com/image.jpg"
                    onChange={(e) => handleUrlChange(e.target.value)} 
                    className="w-full border p-2 rounded text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex gap-4 border-t">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 disabled:opacity-50 font-medium w-full md:w-auto">
            {loading ? 'Saving...' : (isEditMode ? 'Update Blog' : 'Publish Blog')}
          </button>
          <button type="button" onClick={() => navigate('/admin/blogs')} className="bg-gray-300 text-gray-800 px-8 py-3 rounded hover:bg-gray-400 font-medium w-full md:w-auto">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogForm;
