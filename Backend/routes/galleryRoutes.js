const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { protect } = require('../middlewares/auth');
const { upload } = require('../middlewares/multer');
const { uploadOnCloudinary } = require('../utils/cloudinary');

// @route   GET /api/gallery
// @desc    Get all gallery items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await Gallery.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching gallery items:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/gallery
// @desc    Create a new gallery item
// @access  Private/Admin
router.post('/', protect, upload.single('imageFile'), async (req, res) => {
  try {
    const { title, category, size, imageUrl } = req.body;
    let finalImageUrl = '';

    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (cloudinaryResponse) {
        finalImageUrl = cloudinaryResponse.secure_url;
      } else {
        return res.status(400).json({ message: 'Error uploading image to Cloudinary' });
      }
    } else if (imageUrl) {
      finalImageUrl = imageUrl;
    } else {
      return res.status(400).json({ message: 'Please provide either an image file or a URL' });
    }

    const newGalleryItem = await Gallery.create({
      title,
      category,
      src: finalImageUrl,
      size: size || 'small'
    });

    res.status(201).json(newGalleryItem);
  } catch (error) {
    console.error('Error creating gallery item:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/gallery/:id
// @desc    Update a gallery item
// @access  Private/Admin
router.put('/:id', protect, upload.single('imageFile'), async (req, res) => {
  try {
    const { title, category, imageUrl } = req.body;
    let item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    let finalImageUrl = item.src; // Default to existing image

    // If new file uploaded
    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (cloudinaryResponse) {
        finalImageUrl = cloudinaryResponse.secure_url;
      } else {
        return res.status(400).json({ message: 'Error uploading image to Cloudinary' });
      }
    } else if (imageUrl) {
      // If new URL provided
      finalImageUrl = imageUrl;
    }

    item.title = title || item.title;
    item.category = category || item.category;
    item.src = finalImageUrl;

    await item.save();
    res.json(item);
  } catch (error) {
    console.error('Error updating gallery item:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete a gallery item
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    await item.deleteOne();
    res.json({ message: 'Gallery item removed' });
  } catch (error) {
    console.error('Error deleting gallery item:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
