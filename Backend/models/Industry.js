const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  relatedProducts: { type: String },
  
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  metaKeywords: { type: String, default: '' },
  metaCanonical: { type: String, default: '' },
  metaRobots: { type: String, default: 'index, follow' }
}, { timestamps: true });

module.exports = mongoose.model('Industry', industrySchema);
