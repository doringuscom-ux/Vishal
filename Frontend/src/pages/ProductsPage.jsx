import { useState, useEffect } from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PRODUCTS_API } from '../utils/api';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(PRODUCTS_API);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  if (loading) {
    return <div className="pt-32 text-center text-xl font-bold">Loading products...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Premium Hero Section */}
      <div className="relative bg-[#0a1f3c] text-white py-20 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500 rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 text-center">
          <h4 className="text-orange-500 font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base">
            Engineered For Excellence
          </h4>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Our <span className="text-blue-500">Products</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of high-performance material handling components, built to withstand the toughest industrial environments globally.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 border-2 ${
                activeCategory === category 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link 
              to={`/product/${product.slug || product._id || product.id}`}
              key={product.id || product._id} 
              className="group relative h-auto bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-2xl transition-all duration-500 block"
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
              <div className="p-6 flex flex-col bg-white h-full">
                <h3 className="font-bold text-slate-900 text-lg mb-2 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-3 font-medium mb-4">
                  {product.use}
                </p>
                <div className="mt-auto flex items-center text-blue-600 font-bold text-sm group-hover:text-orange-500 transition-colors">
                  View Details <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
