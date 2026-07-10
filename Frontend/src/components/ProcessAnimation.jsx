import { Factory, Truck, Users } from 'lucide-react';

export default function ProcessAnimation() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Works</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A seamless process from our manufacturing unit right to your doorstep.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto mt-16">
          {/* Animated Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 bg-slate-800 hidden md:block">
            {/* Moving glowing particle on the line */}
            <div 
              className="absolute top-1/2 left-0 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_6px_rgba(34,211,238,0.5)] -translate-y-1/2 -translate-x-1/2 z-20"
              style={{
                animation: "moveLine 4s infinite cubic-bezier(0.4, 0, 0.2, 1)"
              }}
            ></div>
            {/* Glowing trail */}
            <div 
              className="absolute top-1/2 left-0 w-24 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent -translate-y-1/2 -translate-x-12 z-10"
              style={{
                animation: "moveLine 4s infinite cubic-bezier(0.4, 0, 0.2, 1)"
              }}
            ></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center relative z-10 gap-16 md:gap-0">
            {/* Step 1: Factory */}
            <div className="flex flex-col items-center group">
              <div className="w-28 h-28 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 shadow-xl group-hover:border-cyan-400/50 group-hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.4)] group-hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Factory className="w-12 h-12 text-slate-300 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-500 relative z-10" />
              </div>
              <h3 className="mt-8 text-xl font-bold text-white tracking-wide">Manufacturing</h3>
              <p className="text-slate-400 text-center mt-2 max-w-[220px]">Premium quality production in our advanced facilities.</p>
            </div>

            {/* Step 2: Truck */}
            <div className="flex flex-col items-center group">
              <div className="w-28 h-28 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 shadow-xl group-hover:border-orange-400/50 group-hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.4)] group-hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {/* Truck with dust animation */}
                <div className="relative z-10 flex justify-center items-center">
                  <div className="absolute -left-8 bottom-0 flex opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute w-3 h-3 bg-orange-400/40 rounded-full blur-[1px] animate-dust dust-delay-1 bottom-1"></div>
                    <div className="absolute w-2 h-2 bg-orange-400/30 rounded-full blur-[1px] animate-dust dust-delay-2 bottom-3 left-2"></div>
                  </div>
                  <Truck className="w-12 h-12 text-slate-300 group-hover:text-orange-400 group-hover:scale-110 transition-all duration-500" />
                </div>
              </div>
              <h3 className="mt-8 text-xl font-bold text-white tracking-wide">Fast Delivery</h3>
              <p className="text-slate-400 text-center mt-2 max-w-[220px]">Safe and timely transportation across the country.</p>
            </div>

            {/* Step 3: Customers */}
            <div className="flex flex-col items-center group">
              <div className="w-28 h-28 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 shadow-xl group-hover:border-emerald-400/50 group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)] group-hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Users className="w-12 h-12 text-slate-300 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-500 relative z-10" />
              </div>
              <h3 className="mt-8 text-xl font-bold text-white tracking-wide">Happy Clients</h3>
              <p className="text-slate-400 text-center mt-2 max-w-[220px]">Satisfied customers receiving top-tier products.</p>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes moveLine {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}} />
    </section>
  );
}
