const express = require('express');
const router = express.Router();
const StaticSeo = require('../models/StaticSeo');
const { protect } = require('../middlewares/auth');

// @route   GET /api/static-seo
// @desc    Get all static SEO entries
// @access  Public
router.get('/', async (req, res) => {
  try {
    let entries = await StaticSeo.find({});
    
    // Auto-seed default pages if the collection is completely empty
    if (entries.length === 0) {
      const defaultPages = [
        { path: '/', title: 'Home Page' },
        { path: '/products', title: 'Products Page' },
        { path: '/industries', title: 'Industries Page' },
        { path: '/contact', title: 'Contact Page' },
        { path: '/gallery', title: 'Gallery Page' }
      ];
      entries = await StaticSeo.insertMany(defaultPages);
    }

    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/static-seo
// @desc    Create a new static SEO entry
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
  try {
    const { path, title } = req.body;
    
    // Ensure path starts with /
    const formattedPath = path.startsWith('/') ? path : `/${path}`;

    const existing = await StaticSeo.findOne({ path: formattedPath });
    if (existing) {
      return res.status(400).json({ message: 'SEO entry for this path already exists' });
    }

    const newEntry = new StaticSeo({
      path: formattedPath,
      title
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/static-seo/:id/seo
// @desc    Update a static page's SEO metadata
// @access  Private/Admin
router.put('/:id/seo', protect, async (req, res) => {
  try {
    const { metaTitle, metaDescription, metaKeywords, metaCanonical, metaRobots } = req.body;
    const entry = await StaticSeo.findById(req.params.id);

    if (entry) {
      if (metaTitle !== undefined) entry.metaTitle = metaTitle;
      if (metaDescription !== undefined) entry.metaDescription = metaDescription;
      if (metaKeywords !== undefined) entry.metaKeywords = metaKeywords;
      if (metaCanonical !== undefined) entry.metaCanonical = metaCanonical;
      if (metaRobots !== undefined) entry.metaRobots = metaRobots;
      
      const updatedEntry = await entry.save();
      res.json(updatedEntry);
    } else {
      res.status(404).json({ message: 'Entry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/static-seo/:id
// @desc    Delete a static SEO entry
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const entry = await StaticSeo.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
