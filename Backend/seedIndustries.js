require('dotenv').config();
const mongoose = require('mongoose');
const Industry = require('./models/Industry');

// We will recreate the hardcoded data from frontend here so we don't have to import an ES module
const industriesData = [
  { 
    slug: "stone-crusher", 
    name: "Stone Crusher", 
    image: "/images/stone_crusher.png", 
    desc: "Heavy-duty conveyor rollers designed for high-impact stone crushing environments.",
    relatedProducts: "Drum Pulley, Industrial Roller, Carrying Roller, Impact Roller, Return Roller, Self Aligning, Straight Return, Cone Roller, Idler Frame"
  },
  { 
    slug: "mining-industry", 
    name: "Mining Industry", 
    image: "/images/stone_mining.png", 
    desc: "Durable solutions built to withstand extreme dust and heavy loads in mining.",
    relatedProducts: "Mild Steel Drum Pulley, Industrial Conveyor Roller, Carrying Roller with Stand, Impact Roller with Stand, Return Roller, Self Aligning Carrying Roller, Straight Return Roller, Cone Carrying Roller, Idler Frame Stand"
  },
  { 
    slug: "cement-plants", 
    name: "Cement Plants", 
    image: "/images/cement_plant.png", 
    desc: "Reliable material handling for abrasive and high-temperature cement manufacturing.",
    relatedProducts: "Mild Steel Drum Pulley, Industrial Conveyor Roller, Carrying Roller with Stand, Impact Roller with Stand, Return Roller, Self Aligning Carrying Roller, Straight Return Roller, Cone Carrying Roller, Idler Frame Stand"
  },
  { 
    slug: "warehouse-rollers", 
    name: "Warehouse Rollers", 
    image: "/images/factory_warehouse.png", 
    desc: "Smooth, low-friction rollers for efficient sorting and packaging in warehouses.",
    relatedProducts: "Industrial Conveyor Roller, Carrying Roller with Stand, Return Roller, Self Aligning Carrying Roller, Straight Return Roller, Mild Steel Drum Pulley, Idler Frame Stand"
  },
  { 
    slug: "material-handling", 
    name: "Material Handling", 
    image: "/images/material_handling.png", 
    desc: "Customized systems for seamless material flow across modern facilities.",
    relatedProducts: "Industrial Conveyor Roller, Mild Steel Drum Pulley, Carrying Roller with Stand, Return Roller, Self Aligning Carrying Roller, Straight Return Roller, Impact Roller with Stand, Idler Frame Stand, Cone Carrying Roller"
  },
  { 
    slug: "packaging-industry", 
    name: "Packaging Industry", 
    image: "/images/packaging_industry.png", 
    desc: "Precision rollers ensuring zero damage to packaged goods during transit.",
    relatedProducts: "Industrial Conveyor Roller, Mild Steel Drum Pulley, Carrying Roller with Stand, Return Roller, Self Aligning Carrying Roller, Straight Return Roller, Plastic Conveyor Roller, Black Plastic Conveyor Roller, Idler Frame Stand"
  },
  { 
    slug: "sugar-mill", 
    name: "Sugar Mill", 
    image: "/images/sugar_mill.png", 
    desc: "Corrosion-resistant rollers suitable for moist and sugary processing environments.",
    relatedProducts: "Mild Steel Drum Pulley, Industrial Conveyor Roller, Carrying Roller with Stand, Impact Roller with Stand, Return Roller, Self Aligning Carrying Roller, Straight Return Roller, Cone Carrying Roller, Idler Frame Stand"
  },
  { 
    slug: "coal-handling", 
    name: "Coal Handling", 
    image: "/images/coal_handling.png", 
    desc: "Robust conveyors engineered for continuous operation in coal plants.",
    relatedProducts: "Mild Steel Drum Pulley, Industrial Conveyor Roller, Carrying Roller with Stand, Impact Roller with Stand, Return Roller, Self Aligning Carrying Roller, Straight Return Roller, Cone Carrying Roller, Idler Frame Stand"
  },
  { 
    slug: "power-plants", 
    name: "Power Plants", 
    image: "/images/power_plant.png", 
    desc: "High-performance rollers to keep fuel and materials moving continuously.",
    relatedProducts: "Mild Steel Drum Pulley, Industrial Conveyor Roller, Carrying Roller with Stand, Impact Roller with Stand, Return Roller, Self Aligning Carrying Roller, Straight Return Roller, Cone Carrying Roller, Idler Frame Stand"
  },
  { 
    slug: "steel-plants", 
    name: "Steel Plants", 
    image: "/images/heavy_industry.png", 
    desc: "Heat-resistant rollers designed for extreme temperatures in steel processing.",
    relatedProducts: "Mild Steel Drum Pulley, Industrial Conveyor Roller, Carrying Roller with Stand, Impact Roller with Stand, Return Roller, Self Aligning Carrying Roller, Straight Return Roller, Cone Carrying Roller, Idler Frame Stand"
  },
  { 
    slug: "fertilizer-plants", 
    name: "Fertilizer Plants", 
    image: "/images/fertilizer_plant.png", 
    desc: "Chemical-resistant handling solutions for safe fertilizer transport.",
    relatedProducts: "Mild Steel Drum Pulley, Industrial Conveyor Roller, Carrying Roller with Stand, Impact Roller with Stand, Return Roller, Self Aligning Carrying Roller, Straight Return Roller, Cone Carrying Roller, Idler Frame Stand"
  },
  { 
    slug: "food-processing", 
    name: "Food Processing", 
    image: "/images/food_processing.png", 
    desc: "Food-grade, hygienic rollers compliant with strict safety standards.",
    relatedProducts: "Stainless Steel Conveyor Roller, Industrial Conveyor Roller, Plastic Conveyor Roller, Black Plastic Conveyor Roller, Mild Steel Drum Pulley, Carrying Roller with Stand, Return Roller, Self Aligning Carrying Roller"
  },
  { 
    slug: "bulk-handling", 
    name: "Bulk Handling", 
    image: "/images/bulk_handling.png", 
    desc: "Heavy-load conveyors for massive volumes of bulk materials.",
    relatedProducts: "Mild Steel Drum Pulley, Industrial Conveyor Roller, Carrying Roller with Stand, Impact Roller with Stand, Return Roller, Self Aligning Carrying Roller, Straight Return Roller, Cone Carrying Roller, Idler Frame Stand"
  },
  { 
    slug: "construction", 
    name: "Construction", 
    image: "/images/construction_industry.png", 
    desc: "Rugged and durable equipment for tough construction site requirements.",
    relatedProducts: "Mild Steel Drum Pulley, Industrial Conveyor Roller, Carrying Roller with Stand, Impact Roller with Stand, Return Roller, Self Aligning Carrying Roller, Straight Return Roller, Cone Carrying Roller, Idler Frame Stand"
  },
  { 
    slug: "paper-mills", 
    name: "Paper Mills", 
    image: "/images/paper_mill.png", 
    desc: "Precision-balanced rollers for continuous, high-speed paper manufacturing.",
    relatedProducts: "Industrial Conveyor Roller, Mild Steel Drum Pulley, Carrying Roller with Stand, Return Roller, Self Aligning Carrying Roller, Straight Return Roller, Impact Roller with Stand, Idler Frame Stand"
  }
];

const seedIndustries = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Delete existing industries
    await Industry.deleteMany();
    console.log('Cleared existing industries');

    // Insert new data
    await Industry.insertMany(industriesData);
    console.log('Successfully seeded Industries data!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding industries:', error);
    process.exit(1);
  }
};

seedIndustries();
