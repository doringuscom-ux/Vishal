import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { PRODUCTS_API } from '../../utils/api';
import { industries } from '../../data/industries';
import { Trash2, Plus, Link as LinkIcon, Upload, ImageIcon, ArrowUp, ArrowDown, Star } from 'lucide-react';

const AdminProductForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    use: '',
    features: '',
    category: ''
  });
  
  const [selectedApps, setSelectedApps] = useState([]);
  
  // Unified image list
  // item: { id: string, type: 'existing' | 'file' | 'link', url: string, file: File|null, preview: string }
  const [imageList, setImageList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const { data } = await axiosInstance.get(`${PRODUCTS_API}/${id}`);
          setFormData({
            name: data.name,
            slug: data.slug || '',
            use: data.use,
            features: data.features.join(', '),
            category: data.category
          });
          
          if (data.applications) {
            setSelectedApps(data.applications.split(',').map(app => app.trim()));
          }
          
          if (data.images && data.images.length > 0) {
            const existing = data.images.map(img => ({
              id: Date.now() + Math.random().toString(),
              type: 'existing',
              url: img,
              preview: img
            }));
            setImageList(existing);
          }
        } catch (err) {
          setError('Failed to fetch product data');
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from name if creating new
      ...(name === 'name' && !isEditMode && { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') })
    }));
  };

  const handleAppToggle = (appName) => {
    if (selectedApps.includes(appName)) {
      setSelectedApps(selectedApps.filter(app => app !== appName));
    } else {
      setSelectedApps([...selectedApps, appName]);
    }
  };

  // Image Management
  const addImageField = (type) => {
    setImageList([...imageList, { 
      id: Date.now() + Math.random().toString(), 
      type, 
      url: '', 
      file: null, 
      preview: '' 
    }]);
  };

  const updateImageField = (id, field, value) => {
    setImageList(imageList.map(img => {
      if (img.id === id) {
        let updated = { ...img, [field]: value };
        if (field === 'file' && value) {
          updated.preview = URL.createObjectURL(value);
        } else if (field === 'url') {
          updated.preview = value;
        }
        return updated;
      }
      return img;
    }));
  };

  const removeImage = (id) => {
    setImageList(imageList.filter(img => img.id !== id));
  };

  const moveImage = (index, direction) => {
    if (direction === 'up' && index > 0) {
      const newArray = [...imageList];
      [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
      setImageList(newArray);
    } else if (direction === 'down' && index < imageList.length - 1) {
      const newArray = [...imageList];
      [newArray[index], newArray[index + 1]] = [newArray[index + 1], newArray[index]];
      setImageList(newArray);
    }
  };

  const makeFeatured = (index) => {
    if (index === 0) return;
    const newArray = [...imageList];
    const item = newArray.splice(index, 1)[0];
    newArray.unshift(item);
    setImageList(newArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (selectedApps.length === 0) {
      setError('Please select at least one application');
      setLoading(false);
      return;
    }

    const validImages = imageList.filter(img => 
      img.type === 'existing' || 
      (img.type === 'link' && img.url.trim() !== '') || 
      (img.type === 'file' && img.file)
    );

    if (validImages.length === 0) {
      setError('Please provide at least one valid image (upload or link).');
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('slug', formData.slug);
      data.append('use', formData.use);
      data.append('category', formData.category);
      data.append('applications', selectedApps.join(', '));
      
      const featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f);
      data.append('features', JSON.stringify(featuresArray));

      let fileCounter = 0;
      const imageOrder = validImages.map(img => {
        if (img.type === 'existing' || img.type === 'link') {
          return img.url.trim();
        } else if (img.type === 'file') {
          data.append('imageFiles', img.file);
          const orderStr = `FILE_${fileCounter}`;
          fileCounter++;
          return orderStr;
        }
      });

      data.append('imageOrder', JSON.stringify(imageOrder));

      if (isEditMode) {
        await axiosInstance.put(`${PRODUCTS_API}/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axiosInstance.post(PRODUCTS_API, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save product');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Product Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">URL Slug</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} required className="w-full border p-2 rounded bg-gray-50" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} required className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Use / Description</label>
              <textarea name="use" value={formData.use} onChange={handleChange} required className="w-full border p-2 rounded" rows="3"></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Features (comma separated)</label>
              <textarea name="features" value={formData.features} onChange={handleChange} placeholder="e.g. Durable, Lightweight, Rust-proof" className="w-full border p-2 rounded" rows="3"></textarea>
            </div>

            <div className="bg-gray-50 p-4 rounded border mt-4">
              <label className="block text-gray-700 font-medium mb-3">Applications (Select Industries)</label>
              <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2">
                {industries.map((ind) => (
                  <label key={ind.slug} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer border bg-white">
                    <input 
                      type="checkbox" 
                      checked={selectedApps.includes(ind.name)}
                      onChange={() => handleAppToggle(ind.name)}
                      className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{ind.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center"><ImageIcon className="mr-2" size={20}/> Product Images</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">Reorder images using the arrows. The first image (marked with a star) is your Featured Image.</p>

            <div className="space-y-3 mb-6">
              {imageList.map((img, idx) => (
                <div key={img.id} className={`flex items-center gap-3 bg-white p-3 rounded border shadow-sm ${idx === 0 ? 'border-yellow-400 border-2' : ''}`}>
                  
                  {/* Controls */}
                  <div className="flex flex-col gap-1 items-center justify-center">
                    <button type="button" onClick={() => moveImage(idx, 'up')} disabled={idx === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30">
                      <ArrowUp size={16} />
                    </button>
                    <button type="button" onClick={() => moveImage(idx, 'down')} disabled={idx === imageList.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30">
                      <ArrowDown size={16} />
                    </button>
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="h-12 w-12 bg-gray-100 rounded border overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                    {img.preview ? <img src={img.preview} alt="preview" className="h-full w-full object-cover" onError={(e) => e.target.style.display='none'} /> : <ImageIcon size={20} className="text-gray-400" />}
                    {idx === 0 && <Star size={12} className="absolute top-1 right-1 text-yellow-500 fill-yellow-500" />}
                  </div>

                  {/* Input Fields */}
                  <div className="flex-grow">
                    {img.type === 'existing' && (
                      <div className="text-sm text-gray-600 truncate max-w-[200px]" title={img.url}>Existing: {img.url.substring(0, 30)}...</div>
                    )}
                    {img.type === 'file' && (
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => updateImageField(img.id, 'file', e.target.files[0])} 
                        className="w-full text-sm"
                      />
                    )}
                    {img.type === 'link' && (
                      <input 
                        type="url" 
                        value={img.url}
                        placeholder="https://example.com/image.jpg"
                        onChange={(e) => updateImageField(img.id, 'url', e.target.value)} 
                        className="w-full border p-1 rounded text-sm"
                      />
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 items-center">
                    <button type="button" title="Make Featured" onClick={() => makeFeatured(idx)} className={`text-yellow-500 hover:text-yellow-600 ${idx === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <Star size={16} className={idx === 0 ? "fill-yellow-500" : ""} />
                    </button>
                    <button type="button" title="Remove" onClick={() => removeImage(img.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              {imageList.length === 0 && <div className="text-center p-4 text-gray-500 border border-dashed rounded">No images added yet.</div>}
            </div>

            {/* Add Image Buttons */}
            <div className="flex gap-3 mt-4">
              <button 
                type="button" 
                onClick={() => addImageField('file')}
                className="flex items-center text-sm bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200"
              >
                <Upload size={16} className="mr-1" /> Upload Image
              </button>
              <button 
                type="button" 
                onClick={() => addImageField('link')}
                className="flex items-center text-sm bg-purple-100 text-purple-700 px-3 py-2 rounded hover:bg-purple-200"
              >
                <LinkIcon size={16} className="mr-1" /> Add Link
              </button>
            </div>

          </div>
        </div>

        <div className="pt-4 flex gap-4 border-t">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 disabled:opacity-50 font-medium w-full md:w-auto">
            {loading ? 'Saving...' : 'Save Product'}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')} className="bg-gray-300 text-gray-800 px-8 py-3 rounded hover:bg-gray-400 font-medium w-full md:w-auto">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
