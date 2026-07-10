const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const { protect } = require('./adminRoutes'); // Assuming protect middleware is exported from adminRoutes or a separate auth file

// GET all pages (Public or Admin)
router.get('/', async (req, res) => {
  try {
    const pages = await Page.find().sort({ createdAt: -1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET single page by slug (Public)
router.get('/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST create new page (Admin only)
router.post('/', async (req, res) => {
  try {
    const { title, slug, metaTitle, metaDescription, metaKeywords, metaCanonical, metaRobots, customText } = req.body;
    
    // Check if slug already exists
    const existing = await Page.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: 'A page with this URL/slug already exists' });
    }

    const newPage = new Page({
      title,
      slug: slug.toLowerCase().replace(/\s+/g, '-'),
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
      metaRobots,
      customText
    });

    const savedPage = await newPage.save();
    res.status(201).json(savedPage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// PUT update page (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const updatedPage = await Page.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedPage) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(updatedPage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE page (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/pages/:id/seo
// @desc    Update a page's SEO metadata
// @access  Private/Admin
router.put('/:id/seo', async (req, res) => {
  try {
    const { metaTitle, metaDescription, metaKeywords, metaCanonical, metaRobots } = req.body;
    const page = await Page.findById(req.params.id);

    if (page) {
      if (metaTitle !== undefined) page.metaTitle = metaTitle;
      if (metaDescription !== undefined) page.metaDescription = metaDescription;
      if (metaKeywords !== undefined) page.metaKeywords = metaKeywords;
      if (metaCanonical !== undefined) page.metaCanonical = metaCanonical;
      if (metaRobots !== undefined) page.metaRobots = metaRobots;
      
      const updatedPage = await page.save();
      res.json(updatedPage);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
