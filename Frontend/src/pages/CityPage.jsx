import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axiosInstance from '../utils/axiosInstance';
import { PAGES_API } from '../utils/api';
import Hero from '../components/Hero';
import Products from '../components/Products';
import AboutSection from '../components/AboutSection';
import IndustriesWeEmpower from '../components/IndustriesWeEmpower';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import { ArrowUpRight } from 'lucide-react';

// A modified Hero for the city landing page
function CityHero({ city, customText }) {
  // Format city name to title case
  const formattedCity = city
    ? city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
    : 'Your City';

  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1500;
    const end = 12;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(easeOut * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, []);

  return (
    <section className="relative pt-8 pb-8 md:pt-12 md:pb-12 lg:pt-16 lg:pb-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-6 md:gap-8 lg:gap-16">
          {/* Left Content Area */}
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left mt-4 lg:mt-0 lg:pr-6 xl:pr-10">
            <h4 className="text-[#1a56db] font-bold tracking-wide mb-4 text-[14px] uppercase bg-blue-100 px-4 py-1.5 rounded-full">
              Serving {formattedCity} & Beyond
            </h4>

            <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] xl:text-[52px] font-semibold text-gray-900 leading-[1.1] tracking-tight mb-6">
              High-Quality Conveyor Rollers in <span className="text-[#1a56db]">{formattedCity}</span>
            </h1>

            <p className="text-gray-600 text-[16px] xl:text-[18px] max-w-xl mb-8 leading-loose font-medium">
              {customText ? customText : `We are the leading providers of industrial metal solutions in ${formattedCity}. Partner with Vishal Industries for uncompromised quality and unmatched expertise.`}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10 lg:mb-12 w-full sm:w-auto px-4 sm:px-0">
              <a href="#contact" className="w-full sm:w-auto text-center bg-[#1a56db] hover:bg-blue-800 text-white px-8 py-4 text-[14px] font-bold transition-colors shadow-lg shadow-blue-500/30 rounded-md">
                GET A QUOTE IN {formattedCity.toUpperCase()}
              </a>
              <a href="#products" className="w-full sm:w-auto text-center border-2 border-[#1a56db] text-[#1a56db] hover:bg-[#1a56db] hover:text-white px-8 py-4 text-[14px] font-bold transition-colors bg-transparent rounded-md">
                EXPLORE PRODUCTS
              </a>
            </div>
            
            <div className="flex items-center gap-4 text-sm font-semibold text-gray-700 bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
                <div className="flex -space-x-3">
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=facearea&facepad=2&w=100&h=100&q=80" alt="Client" />
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=facearea&facepad=2&w=100&h=100&q=80" alt="Client" />
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=facearea&facepad=2&w=100&h=100&q=80" alt="Client" />
                </div>
                <div>
                    <span className="block text-[#1a56db] font-bold">500+ Clients</span>
                    in {formattedCity} region
                </div>
            </div>
          </div>

          {/* Right Image Grid Area */}
          <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0">
            {/* Circular text badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-32 bg-[#f8f9fa] rounded-full flex items-center justify-center p-2 shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-gray-100">
              <div className="relative w-full h-full flex items-center justify-center animate-[spin_15s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 overflow-visible text-[#1a56db]">
                  <path id="curve" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                  <text fontSize="11.2" fontWeight="bold" fill="currentColor" letterSpacing="1.3">
                    <textPath href="#curve" startOffset="0%">
                      STRICTEST INDUSTRY STANDARDS •
                    </textPath>
                  </text>
                </svg>
              </div>
              <ArrowUpRight className="absolute text-[#1a56db] w-8 h-8" strokeWidth={2} />
            </div>

            {/* Staggered Grid */}
            <div className="grid grid-cols-2 gap-4 xl:gap-6 relative z-10">

              {/* Column 1 */}
              <div className="flex flex-col gap-4 xl:gap-6">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"
                  alt="Industrial Plant"
                  className="w-full h-[180px] sm:h-[200px] lg:h-[220px] xl:h-[240px] object-cover shadow-sm"
                />
                <img
                  src="https://kompletamerica.com/wp-content/uploads/2022/11/komplet-k-jc805-compact-mobile-jaw-crusher-for-on-site-recycling-komplet-america-llc.jpg"
                  alt="Steel Coils"
                  className="w-full h-[180px] sm:h-[200px] lg:h-[220px] xl:h-[240px] object-cover rounded-bl-[60px] md:rounded-bl-[80px] xl:rounded-bl-[100px] shadow-sm"
                />
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-4 xl:gap-6">
                <img
                  src="https://images.jdmagicbox.com/quickquotes/images_main/idler-roller-conveyor-system-2215457978-u2dj8n3h.jpg"
                  alt="Conveyor Idler Roller"
                  className="w-full h-[180px] sm:h-[200px] lg:h-[220px] xl:h-[240px] object-cover rounded-tr-[60px] md:rounded-tr-[80px] xl:rounded-tr-[100px] shadow-sm"
                />
                <img
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600"
                  alt="Industrial Worker"
                  className="w-full h-[180px] sm:h-[200px] lg:h-[220px] xl:h-[240px] object-cover shadow-sm"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import NotFoundPage from './NotFoundPage';

export default function CityPage() {
  const { cityName } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const { data } = await axiosInstance.get(`${PAGES_API}/${cityName}`);
        setPageData(data);
      } catch (error) {
        console.error('Page SEO data not found for this city.');
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPageData();
    window.scrollTo(0, 0);
  }, [cityName]);

  if (loading) {
    return <div className="min-h-screen pt-32 text-center text-xl font-bold">Loading...</div>;
  }

  if (error) {
    return <NotFoundPage />;
  }

  const formattedCity = cityName ? cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase() : 'Your City';

  // Determine Meta values (fallback to generic if pageData is null)
  const metaTitle = pageData?.metaTitle || `Premium Conveyor Rollers in ${formattedCity} | Vishal Industries`;
  const metaDescription = pageData?.metaDescription || `Looking for industrial metal solutions and conveyor rollers in ${formattedCity}? Vishal Industries is your trusted manufacturing partner.`;
  const metaKeywords = pageData?.metaKeywords || `conveyor rollers ${formattedCity}, industrial metal solutions, drum pulleys`;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://vishalindustries.com';
  const metaCanonical = pageData?.metaCanonical || `${baseUrl}/city/${cityName}`;
  const metaRobots = pageData?.metaRobots || 'index, follow';

  return (
    <div className="city-landing-page">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}
        <link rel="canonical" href={metaCanonical} />
        <meta name="robots" content={metaRobots} />
      </Helmet>

      <CityHero city={cityName} customText={pageData?.customText} />
      
      <Products />
      
      <AboutSection />
      
      <IndustriesWeEmpower />
      
      <div className="bg-gray-50 py-16" id="contact">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
              <div className="bg-[#1a56db] rounded-3xl p-8 md:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-blue-400 opacity-20 rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                      <div className="lg:w-2/3">
                          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                              Ready to upgrade your industrial processes in {cityName ? cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase() : 'Your Region'}?
                          </h2>
                          <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-2xl">
                              Our local team is ready to provide tailored solutions, fast delivery, and dedicated support for all your manufacturing needs.
                          </p>
                          <div className="flex flex-wrap gap-4">
                              <a href="tel:+919876543210" className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center gap-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                  </svg>
                                  Call Us Now
                              </a>
                          </div>
                      </div>
                      
                      <div className="lg:w-1/3 w-full max-w-md bg-white p-6 rounded-2xl shadow-xl text-gray-800">
                          <h3 className="text-xl font-bold mb-4 text-[#1a56db]">Quick Inquiry for {cityName ? cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase() : 'City'}</h3>
                          <form className="space-y-4">
                              <div>
                                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a56db]/50" />
                              </div>
                              <div>
                                  <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a56db]/50" />
                              </div>
                              <div>
                                  <input type="text" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a56db]/50" />
                              </div>
                              <button type="submit" className="w-full bg-[#1a56db] text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                                  Get Started
                              </button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      
      <Gallery />
      <Testimonials />
    </div>
  );
}
