require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('./models/Blog');

const blogs = [
  {
    title: "How to Choose the Right Conveyor Roller for Your Industry",
    slug: "how-to-choose-right-conveyor-roller",
    excerpt: "Selecting the perfect conveyor roller is crucial for maximizing efficiency and minimizing downtime. Learn the key factors — material type, load capacity, environment, and maintenance — that should guide your decision.",
    content: `<h2>Why Choosing the Right Conveyor Roller Matters</h2>
<p>Conveyor rollers are the backbone of any material handling system. Whether you're running a cement plant, a mining operation, or a packaging warehouse, the right roller can make or break your productivity. A poor choice leads to frequent breakdowns, increased maintenance costs, and costly downtime.</p>

<h2>Key Factors to Consider</h2>

<h3>1. Material of Construction</h3>
<p>The roller material should match your working environment:</p>
<ul>
  <li><strong>Mild Steel Rollers</strong> — Best for heavy-duty applications like mining, stone crushers, and cement plants. They offer high load capacity and durability.</li>
  <li><strong>Stainless Steel Rollers</strong> — Ideal for food processing, pharmaceutical, and chemical industries where corrosion resistance is critical.</li>
  <li><strong>Plastic/HDPE Rollers</strong> — Perfect for lightweight applications like packaging, warehouses, and logistics where low noise and corrosion-free operation matter.</li>
</ul>

<h3>2. Load Capacity</h3>
<p>Calculate the maximum load your conveyor will handle. Always choose rollers rated for at least 20% more than your peak load to ensure longevity. Heavy industries like mining require drum pulleys with higher load ratings, while packaging units can use lighter rollers.</p>

<h3>3. Operating Environment</h3>
<p>Consider temperature, moisture, dust, and chemical exposure:</p>
<ul>
  <li>High moisture? Go for stainless steel or HDPE rollers.</li>
  <li>Extreme dust? Choose sealed bearing rollers.</li>
  <li>High temperature? Opt for heat-resistant steel rollers.</li>
</ul>

<h3>4. Roller Diameter and Length</h3>
<p>These depend on belt width and conveyor speed. Wider belts need larger diameter rollers for proper support. Higher speeds require precision-balanced rollers to minimize vibration.</p>

<h3>5. Maintenance Requirements</h3>
<p>Self-aligning rollers reduce maintenance by automatically correcting belt tracking. Impact rollers at loading points absorb shock and protect the belt, extending its life significantly.</p>

<h2>Vishal Industries Recommendation</h2>
<p>At Vishal Industries, we manufacture all types of conveyor rollers and drum pulleys engineered for Indian industrial conditions. Our products are dynamically balanced, heavy-duty, and built to last. Whether you need a single roller or a complete conveyor system setup, we've got you covered.</p>

<blockquote>
  <p><strong>Pro Tip:</strong> Always request a site survey before ordering rollers for a new installation. The right specification from day one saves lakhs in maintenance costs over the conveyor's lifetime.</p>
</blockquote>

<p>Contact us at <strong>+91 98883 14231</strong> for expert guidance on choosing the right conveyor components for your industry.</p>`,
    coverImage: "https://5.imimg.com/data5/SELLER/Default/2025/2/487606872/RP/MQ/OM/63723147/mild-steel-drum-pulley.jpeg",
    category: "Tips & Guides",
    tags: ["Conveyor Rollers", "Material Handling", "Industrial Equipment", "Buying Guide"],
    author: "Vishal Industries",
    isPublished: true
  },
  {
    title: "5 Common Conveyor Belt Problems and How to Fix Them",
    slug: "5-common-conveyor-belt-problems-and-fixes",
    excerpt: "Conveyor belt issues can halt your entire production line. Here are the 5 most common problems — belt slippage, mistracking, material spillage, excessive wear, and roller failure — along with practical solutions.",
    content: `<h2>Don't Let Conveyor Problems Stop Your Production</h2>
<p>In any industrial setup — whether it's a stone crusher, cement plant, or mining operation — conveyor belt problems can cause hours of downtime and thousands of rupees in losses. The good news? Most issues are preventable with the right knowledge and quality components.</p>

<h2>Problem #1: Belt Slippage</h2>
<h3>Symptoms</h3>
<p>The belt slips on the drive pulley, especially under heavy load. You'll notice reduced speed and a burning rubber smell.</p>
<h3>Causes</h3>
<ul>
  <li>Insufficient belt tension</li>
  <li>Worn-out drive pulley surface</li>
  <li>Wet or oily conditions</li>
</ul>
<h3>Solution</h3>
<p>Install a <strong>rubber-lagged drum pulley</strong> — the rubber coating increases friction between the belt and pulley. Also, check and adjust belt tension regularly. Vishal Industries' drum pulleys come with optional rubber lagging for maximum grip.</p>

<h2>Problem #2: Belt Mistracking</h2>
<h3>Symptoms</h3>
<p>The belt drifts to one side, causing edge damage and material spillage.</p>
<h3>Causes</h3>
<ul>
  <li>Uneven loading</li>
  <li>Misaligned rollers or frame</li>
  <li>Worn or damaged rollers</li>
</ul>
<h3>Solution</h3>
<p>Install <strong>self-aligning carrying rollers</strong> — these automatically correct belt alignment. At minimum, place them every 30-50 meters on long conveyors. Regular roller inspection and replacement of worn units also prevents mistracking.</p>

<h2>Problem #3: Material Spillage at Loading Points</h2>
<h3>Symptoms</h3>
<p>Material falls off the belt at loading zones, creating mess and safety hazards.</p>
<h3>Causes</h3>
<ul>
  <li>Belt sagging at impact zone</li>
  <li>No impact absorption system</li>
  <li>Improper skirt board adjustment</li>
</ul>
<h3>Solution</h3>
<p>Use <strong>impact rollers with stands</strong> at all loading points. The rubber disc design absorbs shock and prevents belt sagging. This keeps material on the belt and protects the belt from damage. Vishal Industries' impact rollers are designed specifically for heavy-duty Indian crusher and mining applications.</p>

<h2>Problem #4: Excessive Belt Wear</h2>
<h3>Symptoms</h3>
<p>Belt surface wears out quickly, especially on the underside.</p>
<h3>Causes</h3>
<ul>
  <li>Seized or stuck rollers creating friction</li>
  <li>Material buildup on return rollers</li>
  <li>Poor quality rollers with rough surfaces</li>
</ul>
<h3>Solution</h3>
<p>Replace seized rollers immediately — even one stuck roller can destroy a belt section within days. Use <strong>precision-balanced, smooth-surface rollers</strong> and install belt cleaners on return side. Regular lubrication of roller bearings extends their life and protects your belt.</p>

<h2>Problem #5: Roller Failure</h2>
<h3>Symptoms</h3>
<p>Rollers stop spinning, make grinding noises, or visibly wobble.</p>
<h3>Causes</h3>
<ul>
  <li>Bearing failure due to dust/moisture ingress</li>
  <li>Overloading beyond rated capacity</li>
  <li>Poor quality manufacturing</li>
</ul>
<h3>Solution</h3>
<p>Invest in quality rollers from the start — cheap rollers cost more in the long run through frequent replacements and belt damage. Choose <strong>sealed bearing rollers</strong> for dusty environments. All Vishal Industries rollers use premium sealed bearings and are dynamically balanced for smooth, long-lasting operation.</p>

<h2>Prevention is Better Than Cure</h2>
<p>Regular maintenance inspections can catch 90% of conveyor problems before they cause downtime. We recommend:</p>
<ul>
  <li>Weekly visual inspection of all rollers</li>
  <li>Monthly belt tension and alignment check</li>
  <li>Quarterly replacement of worn components</li>
  <li>Annual complete conveyor system audit</li>
</ul>

<p>Need quality conveyor components or expert advice? Contact Vishal Industries at <strong>+91 98883 14231</strong> — we've been manufacturing conveyor rollers and pulleys trusted by industries across India.</p>`,
    coverImage: "https://cpimg.tistatic.com/09284586/b/4/Carrying-Roller-Stand.jpg",
    category: "Industry News",
    tags: ["Conveyor Belt", "Troubleshooting", "Maintenance", "Industrial Tips", "Conveyor Rollers"],
    author: "Vishal Industries",
    isPublished: true
  }
];

const seedBlogs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Don't delete existing blogs, just add new ones
    const count = await Blog.countDocuments();
    if (count > 0) {
      console.log(`Found ${count} existing blogs. Adding new ones...`);
    }

    const result = await Blog.insertMany(blogs);
    console.log(`✅ ${result.length} blogs published successfully!`);
    result.forEach(blog => {
      console.log(`   📝 "${blog.title}" → /blog/${blog.slug}`);
    });
    
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding blogs:', error.message);
    process.exit(1);
  }
};

seedBlogs();
