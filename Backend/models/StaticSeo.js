const mongoose = require('mongoose');

const staticSeoSchema = new mongoose.Schema({
  path: { 
    type: String, 
    required: true, 
    unique: true 
  },
  title: {
    type: String, // Just a friendly name for the Admin Panel
    required: true
  },
  metaTitle: {
    type: String,
    default: '',
  },
  metaDescription: {
    type: String,
    default: '',
  },
  metaKeywords: {
    type: String,
    default: '',
  },
  metaCanonical: {
    type: String,
    default: '',
  },
  metaRobots: {
    type: String,
    default: 'index, follow',
  }
}, { timestamps: true });

module.exports = mongoose.model('StaticSeo', staticSeoSchema);
