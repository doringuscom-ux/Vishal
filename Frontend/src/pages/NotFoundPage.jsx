import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0f1c]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 w-full h-full">
        {/* Animated grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-[pulse_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite_2s]"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-4 md:px-8 flex flex-col items-center text-center">
        {/* 404 Text with industrial styling */}
        <div className="relative group perspective-1000">
          <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 drop-shadow-[0_0_40px_rgba(26,86,219,0.3)] transition-transform duration-700 group-hover:scale-105">
            404
          </h1>
          {/* Animated scanline effect over the text */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(26,86,219,0.2)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_2s_linear_infinite] opacity-50 mix-blend-overlay rounded-lg overflow-hidden pointer-events-none"></div>
        </div>
        
        <div className="mt-[-20px] mb-8 relative">
          <div className="absolute inset-0 bg-[#1a56db] blur-xl opacity-20 rounded-full"></div>
          <span className="relative inline-block px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-blue-400 font-bold tracking-widest uppercase text-sm">
            System Error / Page Not Found
          </span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Lost in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">machinery.</span>
        </h2>
        
        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
          The page you are looking for has been moved, deleted, or possibly never existed. Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
          <Link 
            to="/" 
            className="group relative w-full sm:w-auto px-8 py-4 bg-[#1a56db] overflow-hidden rounded-xl font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(26,86,219,0.5)] flex items-center justify-center gap-3"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            <Home className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Back to Base</span>
          </Link>
          
          <Link 
            to="/products" 
            className="group w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-700 hover:border-blue-500 rounded-xl font-bold text-gray-300 hover:text-white transition-all flex items-center justify-center gap-3"
          >
            <Search className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
            <span>Find Products</span>
          </Link>
        </div>
        
        {/* Support link */}
        <div className="mt-16 text-gray-500 text-sm flex items-center gap-2">
          <span>Need help?</span>
          <a href="#contact" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-400/30 transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
