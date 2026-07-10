import { ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';

function AnimatedCounter({ end, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // easeOutQuart for a smoother, less abrupt deceleration curve
      const easeOut = 1 - Math.pow(1 - progress, 4);

      setCount(Math.round(easeOut * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}{suffix}</>;
}

export default function Hero() {
  return (
    <section className="relative pt-8 pb-8 md:pt-12 md:pb-12 lg:pt-16 lg:pb-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-6 md:gap-8 lg:gap-16">

          {/* Left Content Area (Bottom on Mobile) */}
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left mt-4 lg:mt-0 lg:pr-6 xl:pr-10">
            <h4 className="text-[#1a56db] font-bold tracking-wide mb-4 text-[14px] uppercase">
              ENGINEERED FOR INDUSTRY
            </h4>

            <h1 className="text-[40px] sm:text-[48px] lg:text-[54px] xl:text-[60px] font-semibold text-gray-900 leading-[1.05] tracking-tight mb-6">
              High-Performance<br />
              Conveyor Rollers
            </h1>

            <p className="text-gray-500 text-[16px] xl:text-[18px] max-w-xl mb-8 leading-loose font-medium">
              Precision-engineered conveyor rollers delivering superior strength, smooth operation, and reliable performance for demanding industrial applications.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10 lg:mb-12 w-full sm:w-auto px-4 sm:px-0">
              <a href="#contact" className="w-full sm:w-auto text-center bg-[#1a56db] hover:bg-blue-800 text-white px-8 py-4 text-[14px] font-bold transition-colors">
                CONTACT US
              </a>
              <a href="#products" className="w-full sm:w-auto text-center border-2 border-[#1a56db] text-[#1a56db] hover:bg-[#1a56db] hover:text-white px-8 py-4 text-[14px] font-bold transition-colors bg-transparent">
                DISCOVER MORE
              </a>
            </div>

            {/* Statistics Row */}
            <div className="flex items-center justify-center lg:justify-start gap-6 md:gap-10 xl:gap-12 w-full">
              <div>
                <h3 className="text-[36px] sm:text-[40px] xl:text-[44px] font-black text-gray-900 leading-none mb-3">
                  <AnimatedCounter end={12} suffix="K+" />
                </h3>
                <p className="text-gray-500 text-[13px] sm:text-[14px] font-medium">Products per year</p>
              </div>
              <div>
                <h3 className="text-[36px] sm:text-[40px] xl:text-[44px] font-black text-gray-900 leading-none mb-3">
                  <AnimatedCounter end={95} suffix="%" />
                </h3>
                <p className="text-gray-500 text-[13px] sm:text-[14px] font-medium">Delivery rate</p>
              </div>
              <div>
                <h3 className="text-[36px] sm:text-[40px] xl:text-[44px] font-black text-gray-900 leading-none mb-3">
                  <AnimatedCounter end={10} suffix="%" />
                </h3>
                <p className="text-gray-500 text-[13px] sm:text-[14px] font-medium">Increase in productivity</p>
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
