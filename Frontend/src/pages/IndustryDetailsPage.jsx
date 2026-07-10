import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ChevronRight, ShieldCheck, Settings, TrendingUp, ArrowRight, FileText, Star } from 'lucide-react';
import { INDUSTRIES_API, PRODUCTS_API } from '../utils/api';
import IndustriesWeEmpower from '../components/IndustriesWeEmpower';
import Testimonials from '../components/Testimonials';

export default function IndustryDetailsPage() {
  const { slug } = useParams();
  const [industry, setIndustry] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: indData } = await axios.get(`${INDUSTRIES_API}/${slug}`);
        setIndustry(indData);

        const { data: allProducts } = await axios.get(PRODUCTS_API);
        
        // Find products based on relatedProducts string
        const relatedList = [];
        if (indData.relatedProducts) {
          const reqNames = indData.relatedProducts.split(',').map(s => s.trim().toLowerCase());
          allProducts.forEach(product => {
            const prodName = product.name.toLowerCase();
            if (reqNames.some(reqName => prodName.includes(reqName))) {
              relatedList.push(product);
            }
          });
        }
        setRelatedProducts(relatedList);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch industry', err);
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen pt-32 text-center text-xl font-bold">Loading industry details...</div>;
  }

  if (error || !industry) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Industry Not Found</h2>
        <Link to="/industries" className="text-blue-600 hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Industries
        </Link>
      </div>
    );
  }

  const metaTitle = industry.metaTitle || `${industry.name} Conveyor Rollers | Vishal Industries`;
  const metaDescription = industry.metaDescription || industry.desc;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://vishalindustries.com';
  const metaCanonical = industry.metaCanonical || `${baseUrl}/industry/${industry.slug}`;
  const metaRobots = industry.metaRobots || 'index, follow';

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        {industry.metaKeywords && <meta name="keywords" content={industry.metaKeywords} />}
        <link rel="canonical" href={metaCanonical} />
        <meta name="robots" content={metaRobots} />
      </Helmet>

      
      {/* Full-Immersive Landing Page Hero */}
      <div className="relative min-h-[75vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900">
        
        {/* Full Screen Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={industry.image} 
            alt={industry.name} 
            className="w-full h-full object-cover" 
          />
          {/* Gradient overlay: Dark on left for text readability, fading quickly to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-24 text-left">
          <div className="max-w-[850px]">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-blue-500" /> Trusted Authorized Partner
            </div>
            
            {/* Dynamic Title */}
            <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-black text-white mb-10 tracking-tight leading-[1.1] drop-shadow-lg">
              {industry.name} <br/> 
              <span className="text-blue-500">Equipment</span>
            </h1>
            
            {/* Glassmorphic Feature Cards (3 instead of 4 pills) */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {/* Card 1 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#1e293b]/60 border border-white/5 backdrop-blur-md flex-1 shadow-lg shadow-black/20">
                <div className="w-12 h-12 rounded-xl bg-[#0f172a] flex items-center justify-center border border-white/5 shadow-inner">
                  <Settings className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-tight">Heavy Load<br/>Capacity</h4>
                  <p className="text-[9px] text-slate-400 font-bold tracking-widest mt-1 uppercase">Maximum Strength</p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#1e293b]/60 border border-white/5 backdrop-blur-md flex-1 shadow-lg shadow-black/20">
                <div className="w-12 h-12 rounded-xl bg-[#0f172a] flex items-center justify-center border border-white/5 shadow-inner">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-tight">High<br/>Durability</h4>
                  <p className="text-[9px] text-slate-400 font-bold tracking-widest mt-1 uppercase">Long Lasting</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#1e293b]/60 border border-white/5 backdrop-blur-md flex-1 shadow-lg shadow-black/20">
                <div className="w-12 h-12 rounded-xl bg-[#0f172a] flex items-center justify-center border border-white/5 shadow-inner">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-tight">Low<br/>Maintenance</h4>
                  <p className="text-[9px] text-slate-400 font-bold tracking-widest mt-1 uppercase">Reliable Operation</p>
                </div>
              </div>
            </div>

            {/* Huge Call to Action & Avatars */}
            <div className="flex flex-col xl:flex-row xl:items-center gap-8">
              <div className="flex flex-wrap items-center gap-4">
                <a href="#products-section" className="pr-2 pl-6 py-2 bg-blue-600 text-white font-bold text-sm sm:text-base rounded-full shadow-[0_10px_30px_-5px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:scale-105 transition-all flex items-center gap-4 group">
                  Explore Products 
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
                
                <Link to="/contact" className="pr-2 pl-6 py-2 bg-blue-600 text-white font-bold text-sm sm:text-base rounded-full shadow-[0_10px_30px_-5px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:scale-105 transition-all flex items-center gap-4 group">
                  Contact Us
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                </Link>
              </div>
              
              {/* Happy Clients */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Client" className="w-10 h-10 rounded-full border-2 border-[#0f172a] object-cover" />
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Client" className="w-10 h-10 rounded-full border-2 border-[#0f172a] object-cover" />
                  <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Client" className="w-10 h-10 rounded-full border-2 border-[#0f172a] object-cover" />
                  <div className="w-10 h-10 rounded-full border-2 border-[#0f172a] bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white z-10 relative">5k+</div>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">5,000+ Happy Clients</p>
                  <div className="flex items-center text-blue-500">
                    <Star className="w-3.5 h-3.5 fill-blue-500" />
                    <Star className="w-3.5 h-3.5 fill-blue-500" />
                    <Star className="w-3.5 h-3.5 fill-blue-500" />
                    <Star className="w-3.5 h-3.5 fill-blue-500" />
                    <Star className="w-3.5 h-3.5 fill-blue-500" />
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Bottom SVG Wave Transition */}
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" className="w-full h-auto text-slate-50 fill-current block" preserveAspectRatio="none" style={{height: "80px"}} xmlns="http://www.w3.org/2000/svg">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Related Products Section */}
      <div id="products-section" className="max-w-[1200px] mx-auto px-4 md:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <div className="flex items-center mb-2">
              <div className="w-10 md:w-16 h-1.5 bg-blue-600 rounded-full mr-4"></div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
                Recommended Products
              </h2>
            </div>
            <p className="text-slate-500 font-medium ml-14 md:ml-20">Equipment perfectly suited for {industry.name}</p>
          </div>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {relatedProducts.map((product, index) => (
              <div 
                key={product._id || index} 
                className="group relative h-auto bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div className="h-[240px] bg-slate-100 p-4 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-600/0 transition-colors duration-500 group-hover:bg-blue-600/5"></div>
                  <img 
                    src={product.images && product.images.length > 0 ? product.images[0] : product.image} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain mix-blend-multiply transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-3"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 border border-blue-100">
                    {product.category}
                  </div>
                </div>
                
                {/* Details Container */}
                <div className="p-6 flex flex-col bg-white h-[180px]">
                  <h3 className="font-bold text-slate-900 text-lg mb-2 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 font-medium mb-4">
                    {product.use}
                  </p>
                  <Link to={`/product/${product.slug || product._id || product.id}`} className="mt-auto flex items-center text-blue-600 font-bold text-sm group-hover:text-orange-500 transition-colors">
                    View in Products <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-600 mb-2">No specific products mapped yet.</h3>
            <p className="text-slate-500 mb-6">Explore our full range of material handling products.</p>
            <Link to="/products" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors">
              View All Products
            </Link>
          </div>
        )}
      </div>

      <IndustriesWeEmpower />
      <Testimonials />
    </div>
  );
}
