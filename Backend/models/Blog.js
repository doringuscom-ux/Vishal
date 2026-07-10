const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, default: '' },
  content: { type: String, required: true },
  coverImage: { type: String, default: '' },
  category: { type: String, default: 'General' },
  author: { type: String, default: 'Vishal Industries' },
  isPublished: { type: Boolean, default: true },
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  metaKeywords: { type: String, default: '' },
  metaCanonical: { type: String, default: '' },
  metaRobots: { type: String, default: 'index, follow' }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
