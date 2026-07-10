import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Phone, Mail, ArrowRight, Shield, Award, PenTool } from 'lucide-react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { PRODUCTS_API } from '../utils/api';
import NotFoundPage from './NotFoundPage';


export default function SingleProductPage() {
  const { slug } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Scroll to top on mount and fetch product
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${PRODUCTS_API}/${slug}`);
        setProduct(data);
        
        const { data: allProducts } = await axios.get(PRODUCTS_API);
        const filtered = allProducts.filter(p => p.slug !== slug);
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setRelatedProducts(shuffled.slice(0, 3));
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch product', err);
        setError(true);
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen pt-32 text-center text-xl font-bold">Loading product details...</div>;
  }

  if (error || !product) {
    return <NotFoundPage />;
  }

  const metaTitle = product.metaTitle || `${product.name} | Vishal Industries`;
  const metaDescription = product.metaDescription || `Discover the high-quality ${product.name} manufactured by Vishal Industries. Ideal for ${product.applications}.`;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://vishalindustries.com';
  const metaCanonical = product.metaCanonical || `${baseUrl}/product/${product.slug}`;
  const metaRobots = product.metaRobots || 'index, follow';

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20 pt-24 md:pt-32">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        {product.metaKeywords && <meta name="keywords" content={product.metaKeywords} />}
        <link rel="canonical" href={metaCanonical} />
        <meta name="robots" content={metaRobots} />
      </Helmet>
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-6 md:mb-8 flex items-center text-sm text-gray-500 font-medium overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-[#1a56db] transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
        <Link to="/products" className="hover:text-[#1a56db] transition-colors">Products</Link>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
        <span className="text-[#0c2444] font-bold">{product.name}</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Main Product Section */}
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden mb-12">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left: Image Gallery */}
            <div className="w-full lg:w-1/2 p-6 md:p-10 lg:border-r border-gray-100 bg-gray-50/50">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 mb-6 group">
                <img 
                  src={product.images && product.images.length > 0 ? product.images[activeImage] : product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images ? product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-white ${
                      activeImage === idx ? 'border-[#1a56db] shadow-md ring-2 ring-[#1a56db]/20' : 'border-gray-200 hover:border-blue-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                )) : null}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="w-full lg:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0c2444] mb-6 tracking-tight leading-tight">
                {product.name}
              </h1>
              
              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                {product.use}
              </p>

              {/* Key Features List */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#0c2444] mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#1a56db]" /> Key Benefits
                </h3>
                <ul className="space-y-3">
                  {product.features && product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Applications */}
              <div className="mb-10 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h4 className="font-bold text-[#0c2444] mb-2 text-sm uppercase tracking-wider">Ideal Applications</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{product.applications}</p>
              </div>

              <div className="mt-auto">
                <div className="bg-[#f8f9fa] border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Pricing</p>
                    <p className="text-2xl font-black text-[#0c2444]">Request Quote</p>
                  </div>
                  <Link 
                    to="/contact" 
                    className="w-full sm:w-auto bg-[#1a56db] hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                  >
                    Request a Quote <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#0c2444]">Similar Products</h2>
              <p className="text-gray-500 mt-2 font-medium">Other items you might be interested in</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-1 text-[#1a56db] font-bold hover:text-blue-800 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(rp => (
              <Link key={rp.id || rp._id} to={`/product/${rp.id || rp._id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                <div className="aspect-[4/3] bg-gray-50 overflow-hidden relative">
                  <img src={rp.images && rp.images.length > 0 ? rp.images[0] : rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
                </div>
                <div className="p-5 flex justify-between items-center bg-white">
                  <h4 className="font-bold text-[#0c2444] text-lg">{rp.name}</h4>
                  <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#1a56db] group-hover:text-white text-gray-400 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
