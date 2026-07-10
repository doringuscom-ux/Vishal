import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Upload, Plus, Image as ImageIcon, Link as LinkIcon, X, Edit3 } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { GALLERY_API } from '../../utils/api';

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Upload Form State
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  
  // Image State
  const [imageType, setImageType] = useState('file'); // 'file' or 'url'
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(GALLERY_API);
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch gallery', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearForm = () => {
    setTitle('');
    setCategory('');
    setImageFile(null);
    setImageUrl('');
    setImagePreview('');
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setTitle(item.title);
    setCategory(item.category);
    setImageType('url');
    setImageUrl(item.src);
    setImagePreview(item.src);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !category || (!imageFile && !imageUrl)) {
      alert("Please fill all required fields and provide an image.");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      
      if (imageType === 'file' && imageFile) {
        formData.append('imageFile', imageFile);
      } else if (imageType === 'url' && imageUrl) {
        formData.append('imageUrl', imageUrl);
      }

      if (editingId) {
        await axiosInstance.put(`${GALLERY_API}/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axiosInstance.post(GALLERY_API, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      
      clearForm();
      fetchGallery();
    } catch (error) {
      console.error('Upload failed', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    
    try {
      await axiosInstance.delete(`${GALLERY_API}/${id}`);
      fetchGallery();
    } catch (error) {
      console.error('Failed to delete', error);
      alert('Failed to delete image');
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
        <p className="text-gray-500 mt-1">Upload and manage images for the public visual gallery.</p>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          {editingId ? <Edit3 className="w-5 h-5 text-blue-600" /> : <Upload className="w-5 h-5 text-blue-600" />}
          {editingId ? 'Update Image' : 'Upload New Image'}
        </h2>
        
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image Title</label>
              <input 
                type="text" 
                required 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                placeholder="e.g., Premium Fasteners"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input 
                type="text" 
                required 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                placeholder="e.g., Products"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image Source</label>
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => setImageType('file')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${imageType === 'file' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <ImageIcon className="w-4 h-4" /> Upload File
              </button>
              <button
                type="button"
                onClick={() => setImageType('url')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${imageType === 'url' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <LinkIcon className="w-4 h-4" /> Image URL
              </button>
            </div>

            {imageType === 'file' ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                  id="gallery-image-upload"
                />
                <label htmlFor="gallery-image-upload" className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium text-sm block">
                  {imageFile ? imageFile.name : 'Click to select a file'}
                </label>
              </div>
            ) : (
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImagePreview(e.target.value);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                placeholder="https://example.com/image.jpg"
              />
            )}

            {imagePreview && (
              <div className="mt-4 relative inline-block">
                <img src={imagePreview} alt="Preview" className="h-24 w-auto rounded border border-gray-200 object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview('');
                    setImageFile(null);
                    setImageUrl('');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end pt-4 border-t border-gray-100 gap-3">
            {editingId && (
              <button
                type="button"
                onClick={clearForm}
                className="px-6 py-2 rounded-lg font-bold text-gray-600 bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isUploading || (!imageFile && !imageUrl)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUploading ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> {editingId ? 'Updating...' : 'Uploading...'}</>
              ) : (
                <>{editingId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />} {editingId ? 'Update Image' : 'Add to Gallery'}</>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <span className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map(item => (
            <div key={item._id} className="group relative rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square">
                <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm text-gray-900 truncate" title={item.title}>{item.title}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500 uppercase">{item.category}</span>
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{item.size}</span>
                </div>
              </div>
              
              {/* Action Overlay */}
              <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                <button 
                  onClick={() => handleEditClick(item)}
                  className="bg-blue-500 text-white p-1.5 rounded hover:bg-blue-600 shadow-sm transition-colors"
                  title="Edit Image"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white p-1.5 rounded hover:bg-red-600 shadow-sm transition-colors"
                  title="Delete Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No images found in the gallery. Upload one above.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
