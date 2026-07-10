const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Product = require('../models/Product');
const Industry = require('../models/Industry');
const Blog = require('../models/Blog');
const Gallery = require('../models/Gallery');
const Contact = require('../models/Contact');
const Page = require('../models/Page');
const jwt = require('jsonwebtoken');
const { protect } = require('../middlewares/auth');

// Generate Access Token (15 minutes)
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
};

// Generate Refresh Token (3 days)
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
};

// @desc    Auth admin & get tokens
// @route   POST /api/admin/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateAccessToken(admin._id),
        refreshToken: generateRefreshToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get new access token using refresh token
// @route   POST /api/admin/refresh
// @access  Public
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Refresh token expired or invalid' });
      }
      
      const newAccessToken = generateAccessToken(decoded.id);
      res.json({ token: newAccessToken });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/dashboard-stats
// @access  Private
router.get('/dashboard-stats', protect, async (req, res) => {
  try {
    const [
      productsCount,
      industriesCount,
      blogsCount,
      galleryCount,
      pagesCount,
      totalLeadsCount,
      newLeadsCount,
      recentLeads
    ] = await Promise.all([
      Product.countDocuments(),
      Industry.countDocuments(),
      Blog.countDocuments(),
      Gallery.countDocuments(),
      Page.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Contact.find().sort({ createdAt: -1 }).limit(5)
    ]);

    res.json({
      counts: {
        products: productsCount,
        industries: industriesCount,
        blogs: blogsCount,
        gallery: galleryCount,
        pages: pagesCount,
        leads: {
          total: totalLeadsCount,
          new: newLeadsCount
        }
      },
      recentLeads
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
