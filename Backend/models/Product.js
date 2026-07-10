const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  use: { type: String, required: true },
  features: [{ type: String }],
  applications: { type: String, required: true },
  category: { type: String, required: true },
  images: [{ type: String }],
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  metaKeywords: { type: String, default: '' },
  metaCanonical: { type: String, default: '' },
  metaRobots: { type: String, default: 'index, follow' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
