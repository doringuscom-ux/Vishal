const express = require('express');
const router = express.Router();
const Industry = require('../models/Industry');
const { protect } = require('../middlewares/auth');
const { upload } = require('../middlewares/multer');
const { uploadOnCloudinary } = require('../utils/cloudinary');

// @route   GET /api/industries
// @desc    Get all industries
// @access  Public
router.get('/', async (req, res) => {
  try {
    const industries = await Industry.find({});
    res.json(industries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/industries/:slug
// @desc    Get single industry by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const industry = await Industry.findOne({ slug: req.params.slug });
    if (industry) {
      res.json(industry);
    } else {
      res.status(404).json({ message: 'Industry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/industries
// @desc    Create a new industry
// @access  Private/Admin
router.post('/', protect, upload.single('imageFile'), async (req, res) => {
  try {
    const { name, slug, desc, relatedProducts, imageUrl } = req.body;
    
    let finalImageUrl = imageUrl;
    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      if (uploadResult) {
        finalImageUrl = uploadResult.url;
      }
    }

    if (!finalImageUrl) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const newIndustry = new Industry({
      name,
      slug,
      desc,
      image: finalImageUrl,
      relatedProducts
    });

    const savedIndustry = await newIndustry.save();
    res.status(201).json(savedIndustry);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/industries/:id
// @desc    Update an industry
// @access  Private/Admin
router.put('/:id', protect, upload.single('imageFile'), async (req, res) => {
  try {
    const { name, slug, desc, relatedProducts, imageUrl } = req.body;
    
    const industry = await Industry.findById(req.params.id);
    if (!industry) {
      return res.status(404).json({ message: 'Industry not found' });
    }

    industry.name = name || industry.name;
    industry.slug = slug || industry.slug;
    industry.desc = desc || industry.desc;
    industry.relatedProducts = relatedProducts || industry.relatedProducts;

    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      if (uploadResult) {
        industry.image = uploadResult.url;
      }
    } else if (imageUrl) {
      industry.image = imageUrl;
    }

    const updatedIndustry = await industry.save();
    res.json(updatedIndustry);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/industries/:id
// @desc    Delete an industry
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);
    if (industry) {
      await industry.deleteOne();
      res.json({ message: 'Industry removed' });
    } else {
      res.status(404).json({ message: 'Industry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/industries/:id/seo
// @desc    Update industry SEO metadata
// @access  Private/Admin
router.put('/:id/seo', protect, async (req, res) => {
  try {
    const { metaTitle, metaDescription, metaKeywords, metaCanonical, metaRobots } = req.body;
    const industry = await Industry.findById(req.params.id);

    if (industry) {
      if (metaTitle !== undefined) industry.metaTitle = metaTitle;
      if (metaDescription !== undefined) industry.metaDescription = metaDescription;
      if (metaKeywords !== undefined) industry.metaKeywords = metaKeywords;
      if (metaCanonical !== undefined) industry.metaCanonical = metaCanonical;
      if (metaRobots !== undefined) industry.metaRobots = metaRobots;
      
      const updatedIndustry = await industry.save();
      res.json(updatedIndustry);
    } else {
      res.status(404).json({ message: 'Industry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
