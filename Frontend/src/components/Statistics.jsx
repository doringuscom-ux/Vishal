import { Users, Award, Truck, HeadphonesIcon } from 'lucide-react';

const stats = [
  {
    id: 1,
    name: "Years Experience",
    value: "10+",
    icon: Award,
    color: "from-blue-500 to-cyan-400",
    delay: "delay-100"
  },
  {
    id: 2,
    name: "Happy Clients",
    value: "500+",
    icon: Users,
    color: "from-purple-500 to-pink-400",
    delay: "delay-200"
  },
  {
    id: 3,
    name: "Projects Delivered",
    value: "1000+",
    icon: Truck,
    color: "from-amber-400 to-orange-500",
    delay: "delay-300"
  },
  {
    id: 4,
    name: "Customer Support",
    value: "24/7",
    icon: HeadphonesIcon,
    color: "from-emerald-400 to-teal-500",
    delay: "delay-400"
  }
];

export default function Statistics() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative background glow animated */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Our Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 animate-pulse">Track Record</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Delivering excellence through dedication, expertise, and a commitment to quality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => {
            const MainIcon = stat.icon;
            
            return (
              <div 
                key={stat.id} 
                className={`group relative flex flex-col items-center justify-center p-8 bg-slate-800/40 rounded-3xl backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] hover:border-slate-600 overflow-hidden animate-fade-in-up ${stat.delay}`}
              >
                {/* Card top gradient line */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative mb-8 mt-2 animate-float flex justify-center items-center">
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-400/40 transition-colors duration-500"></div>
                  
                  {/* Dust particles container (behind the icon) */}
                  <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
                    <div className="absolute w-3 h-3 bg-white/40 rounded-full blur-[1px] animate-dust dust-delay-1 bottom-4 left-6"></div>
                    <div className="absolute w-2 h-2 bg-white/30 rounded-full blur-[1px] animate-dust dust-delay-2 bottom-6 left-8"></div>
                    <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-[2px] animate-dust dust-delay-3 bottom-2 left-4"></div>
                  </div>

                  {/* Main Central Icon */}
                  <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center relative border-2 border-slate-600 group-hover:border-blue-400/50 transition-all duration-500 z-10 shadow-lg">
                    <MainIcon className="w-12 h-12 text-white group-hover:scale-110 group-hover:text-blue-300 transition-all duration-500" />
                  </div>
                </div>
                
                <div className="text-5xl md:text-6xl font-black mb-3 text-white tracking-tight drop-shadow-md group-hover:scale-105 transition-transform duration-500">
                  {stat.value}
                </div>
                
                <div className="text-slate-400 font-semibold tracking-widest uppercase text-sm group-hover:text-white transition-colors duration-300">
                  {stat.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
