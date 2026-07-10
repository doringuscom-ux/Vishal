import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full font-sans shadow-sm sticky md:relative top-0 z-50 bg-white">
      {/* Unified Navigation Bar */}
      <nav className="bg-[#f8f9fa] relative z-50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-[90px]">

            {/* Logo and Brand Name */}
            <div className="flex items-center gap-3">
              <img src="/ganesha.png" alt="Ganesha Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" onError={(e) => { e.target.src = 'https://via.placeholder.com/64?text=Logo'; }} />
              <div className="flex flex-col justify-center">
                <div className="text-xl md:text-[28px] font-black text-[#1a56db] tracking-tight leading-none mb-1">VISHAL INDUSTRIES</div>
                <p className="text-[10px] md:text-[11px] text-brandOrange font-bold tracking-wide">Mfg. of all types of Conveyor Rollers</p>
              </div>
            </div>

            {/* Nav Links (Desktop) */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-3">
              <Link to="/" className="group relative px-2 xl:px-4 py-2 text-gray-800 text-[13px] xl:text-[15px] font-bold overflow-hidden rounded-md flex items-center whitespace-nowrap">
                <span className="absolute inset-0 w-full h-full bg-[#1a56db] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Home</span>
              </Link>
              <a href="/#about" className="group relative px-2 xl:px-4 py-2 text-gray-800 text-[13px] xl:text-[15px] font-bold overflow-hidden rounded-md flex items-center whitespace-nowrap">
                <span className="absolute inset-0 w-full h-full bg-[#1a56db] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">About Us</span>
              </a>
              <Link to="/products" className="group relative px-2 xl:px-4 py-2 text-gray-800 text-[13px] xl:text-[15px] font-bold overflow-hidden rounded-md flex items-center whitespace-nowrap">
                <span className="absolute inset-0 w-full h-full bg-[#1a56db] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Products</span>
              </Link>
              <Link to="/industries" className="group relative px-2 xl:px-4 py-2 text-gray-800 text-[13px] xl:text-[15px] font-bold overflow-hidden rounded-md flex items-center whitespace-nowrap">
                <span className="absolute inset-0 w-full h-full bg-[#1a56db] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Industries</span>
              </Link>
              <Link to="/gallery" className="group relative px-2 xl:px-4 py-2 text-gray-800 text-[13px] xl:text-[15px] font-bold overflow-hidden rounded-md flex items-center whitespace-nowrap">
                <span className="absolute inset-0 w-full h-full bg-[#1a56db] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Gallery</span>
              </Link>
              <Link to="/blog" className="group relative px-2 xl:px-4 py-2 text-gray-800 text-[13px] xl:text-[15px] font-bold overflow-hidden rounded-md flex items-center whitespace-nowrap">
                <span className="absolute inset-0 w-full h-full bg-[#1a56db] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Blog</span>
              </Link>
              <Link to="/contact" className="group relative px-2 xl:px-4 py-2 text-gray-800 text-[13px] xl:text-[15px] font-bold overflow-hidden rounded-md flex items-center whitespace-nowrap">
                <span className="absolute inset-0 w-full h-full bg-[#1a56db] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Contact Us</span>
              </Link>
            </div>

            {/* Right Side Button */}
            <div className="hidden md:flex items-center">
              <a href="tel:9888314231" className="group relative bg-[#1a56db] text-white px-4 xl:px-7 py-2.5 xl:py-3.5 text-[13px] xl:text-[15px] font-bold overflow-hidden flex items-center rounded-sm whitespace-nowrap">
                <span className="absolute inset-0 w-full h-full bg-blue-900 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10">+91 98883 14231</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-800 hover:text-[#1a56db] p-2 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden absolute top-[90px] left-0 w-full bg-white shadow-xl border-t border-gray-100 transition-all duration-300 origin-top transform ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
      >
        <div className="flex flex-col px-4 py-6 space-y-4">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 text-lg font-bold border-b border-gray-50 pb-3 hover:text-[#1a56db]">Home</Link>
          <a href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 text-lg font-bold border-b border-gray-50 pb-3 hover:text-[#1a56db]">About Us</a>
          <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 text-lg font-bold border-b border-gray-50 pb-3 hover:text-[#1a56db]">Products</Link>
          <Link to="/industries" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 text-lg font-bold border-b border-gray-50 pb-3 hover:text-[#1a56db]">Industries</Link>
          <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 text-lg font-bold border-b border-gray-50 pb-3 hover:text-[#1a56db]">Gallery</Link>
          <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 text-lg font-bold border-b border-gray-50 pb-3 hover:text-[#1a56db]">Blog</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 text-lg font-bold pb-3 hover:text-[#1a56db]">Contact Us</Link>

          <div className="pt-4 md:hidden">
            <a href="tel:9888314231" className="flex justify-center bg-[#1a56db] text-white px-7 py-4 text-[16px] font-bold rounded-sm w-full">
              Call: +91 98883 14231
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
