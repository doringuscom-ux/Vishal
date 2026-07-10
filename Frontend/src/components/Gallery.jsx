import { galleryImages } from '../data/products';
import { ArrowRight, Maximize2 } from 'lucide-react';

export default function Gallery() {
  return (
    <section id="gallery" className="pt-10 pb-16 md:pt-12 md:pb-20 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6 md:mb-10">
          <h4 className="text-[#1a56db] font-bold tracking-wide mb-2 text-[12px] md:text-[14px] uppercase">
            Visual Tour
          </h4>
          <h2 className="text-[32px] md:text-[42px] font-semibold text-gray-900 tracking-tight mb-3 leading-tight">
            Product Gallery
          </h2>
          <p className="text-gray-500 text-[14px] xl:text-[16px] max-w-2xl leading-relaxed font-medium">
            Take a closer look at our state-of-the-art manufacturing facilities and premium industrial products in action.
          </p>
        </div>
        
        {/* Gallery Grid: 3 in row 1, 4 in row 2, 4 in row 3 */}
        <div className="grid grid-cols-12 gap-3 md:gap-5">
          
          {/* Row 1: 3 Items (span 4 each) */}
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="col-span-12 sm:col-span-4 relative group overflow-hidden rounded-[16px] md:rounded-[20px] h-[180px] md:h-[220px] shadow-[0_4px_20px_rgb(0,0,0,0.04)] cursor-pointer">
              <img src={galleryImages[idx]} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#1a56db]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-[#1a56db] hover:scale-110 transition-transform shadow-xl">
                   <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
                 </button>
              </div>
            </div>
          ))}

          {/* Row 2: 4 Items (span 3 each) */}
          {[3, 4, 5, 6].map((idx) => (
            <div key={idx} className="col-span-6 sm:col-span-3 relative group overflow-hidden rounded-[16px] md:rounded-[20px] h-[120px] sm:h-[150px] md:h-[180px] shadow-[0_4px_20px_rgb(0,0,0,0.04)] cursor-pointer">
              <img src={galleryImages[idx]} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#1a56db] transition-colors">
                   <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
                 </button>
              </div>
            </div>
          ))}
          
          {/* Row 3: 3 Items + 1 View More Card (span 3 each) */}
          {[7, 8, 9].map((idx) => (
            <div key={idx} className="col-span-6 sm:col-span-3 relative group overflow-hidden rounded-[16px] md:rounded-[20px] h-[120px] sm:h-[150px] md:h-[180px] shadow-[0_4px_20px_rgb(0,0,0,0.04)] cursor-pointer">
              <img src={galleryImages[idx]} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#1a56db] transition-colors">
                   <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
                 </button>
              </div>
            </div>
          ))}
          
          {/* View More Card */}
          <div className="col-span-6 sm:col-span-3 relative group overflow-hidden rounded-[16px] md:rounded-[20px] h-[120px] sm:h-[150px] md:h-[180px] bg-[#f8f9fa] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#1a56db] hover:bg-blue-50 transition-colors shadow-sm">
             <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1a56db] mb-1 sm:mb-2 md:mb-3 group-hover:scale-110 transition-transform">
               <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
             </div>
             <span className="font-bold text-gray-800 group-hover:text-[#1a56db] transition-colors text-[10px] sm:text-[12px] md:text-[14px] text-center px-1">View Full</span>
          </div>

        </div>
      </div>
    </section>
  );
}
