require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: "Mild Steel Drum Pulley",
    use: "Conveyor belt ko drive aur support dene ke liye.",
    features: ["MS Fabricated", "Rubber Lagging Available", "Dynamically Balanced", "Heavy Load Capacity"],
    applications: "Stone Crushers, Cement Plants, Mining Industry.",
    category: "Drum Pulleys",
    image: "https://5.imimg.com/data5/SELLER/Default/2025/2/487606872/RP/MQ/OM/63723147/mild-steel-drum-pulley.jpeg"
  },
  {
    name: "Industrial Conveyor Roller",
    use: "Material handling systems, conveyor belts, warehouses, packaging units.",
    features: ["Heavy-duty steel construction", "Low maintenance", "Long service life", "Smooth operation"],
    applications: "Cement Plants, Mining, Stone Crushers, Warehouses, Food Processing Units.",
    category: "Conveyor Rollers",
    image: "/Products/Mild Steel Drum Pulley.png"
  },
  {
    name: "Carrying Roller with Stand",
    use: "Conveyor belt ke upper side par material ko support karne ke liye.",
    features: ["Strong frame", "High load carrying capacity", "Corrosion resistant", "Easy installation"],
    applications: "Crusher Plants, Sand Plants, Mining Industry.",
    category: "Stand with Roller",
    image: "https://cpimg.tistatic.com/09284586/b/4/Carrying-Roller-Stand.jpg"
  },
  {
    name: "Impact Roller with Stand",
    use: "Conveyor loading point par impact absorb karne ke liye.",
    features: ["Rubber disc design", "Shock absorption", "Belt protection", "Reduced wear & tear"],
    applications: "Coal Handling, Mining, Cement Industry.",
    category: "Stand with Roller",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/5/310343996/PT/TZ/XI/156240550/whatsapp-image-2023-05-23-at-18-05-16.jpeg"
  },
  {
    name: "Return Roller",
    use: "Conveyor belt ke return side support ke liye.",
    features: ["High durability", "Precision balanced", "Smooth operation"],
    applications: "Mining, Cement, Aggregate Plants.",
    category: "Conveyor Rollers",
    image: "https://cpimg.tistatic.com/09284589/b/4/Return-Roller.jpg"
  },
  {
    name: "Self Aligning Carrying Roller",
    use: "Conveyor belt ko center mein rakhne ke liye.",
    features: ["Automatic belt alignment", "Reduces belt damage", "Smooth rotation", "Heavy-duty frame"],
    applications: "Long Distance Conveyor Systems.",
    category: "Conveyor Rollers",
    image: "/Products/Self Aligning Carrying Roller.png"
  },
  {
    name: "Cone Carrying Roller",
    use: "Curved conveyor systems mein belt tracking ke liye.",
    features: ["Cone shape design", "Better belt guidance", "Reduced slippage"],
    applications: "Bulk Material Handling Systems.",
    category: "Conveyor Rollers",
    image: "/Products/Cone Carrying Roller.png"
  },
  {
    name: "Straight Return Roller",
    use: "Conveyor belt ke return side support ke liye.",
    features: ["High durability", "Precision balanced", "Smooth operation"],
    applications: "Mining, Cement, Aggregate Plants.",
    category: "Conveyor Rollers",
    image: "https://content.misumi-ec.com/image/upload/t_product_main/v1/p/jp/product/series/221006268007/221006268007_001.jpg"
  },
  {
    name: "Stainless Steel Conveyor Roller",
    use: "Corrosion-resistant material handling ke liye.",
    features: ["High durability", "Rust resistant", "Smooth surface", "Heavy load capacity"],
    applications: "Food Processing, Chemical Plants, Pharmaceuticals.",
    category: "Conveyor Rollers",
    image: "https://5.imimg.com/data5/SELLER/Default/2021/1/QB/PX/WD/56072084/stainless-steel-flanges-500x500.jpg"
  },
  {
    name: "Plastic Conveyor Roller",
    use: "Lightweight material handling systems ke liye.",
    features: ["Lightweight", "Low noise operation", "Corrosion free", "Cost effective"],
    applications: "Packaging Units, Warehouses, Logistics.",
    category: "Conveyor Rollers",
    image: "https://2.wlimg.com/product_images/bc-500/2024/11/14033744/plastic-conveyor-roller-1730962406-7672449.jpeg"
  },
  {
    name: "Black Plastic Conveyor Roller",
    use: "Lightweight material handling systems ke liye.",
    features: ["Lightweight", "Low noise operation", "Corrosion free", "Cost effective"],
    applications: "Packaging Units, Warehouses, Logistics.",
    category: "Conveyor Rollers",
    image: "/Products/Black Plastic Conveyor Roller.png"
  },
  {
    name: "Troughing Idler Frame Stand",
    use: "Heavy impact and bulk material handling ke liye.",
    features: ["Impact absorption", "Heavy load capacity", "Robust design", "Low maintenance"],
    applications: "Mining, Crushers, Cement Plants.",
    category: "Stand",
    image: "https://5.imimg.com/data5/SELLER/Default/2026/2/587102280/VL/AO/YW/14801449/carrying-idler-roller.png"
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    await Product.deleteMany({}); // Clear existing products
    console.log('Old products cleared');

    await Product.insertMany(products);
    console.log('All products seeded successfully!');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
