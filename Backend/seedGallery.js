require('dotenv').config();
const mongoose = require('mongoose');
const Gallery = require('./models/Gallery');

const galleryItems = [
  {
    category: "Products",
    title: "Premium Fasteners",
    src: "https://picsum.photos/seed/fasteners/800/800",
    size: "large"
  },
  {
    category: "Manufacturing",
    title: "CNC Machining",
    src: "https://picsum.photos/seed/cnc/800/600",
    size: "small"
  },
  {
    category: "Products",
    title: "Industrial Valves",
    src: "https://picsum.photos/seed/valves/800/1000",
    size: "medium"
  },
  {
    category: "Events",
    title: "Trade Show 2023",
    src: "https://picsum.photos/seed/event/800/1000",
    size: "medium"
  },
  {
    category: "Manufacturing",
    title: "Assembly Line",
    src: "https://picsum.photos/seed/assembly/800/800",
    size: "small"
  },
  {
    category: "Products",
    title: "Custom Bearings",
    src: "https://picsum.photos/seed/bearings/800/600",
    size: "small"
  },
  {
    category: "Events",
    title: "Global Expo",
    src: "https://picsum.photos/seed/expo/800/600",
    size: "small"
  }
];

const seedGallery = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Gallery.deleteMany({});
    console.log('Cleared existing gallery items');

    await Gallery.insertMany(galleryItems);
    console.log('Successfully seeded gallery items');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding gallery:', error);
    process.exit(1);
  }
};

seedGallery();
