require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const migrateImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // We fetch documents as raw objects to access the old 'image' field
    const products = await mongoose.connection.db.collection('products').find({}).toArray();
    
    let count = 0;
    for (const p of products) {
      if (p.image && !p.images) {
        await mongoose.connection.db.collection('products').updateOne(
          { _id: p._id },
          { 
            $set: { images: [p.image] },
            $unset: { image: "" }
          }
        );
        count++;
      }
    }
    
    console.log(`Migrated ${count} products.`);
    process.exit();
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
};

migrateImages();
