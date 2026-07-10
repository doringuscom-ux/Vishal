import { MapPin, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0a1f3c] text-white pt-10 pb-6 relative overflow-hidden">
      {/* Subtle Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1a56db] via-[#f37a1f] to-[#1a56db]"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 mb-8">
          
          {/* Company Info */}
          <div className="lg:col-span-4 pr-0 lg:pr-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-[#1a56db] to-[#0c2444] text-white p-2 rounded-lg shadow-sm border border-white/10 flex items-center justify-center w-10 h-10">
                <span className="font-black text-xl tracking-tighter">V</span>
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight leading-none text-white">VISHAL</h3>
                <h3 className="text-[10px] font-bold text-[#f37a1f] tracking-[0.2em] uppercase mt-0.5">Industries</h3>
              </div>
            </div>
            <p className="text-white/70 text-[13px] leading-relaxed mb-6 font-medium">
              Trusted manufacturer of high-quality conveyor rollers, drum pulleys, idler frames, and crusher machine components.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#1877F2] transition-colors border border-white/10 hover:border-transparent">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#25D366] transition-colors border border-white/10 hover:border-transparent">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links and Products - Side by side on mobile */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:grid-cols-5 lg:gap-6">
            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="font-bold text-[13px] md:text-[14px] mb-3 md:mb-4 text-white uppercase tracking-wider border-l-2 border-[#1a56db] pl-2">Quick Links</h4>
              <ul className="space-y-2 md:space-y-2.5 text-[12px] md:text-[13px] text-white/70 font-medium">
                <li><Link to="/" className="hover:text-[#f37a1f] transition-colors">Home</Link></li>
                <li><a href="/#about" className="hover:text-[#f37a1f] transition-colors">About Us</a></li>
                <li><Link to="/products" className="hover:text-[#f37a1f] transition-colors">Products</Link></li>
                <li><Link to="/industries" className="hover:text-[#f37a1f] transition-colors">Industries</Link></li>
              </ul>
            </div>

            {/* Our Products */}
            <div className="lg:col-span-3">
              <h4 className="font-bold text-[13px] md:text-[14px] mb-3 md:mb-4 text-white uppercase tracking-wider border-l-2 border-[#1a56db] pl-2">Our Products</h4>
              <ul className="space-y-2 md:space-y-2.5 text-[12px] md:text-[13px] text-white/70 font-medium">
                <li><Link to="/products" className="hover:text-[#f37a1f] transition-colors">Conveyor Rollers</Link></li>
                <li><Link to="/products" className="hover:text-[#f37a1f] transition-colors">Drum Pulleys</Link></li>
                <li><Link to="/products" className="hover:text-[#f37a1f] transition-colors">Idler Frames</Link></li>
                <li><Link to="/products" className="hover:text-[#f37a1f] transition-colors">Conveyor Accessories</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-[14px] mb-4 text-white uppercase tracking-wider border-l-2 border-[#1a56db] pl-2">Contact Us</h4>
            <ul className="space-y-3 text-[13px] text-white/70 font-medium">
              <li className="flex items-start gap-2 group cursor-pointer">
                <MapPin className="w-4 h-4 text-[#1a56db] flex-shrink-0 mt-0.5" />
                <span className="group-hover:text-white transition-colors">Vill. Burj Kotian, Chandimandir, Distt. Panchkula, Haryana</span>
              </li>
              <li className="flex items-center gap-2 group cursor-pointer">
                <Phone className="w-4 h-4 text-[#1a56db] flex-shrink-0" />
                <span className="group-hover:text-white transition-colors">98883 14231, 97292 53570</span>
              </li>
              <li className="flex items-center gap-2 group cursor-pointer">
                <Mail className="w-4 h-4 text-[#1a56db] flex-shrink-0" />
                <span className="group-hover:text-white transition-colors">vishalindustries.chdm@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between text-[12px] text-white/50 font-medium">
          <p>© {new Date().getFullYear()} Vishal Industries. All Rights Reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
