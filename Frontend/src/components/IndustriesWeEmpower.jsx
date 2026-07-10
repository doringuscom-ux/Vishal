import { Settings, Pickaxe, Mountain, Warehouse, Box, Truck, Zap, Flame, Leaf, Apple, Recycle, HeartPulse, Building2 } from 'lucide-react';

const industries = [
  { name: "Stone Crusher", icon: Mountain, color: "text-stone-500", bg: "bg-stone-100" },
  { name: "Mining Industry", icon: Pickaxe, color: "text-amber-500", bg: "bg-amber-100" },
  { name: "Cement Plants", icon: Building2, color: "text-slate-500", bg: "bg-slate-100" },
  { name: "Warehouse Rollers", icon: Warehouse, color: "text-indigo-500", bg: "bg-indigo-100" },
  { name: "Material Handling", icon: Truck, color: "text-blue-500", bg: "bg-blue-100" },
  { name: "Packaging Industry", icon: Box, color: "text-emerald-500", bg: "bg-emerald-100" },
  { name: "Sugar Mill", icon: Settings, color: "text-pink-500", bg: "bg-pink-100" },
  { name: "Coal Handling", icon: Flame, color: "text-orange-600", bg: "bg-orange-100" },
  { name: "Power Plants", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-100" },
  { name: "Steel Plants", icon: Settings, color: "text-zinc-600", bg: "bg-zinc-100" },
  { name: "Fertilizer Plants", icon: Leaf, color: "text-green-500", bg: "bg-green-100" },
  { name: "Food Processing", icon: Apple, color: "text-red-500", bg: "bg-red-100" },
  { name: "Bulk Handling", icon: Box, color: "text-cyan-500", bg: "bg-cyan-100" },
  { name: "Construction", icon: Building2, color: "text-sky-500", bg: "bg-sky-100" },
  { name: "Waste Management", icon: Recycle, color: "text-lime-600", bg: "bg-lime-100" },
  { name: "Pharmaceutical", icon: HeartPulse, color: "text-rose-500", bg: "bg-rose-100" }
];

export default function IndustriesWeEmpower() {
  return (
    <section className="py-6 md:py-12 bg-white overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mb-6 md:mb-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4 md:mb-6">
          Industries We <span className="text-blue-600">Empower</span>
        </h2>
        <div className="w-20 md:w-24 h-1 bg-blue-600 mx-auto rounded-full mb-4 md:mb-6"></div>
        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
          Delivering high-performance conveyor rollers and material handling solutions customized for heavy-duty industrial applications.
        </p>
      </div>

      <div className="relative flex flex-col gap-6 md:gap-8 pb-4 md:pb-10">
        {/* Infinite Auto Slider */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...industries, ...industries].map((ind, index) => {
            const Icon = ind.icon;
            return (
              <div 
                key={index}
                className="w-72 mx-4 group bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 rounded-2xl p-8 flex flex-col items-center text-center cursor-default hover:-translate-y-2"
              >
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${ind.bg} group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                  {/* Raining tiny icons in background */}
                  <div className="absolute inset-0 w-full h-full">
                    <Icon className={`absolute w-5 h-5 ${ind.color} opacity-40 animate-rain rain-delay-1 left-1`} />
                    <Icon className={`absolute w-4 h-4 ${ind.color} opacity-60 animate-rain rain-delay-2 right-2`} />
                    <Icon className={`absolute w-6 h-6 ${ind.color} opacity-30 animate-rain rain-delay-3 left-8`} />
                  </div>
                  {/* Main Icon */}
                  <Icon className={`w-10 h-10 ${ind.color} relative z-10`} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {ind.name}
                </h3>
              </div>
            );
          })}
        </div>
        
        {/* Smooth fading edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
}
