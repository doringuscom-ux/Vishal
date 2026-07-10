import { Check, Factory, Hammer, Truck, Package, PackageOpen, Settings, ChevronRight, Mountain, Pickaxe } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="pt-12 pb-12 md:pt-16 md:pb-16 bg-[#f8f9fa] relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        <div className="flex flex-col lg:flex-row rounded-[32px] overflow-hidden shadow-2xl bg-[#08182f] border border-white/10">

          {/* About Vishal Industries */}
          <div className="flex-1 p-10 lg:p-14 xl:p-16 relative group">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1504917595217-d4f50068c2aa?auto=format&fit=crop&q=80&w=800&h=1000")', backgroundSize: 'cover' }}></div>

            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white">
              <h4 className="text-brandOrange font-bold tracking-widest mb-4 text-[13px] uppercase">
                Who We Are
              </h4>
              <h2 className="text-[32px] lg:text-[38px] xl:text-[44px] font-bold mb-8 text-white leading-tight tracking-tight">
                About Vishal Industries
              </h2>
              <p className="text-white/80 mb-6 leading-relaxed text-[15px] xl:text-[16px] font-medium">
                Vishal Industries is a trusted manufacturer of high-quality conveyor rollers, drum pulleys, idler frames, and crusher machine components.
              </p>
              <p className="text-white/60 leading-relaxed text-[14px] xl:text-[15px]">
                Our products are built with precision, durability, and performance to meet the demand of heavy-duty industrial applications. Customer satisfaction and uncompromised quality are our top priorities.
              </p>

              <div className="mt-10">
                <a href="#contact" className="inline-flex items-center gap-2 text-white font-bold text-[14px] uppercase tracking-wider hover:text-brandOrange hover:gap-4 transition-all">
                  Contact Us <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Industries We Serve (Center Focus) */}
          <div id="industries-section" className="flex-1 p-10 lg:p-14 xl:p-16 bg-[#1a56db] relative flex flex-col justify-center items-center text-center shadow-[0_0_50px_rgba(26,86,219,0.5)] z-10">
            {/* Subtle glow inside center */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

            <h4 className="text-white/80 font-bold tracking-widest mb-4 text-[13px] uppercase relative z-10">
              Applications
            </h4>
            <h2 className="text-[32px] lg:text-[38px] xl:text-[44px] font-bold mb-10 text-white leading-tight tracking-tight relative z-10">
              Industries We Empower
            </h2>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 w-full max-w-[320px] relative z-10">
              <IndustryIcon icon={<Mountain className="w-6 h-6 xl:w-7 xl:h-7 animate-shake" />} title="Stone Crusher" />
              <IndustryIcon icon={<Pickaxe className="w-6 h-6 xl:w-7 xl:h-7 animate-swing origin-bottom" />} title="Mining Industry" />
              <IndustryIcon icon={<Factory className="w-6 h-6 xl:w-7 xl:h-7 animate-breathe" />} title="Cement Plants" />
              <IndustryIcon
                title="Material Handling"
                icon={
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute right-[50%] bottom-[20%] w-1.5 h-1.5 bg-white/40 rounded-full animate-dust opacity-0 blur-[1px]"></div>
                    <div className="absolute right-[60%] bottom-[30%] w-2 h-2 bg-white/30 rounded-full animate-dust opacity-0 blur-[1px]" style={{ animationDelay: '0.4s' }}></div>
                    <Truck className="w-6 h-6 xl:w-7 xl:h-7 animate-drive relative z-10" />
                  </div>
                }
              />
              <IndustryIcon icon={<PackageOpen className="w-6 h-6 xl:w-7 xl:h-7 animate-breathe" />} title="Packaging Industry" />
              <IndustryIcon icon={<Settings className="w-6 h-6 xl:w-7 xl:h-7 animate-spin-slow" />} title="Other Applications" />
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="flex-1 p-10 lg:p-14 xl:p-16 relative flex flex-col justify-center items-center text-center">
            <h4 className="text-brandOrange font-bold tracking-widest mb-4 text-[13px] uppercase">
              Our Advantages
            </h4>
            <h2 className="text-[32px] lg:text-[38px] xl:text-[44px] font-bold mb-10 text-white leading-tight tracking-tight">
              Why Choose Us?
            </h2>

            <ul className="space-y-6 inline-flex flex-col text-left">
              {[
                "Manufacturer Direct Pricing",
                "Premium Quality Raw Materials",
                "Custom Sizes & Specifications",
                "Heavy Duty Construction",
                "Bulk Supply Capability",
                "Timely Delivery Guaranteed",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 group cursor-default">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brandOrange transition-colors duration-300 shrink-0">
                    <Check className="text-brandOrange group-hover:text-white w-4 h-4 transition-colors duration-300" strokeWidth={3} />
                  </div>
                  <span className="text-gray-300 group-hover:text-white text-[14px] xl:text-[15px] font-medium transition-colors duration-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

function IndustryIcon({ icon, title }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 xl:gap-4 group cursor-pointer">
      <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#f37a1f] group-hover:border-[#f37a1f] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 shadow-sm group-hover:shadow-[0_10px_20px_rgba(243,122,31,0.4)]">
        {icon}
      </div>
      <span className="text-[12px] xl:text-[14px] font-bold text-white/80 leading-tight group-hover:text-white transition-colors">{title}</span>
    </div>
  );
}
