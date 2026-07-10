const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect } = require('../middlewares/auth');
const { upload } = require('../middlewares/multer');
const { uploadOnCloudinary } = require('../utils/cloudinary');

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Private/Admin
router.post('/', protect, upload.array('imageFiles', 10), async (req, res) => {
  try {
    const { name, slug, use, features, applications, category, imageOrder } = req.body;
    
    let uploadedUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResult = await uploadOnCloudinary(file.path);
        if (uploadResult) {
          uploadedUrls.push(uploadResult.url);
        }
      }
    }

    let finalImages = [];
    if (imageOrder) {
      const orderMap = JSON.parse(imageOrder);
      for (const item of orderMap) {
        if (item.startsWith('FILE_')) {
          const idx = parseInt(item.split('_')[1], 10);
          if (uploadedUrls[idx]) finalImages.push(uploadedUrls[idx]);
        } else {
          finalImages.push(item);
        }
      }
    } else {
      // Fallback
      finalImages = [...uploadedUrls];
    }

    if (finalImages.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    const newProduct = new Product({
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      use,
      applications,
      category,
      features: features ? JSON.parse(features) : [],
      images: finalImages
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/products/:idOrSlug
// @desc    Get single product by ID or Slug
// @access  Public
router.get('/:idOrSlug', async (req, res) => {
  try {
    const param = req.params.idOrSlug;
    let product;
    
    // Check if it's a valid MongoDB ObjectId
    if (param.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(param);
    }
    
    // If not found by ID or not a valid ID, try finding by slug
    if (!product) {
      product = await Product.findOne({ slug: param });
    }

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/:id', protect, upload.array('imageFiles', 10), async (req, res) => {
  try {
    const { name, slug, use, features, applications, category, imageOrder } = req.body;
    
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      if (slug) product.slug = slug;
      product.use = use || product.use;
      product.applications = applications || product.applications;
      product.category = category || product.category;
      
      if (features) {
        product.features = JSON.parse(features);
      }

      let uploadedUrls = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const uploadResult = await uploadOnCloudinary(file.path);
          if (uploadResult) {
            uploadedUrls.push(uploadResult.url);
          }
        }
      }

      let finalImages = [];
      if (imageOrder) {
        const orderMap = JSON.parse(imageOrder);
        for (const item of orderMap) {
          if (item.startsWith('FILE_')) {
            const idx = parseInt(item.split('_')[1], 10);
            if (uploadedUrls[idx]) finalImages.push(uploadedUrls[idx]);
          } else {
            finalImages.push(item);
          }
        }
        if (finalImages.length > 0) {
          product.images = finalImages;
        }
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/products/:id/seo
// @desc    Update a product's SEO metadata
// @access  Private/Admin
router.put('/:id/seo', protect, async (req, res) => {
  try {
    const { metaTitle, metaDescription, metaKeywords, metaCanonical, metaRobots } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      if (metaTitle !== undefined) product.metaTitle = metaTitle;
      if (metaDescription !== undefined) product.metaDescription = metaDescription;
      if (metaKeywords !== undefined) product.metaKeywords = metaKeywords;
      if (metaCanonical !== undefined) product.metaCanonical = metaCanonical;
      if (metaRobots !== undefined) product.metaRobots = metaRobots;
      
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
