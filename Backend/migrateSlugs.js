require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const migrateSlugs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const products = await Product.find({});
    
    for (const product of products) {
      if (!product.slug) {
        // Generate a slug from the name
        const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        product.slug = slug;
        await product.save();
        console.log(`Updated product: ${product.name} -> ${slug}`);
      }
    }

    console.log('Migration complete!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrateSlugs();
