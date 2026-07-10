import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import { PRODUCTS_API } from '../utils/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(PRODUCTS_API);
        // Maybe only show top 8 products on home page
        setProducts(data.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return null;

  return (
    <section id="products" className="pt-12 pb-12 md:pt-16 md:pb-16 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-12">
          <h4 className="text-[#1a56db] font-bold tracking-wide mb-4 text-[14px] uppercase">
            Engineered For Excellence
          </h4>
          <h2 className="text-[36px] md:text-[48px] font-semibold text-gray-900 tracking-tight mb-3 leading-tight">
            Our Premium Products
          </h2>
          <p className="text-gray-500 text-[16px] xl:text-[18px] max-w-2xl leading-relaxed font-medium">
            Discover our comprehensive range of high-performance material handling components, built to withstand the toughest industrial environments.
          </p>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
          {products.map((product) => (
            <Link 
              to={`/product/${product.slug || product._id || product.id}`}
              key={product.id || product._id} 
              className="group flex flex-col bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(26,86,219,0.08)] hover:-translate-y-2 transition-all duration-300 rounded-2xl overflow-hidden block"
            >
              {/* Image Container */}
              <div className="h-[220px] bg-[#f8f9fa] relative overflow-hidden">
                <div className="absolute inset-0 bg-[#1a56db]/0 group-hover:bg-[#1a56db]/10 transition-colors duration-300 z-20 pointer-events-none"></div>
                <img 
                  src={product.images && product.images.length > 0 ? product.images[0] : product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              
              {/* Content Container */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-[16px] mb-2 leading-snug line-clamp-2 group-hover:text-[#1a56db] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-[13px] line-clamp-2 mb-6 font-medium">
                    {product.category}
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-2 w-full border-2 border-gray-100 text-gray-600 group-hover:border-[#1a56db] group-hover:bg-[#1a56db] group-hover:text-white py-3 px-4 font-bold transition-all duration-300 uppercase tracking-wider text-[12px] rounded-xl">
                  View Details
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
}
