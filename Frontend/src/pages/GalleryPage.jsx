import { useState, useEffect } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { GALLERY_API } from '../utils/api';

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await axios.get(GALLERY_API);
        setGalleryItems(data);
        
        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGallery();
  }, []);

  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const selectedImage = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20 relative">
      {/* Dynamic Header */}
      <section className="bg-[#0c2444] pt-20 pb-20 md:pt-28 md:pb-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSLCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        </div>

        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
            Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Gallery</span>
          </h1>
          <p className="text-blue-100/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Explore our state-of-the-art facilities, premium products, and industrial events through our visual showcase.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 -mt-10 relative z-20">
        
        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 p-2 flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(null);
              }}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#1a56db] text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div 
              key={item._id} 
              className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-transform duration-500 hover:-translate-y-1"
              onClick={() => setSelectedIndex(filteredItems.findIndex(i => i._id === item._id))}
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 block"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c2444]/90 via-[#0c2444]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                <span className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.category}
                </span>
                <h3 className="text-white text-xl md:text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.title}
                </h3>
              </div>
              
              {/* Expand Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#1a56db] text-white">
                <Maximize2 className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
        )}

      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c2444]/95 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-10"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Previous Button */}
          <button 
            onClick={handlePrev}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-10 backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-10 backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          
          {/* Image Container */}
          <div 
            className="max-w-6xl w-full h-[70vh] md:h-[85vh] relative animate-in zoom-in-95 duration-300 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title} 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-center rounded-b-lg">
              <h3 className="text-white text-xl md:text-2xl font-bold">{selectedImage.title}</h3>
              <p className="text-gray-300 mt-1 md:mt-2 text-sm md:text-base">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
