const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect } = require('../middlewares/auth');
const { upload } = require('../middlewares/multer');
const { uploadOnCloudinary } = require('../utils/cloudinary');

// @route   GET /api/blogs
// @desc    Get all blogs (published only for public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { all } = req.query;
    const filter = all === 'true' ? {} : { isPublished: true };
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blogs/:idOrSlug
// @desc    Get single blog by ID or Slug
// @access  Public
router.get('/:idOrSlug', async (req, res) => {
  try {
    const param = req.params.idOrSlug;
    let blog;
    
    // Check if it's a valid MongoDB ObjectId
    if (param.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(param);
    }
    
    // If not found by ID or not a valid ID, try finding by slug
    if (!blog) {
      blog = await Blog.findOne({ slug: param });
    }

    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blogs
// @desc    Create a new blog
// @access  Private/Admin
router.post('/', protect, upload.single('coverImageFile'), async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, author, isPublished, coverImageUrl } = req.body;
    
    let coverImage = '';
    
    // If a file was uploaded, upload to Cloudinary
    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      if (uploadResult) {
        coverImage = uploadResult.url;
      }
    } else if (coverImageUrl) {
      // Use the provided URL
      coverImage = coverImageUrl;
    }

    const newBlog = new Blog({
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      excerpt: excerpt || '',
      content,
      coverImage,
      category: category || 'General',
      author: author || 'Vishal Industries',
      isPublished: isPublished === 'false' ? false : true
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update a blog
// @access  Private/Admin
router.put('/:id', protect, upload.single('coverImageFile'), async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, author, isPublished, coverImageUrl } = req.body;
    
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      blog.title = title || blog.title;
      if (slug) blog.slug = slug;
      if (excerpt !== undefined) blog.excerpt = excerpt;
      blog.content = content || blog.content;
      if (category) blog.category = category;
      if (author) blog.author = author;
      if (isPublished !== undefined) blog.isPublished = isPublished === 'false' ? false : true;

      // Handle cover image update
      if (req.file) {
        const uploadResult = await uploadOnCloudinary(req.file.path);
        if (uploadResult) {
          blog.coverImage = uploadResult.url;
        }
      } else if (coverImageUrl !== undefined) {
        blog.coverImage = coverImageUrl;
      }

      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      await blog.deleteOne();
      res.json({ message: 'Blog removed' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/blogs/:id/seo
// @desc    Update a blog's SEO metadata
// @access  Private/Admin
router.put('/:id/seo', protect, async (req, res) => {
  try {
    const { metaTitle, metaDescription, metaKeywords, metaCanonical, metaRobots } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      if (metaTitle !== undefined) blog.metaTitle = metaTitle;
      if (metaDescription !== undefined) blog.metaDescription = metaDescription;
      if (metaKeywords !== undefined) blog.metaKeywords = metaKeywords;
      if (metaCanonical !== undefined) blog.metaCanonical = metaCanonical;
      if (metaRobots !== undefined) blog.metaRobots = metaRobots;
      
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
