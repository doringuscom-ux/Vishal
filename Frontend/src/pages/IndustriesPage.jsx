import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { INDUSTRIES_API } from '../utils/api';

export default function IndustriesPage() {
  const navigate = useNavigate();
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchIndustries = async () => {
      try {
        const { data } = await axios.get(INDUSTRIES_API);
        setIndustries(data);
      } catch (error) {
        console.error('Failed to fetch industries', error);
      } finally {
        setLoading(false);
      }
    };
    fetchIndustries();
  }, []);

  if (loading) {
    return <div className="min-h-screen pt-32 text-center text-xl font-bold">Loading industries...</div>;
  }

  return (
    <div className="pt-6 md:pt-16 pb-10 md:pb-16 min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mb-8 md:mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4 md:mb-6">
          Industries We <span className="text-blue-600">Empower</span>
        </h1>
        <div className="w-20 md:w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-500 text-base md:text-xl max-w-3xl mx-auto">
          Delivering high-performance, industry-specific conveyor rollers and material handling solutions customized for heavy-duty applications across the globe.
        </p>
      </div>

      {/* Industries Grid */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {industries.map((ind, index) => (
            <div 
              key={index}
              onClick={() => navigate(`/industry/${ind.slug}`)}
              className="group h-[320px] md:h-[360px] [perspective:1000px] cursor-pointer"
            >
              {/* Inner container for 3D flip */}
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Front Side */}
                <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                  <img 
                    src={ind.image} 
                    alt={ind.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f3c] via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 w-full p-6 flex justify-center">
                    <h3 className="text-xl md:text-2xl font-bold text-white text-center">
                      {ind.name}
                    </h3>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#0a1f3c] rounded-2xl p-6 md:p-8 flex flex-col justify-center items-center text-center shadow-2xl border border-blue-500/30">
                  <h3 className="text-xl font-bold text-blue-400 mb-4 border-b border-blue-500/20 pb-4 w-full">
                    {ind.name}
                  </h3>
                  <p className="text-slate-300 text-[14px] md:text-[15px] leading-relaxed mb-6">
                    {ind.desc}
                  </p>
                  <div className="mt-auto w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mt-24">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20 -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="md:max-w-2xl z-10 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need a Custom Solution for Your Industry?
            </h2>
            <p className="text-slate-300 text-lg">
              Our engineering team can design and manufacture bespoke conveyor rollers tailored specifically to your operational requirements.
            </p>
          </div>
          <div className="mt-8 md:mt-0 z-10 relative">
            <Link to="/" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors whitespace-nowrap">
              Contact Us Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
