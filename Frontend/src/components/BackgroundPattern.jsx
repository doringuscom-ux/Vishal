import { useEffect, useState } from 'react';

export default function BackgroundPattern() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Standard subtle pattern
  const patternUrl = `url("data:image/svg+xml,%3Csvg width='44' height='78' viewBox='0 0 44 78' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 39l22-12.7V0L22 12.7 0 0v26.3L22 39zm0 0L0 51.7V78l22-12.7L44 78V51.7L22 39z' fill='none' fill-rule='evenodd' stroke='%23e2e8f0' stroke-width='1'/%3E%3C/svg%3E")`;
  
  // Highlighted blue pattern for the spotlight effect
  const activePatternUrl = `url("data:image/svg+xml,%3Csvg width='44' height='78' viewBox='0 0 44 78' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 39l22-12.7V0L22 12.7 0 0v26.3L22 39zm0 0L0 51.7V78l22-12.7L44 78V51.7L22 39z' fill='none' fill-rule='evenodd' stroke='%231a56db' stroke-width='2'/%3E%3C/svg%3E")`;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#f8f9fa]">
      {/* Base Grid */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{ 
          backgroundImage: patternUrl,
          backgroundSize: '44px 78px'
        }}
      />
      
      {/* Interactive Highlighted Grid (The Zoom Spotlight) */}
      <div 
        className="absolute inset-0"
        style={{
          maskImage: `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
        }}
      >
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: activePatternUrl,
            backgroundSize: '44px 78px',
            transform: 'scale(1.15)', // Creates the "zoom" popping effect in the spotlight
          }}
        />
      </div>
    </div>
  );
}
