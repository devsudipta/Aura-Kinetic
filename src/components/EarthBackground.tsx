import { useMemo } from 'react';

const EarthBackground = () => {
  // Generate random stars for the background
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => {
      const size = Math.random() * 2 + 0.5;
      return {
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: Math.random() * 0.7 + 0.1,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 3 + 2}s`,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#020205] overflow-hidden -z-20 pointer-events-none">
      {/* Stars Layer */}
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: star.width,
              height: star.height,
              opacity: (star.opacity * 0.8), /* Brighter stars for deep space */
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Sun Light Source Glow / Nebula (Top Left) */}
      <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-[#fffae6] opacity-[0.06] blur-[150px] rounded-full mix-blend-screen z-10" />

      {/* Distant Blue Nebula (Bottom Right) */}
      <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-[#4da6ff] opacity-[0.04] blur-[150px] rounded-full mix-blend-screen z-10" />
      
      {/* Deep Space Atmosphere Overlay to give depth */}
      <div className="absolute inset-0 bg-[#020205]/10 z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020205]/20 to-[#020205]/90 z-20 pointer-events-none" />
    </div>
  );
};

export default EarthBackground;
