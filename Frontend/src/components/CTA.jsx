import { useRef, useEffect } from 'react';
import { ArrowRight, Settings } from 'lucide-react';

export default function CTA() {
  const modelRef = useRef(null);
  const rotationRef = useRef({ x: -15, y: 0 });
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

  // High-performance Auto-rotation loop using requestAnimationFrame (No React re-renders!)
  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      if (!isDraggingRef.current && !isHoveringRef.current) {
        rotationRef.current.y = (rotationRef.current.y + 0.3) % 360;
        if (modelRef.current) {
          modelRef.current.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    
    rotationRef.current.x = Math.max(-60, Math.min(60, rotationRef.current.x - deltaY * 0.4));
    rotationRef.current.y = rotationRef.current.y + deltaX * 0.6;
    
    if (modelRef.current) {
      modelRef.current.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
    }
    
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };
  
  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    isHoveringRef.current = false;
  };
  
  const handleMouseEnter = () => {
    isHoveringRef.current = true;
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 bg-[#0a1f3c]"></div>
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-fixed mix-blend-overlay"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4f50068c2aa?auto=format&fit=crop&q=80')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f3c] via-[#0a1f3c]/80 to-transparent"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Content */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f37a1f]/20 text-[#f37a1f] font-bold text-sm mb-6 border border-[#f37a1f]/30 backdrop-blur-md">
              <Settings className="w-4 h-4 animate-spin-slow" />
              <span>Industrial Excellence</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              Need High Quality <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f37a1f] to-[#ffb077]">
                Conveyor Rollers
              </span> <br />
              for your plant?
            </h2>
            
            <p className="text-white/80 text-[16px] md:text-xl mb-10 max-w-2xl leading-relaxed">
              Partner with Vishal Industries for premium, heavy-duty industrial components designed for maximum durability and uncompromised performance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                className="bg-[#1a56db] hover:bg-[#1546b5] text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-[0_10px_30px_rgba(26,86,219,0.3)] hover:shadow-[0_15px_40px_rgba(26,86,219,0.5)]"
              >
                Get In Touch Today <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#products" 
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/20 hover:border-white/40"
              >
                Explore Products
              </a>
            </div>
          </div>
          
          {/* Right Side: Blueprint Visual */}
          <div className="hidden lg:flex justify-end pr-10">
            <div className="relative w-[450px] h-[450px] group">
              
              {/* Inner Blueprint Container WITH overflow-hidden */}
              <div className="absolute inset-0 rounded-[30px] border border-[#38bdf8]/30 bg-[#051329] overflow-hidden shadow-[0_0_50px_rgba(14,165,233,0.15)]">
                
                {/* Blueprint Grid Background */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.4) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                  }}
                ></div>
                
                {/* Corner crosshairs */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#38bdf8]/60"></div>
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#38bdf8]/60"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#38bdf8]/60"></div>
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#38bdf8]/60"></div>
                
                {/* Animated Scanline */}
                <style>{`
                  @keyframes scanline {
                    0% { top: -10%; }
                    50% { top: 110%; }
                    100% { top: -10%; }
                  }
                  .laser-scan {
                    animation: scanline 4s ease-in-out infinite;
                  }
                  .preserve-3d {
                    transform-style: preserve-3d;
                  }
                `}</style>
                <div className="absolute left-0 right-0 h-[2px] bg-[#38bdf8] shadow-[0_0_20px_#38bdf8] laser-scan z-30 opacity-70"></div>
                
                {/* Technical Data Overlay */}
                <div className="absolute top-6 right-6 text-right font-mono text-[#38bdf8]/70 text-[10px] leading-tight z-20 hidden md:block select-none pointer-events-none">
                  <div>SYS.CHK: OK</div>
                  <div>MOD: CR-500X</div>
                  <div>TOLERANCE: ±0.01</div>
                  <div className="mt-2 text-white/50 text-[9px] animate-pulse">CLICK TO ROTATE</div>
                </div>

                {/* True 3D CSS Rotating Wireframe (Interactive) */}
                <div 
                  className="absolute inset-0 flex items-center justify-center z-10 cursor-grab active:cursor-grabbing" 
                  style={{ perspective: '1200px' }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onMouseEnter={handleMouseEnter}
                >
                  <div 
                    ref={modelRef}
                    className="relative w-[240px] h-[340px] preserve-3d"
                    style={{ transform: 'rotateX(-15deg) rotateY(0deg)' }}
                  >
                    
                    {/* Main Roller Body (Radius 100px, Height 200px) */}
                    {/* Top Face */}
                    <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] -mt-[100px] -ml-[100px] border-2 border-[#38bdf8] rounded-full shadow-[0_0_15px_rgba(56,189,248,0.3)_inset] pointer-events-none" style={{ transform: 'rotateX(90deg) translateZ(100px)' }}></div>
                    {/* Bottom Face */}
                    <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] -mt-[100px] -ml-[100px] border-2 border-[#38bdf8] rounded-full shadow-[0_0_15px_rgba(56,189,248,0.3)_inset] pointer-events-none" style={{ transform: 'rotateX(90deg) translateZ(-100px)' }}></div>
                    
                    {/* Vertical Surface Lines for Body */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                      <div key={`body-${deg}`} className="absolute top-1/2 left-1/2 w-[2px] h-[200px] -mt-[100px] -ml-[1px] bg-[#38bdf8]/60 shadow-[0_0_5px_rgba(56,189,248,0.5)] pointer-events-none" style={{ transform: `rotateY(${deg}deg) translateZ(100px)` }}></div>
                    ))}

                    {/* Central Shaft (Radius 25px, Height 300px) */}
                    {/* Top Face */}
                    <div className="absolute top-1/2 left-1/2 w-[50px] h-[50px] -mt-[25px] -ml-[25px] border-2 border-[#f37a1f] rounded-full pointer-events-none" style={{ transform: 'rotateX(90deg) translateZ(150px)' }}></div>
                    {/* Bottom Face */}
                    <div className="absolute top-1/2 left-1/2 w-[50px] h-[50px] -mt-[25px] -ml-[25px] border-2 border-[#f37a1f] rounded-full pointer-events-none" style={{ transform: 'rotateX(90deg) translateZ(-150px)' }}></div>
                    
                    {/* Vertical Surface Lines for Shaft */}
                    {[0, 90, 180, 270].map(deg => (
                      <div key={`shaft-${deg}`} className="absolute top-1/2 left-1/2 w-[2px] h-[300px] -mt-[150px] -ml-[1px] bg-[#f37a1f]/80 pointer-events-none" style={{ transform: `rotateY(${deg}deg) translateZ(25px)` }}></div>
                    ))}
                    
                    {/* Central Axis Core */}
                    <div className="absolute top-1/2 left-1/2 w-px h-[340px] -mt-[170px] border-l-2 border-dashed border-white/50 pointer-events-none" style={{ transform: 'rotateY(0deg)' }}></div>

                    {/* Measurements Floating in 3D Space */}
                    <div className="absolute top-1/2 left-1/2 text-[#38bdf8] font-mono text-[14px] whitespace-nowrap bg-[#051329]/80 px-2 py-1 rounded border border-[#38bdf8]/30 pointer-events-none" style={{ transform: 'rotateY(-45deg) translateZ(120px) translateY(0px)' }}>
                      L = 300mm
                    </div>
                    <div className="absolute top-1/2 left-1/2 text-[#f37a1f] font-mono text-[14px] whitespace-nowrap bg-[#051329]/80 px-2 py-1 rounded border border-[#f37a1f]/30 pointer-events-none" style={{ transform: 'rotateY(45deg) translateZ(120px) translateY(-110px)' }}>
                      Ø 114mm
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
      
      {/* Decorative gear background element */}
      <Settings className="absolute -bottom-32 -left-32 w-96 h-96 text-white/5 animate-spin-slow opacity-50" strokeWidth={1} />
    </section>
  );
}
