import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import Ring from './Ring';
import Gears from './Gears';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      setTime(new Date());
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  // For time-scrubbing interactions
  const dragRotation = useMotionValue(0);
  const springRotation = useSpring(dragRotation, { stiffness: 100, damping: 20 });

  const [isScrubbing, setIsScrubbing] = useState(false);

  const handleDragStart = () => setIsScrubbing(true);
  const handleDragEnd = () => {
    setIsScrubbing(false);
    dragRotation.set(0); // Snap back to real time
  };

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  // Smooth rotation for analogue hands
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6 + milliseconds * 0.006;

  return (
    <div className="relative flex items-center justify-center w-[400px] h-[400px] md:w-[500px] md:h-[500px]">

      {/* Massive System-Wide Gear Mechanism Background */}
      <div className="absolute inset-0 z-0">
        <Gears time={time} />
      </div>

      {/* Rings container */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ rotate: isScrubbing ? dragRotation : springRotation }}
        >
          <Ring type="year" currentTime={time} radius={220} />
          <Ring type="outer" currentTime={time} radius={180} />
          <Ring type="middle" currentTime={time} radius={140} />
          <Ring type="inner" currentTime={time} radius={100} />
        </motion.div>
      </div>

      {/* Central Unique Analog Clock Core */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        
        <div className="relative w-32 h-32 rounded-full bg-[#1b1c20] shadow-[inset_0_2px_15px_rgba(0,0,0,0.8),0_10px_20px_rgba(0,0,0,0.6)] flex items-center justify-center border border-white/5 overflow-hidden">

          {/* Detailed Clock Markings (Ticks) */}
          {Array.from({ length: 60 }).map((_, i) => {
            const isHour = i % 5 === 0;
            return (
              <div
                key={i}
                className="absolute w-full h-full flex justify-center"
                style={{ rotate: `${i * 6}deg` }}
              >
                <div 
                  className={`rounded-full mt-1.5 ${
                    isHour 
                      ? 'w-[2px] h-2.5 bg-[#5c5c66]' 
                      : 'w-[1px] h-1.5 bg-[#5c5c66]/30' 
                  }`} 
                />
              </div>
            );
          })}

          {/* Center Pivot */}
          <div className="absolute z-30 w-2.5 h-2.5 rounded-full bg-[#2c2c34] border-[1px] border-[#5c5c66] shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
          
          {/* Unique Hour Hand: Thick with a hollow slit */}
          <div className="absolute w-full h-full flex justify-center">
            <motion.div 
              className="absolute bottom-1/2 w-2.5 flex justify-center origin-bottom"
              style={{ height: '35px', rotate: hourAngle }}
            >
              <div className="w-full h-full bg-white rounded-[2px] shadow-sm" />
              {/* Slit inside hand */}
              <div className="absolute top-1.5 w-0.5 h-[18px] bg-[#1b1c20] rounded-sm pointer-events-none" />
            </motion.div>
          </div>
          
          {/* Minute Hand: Sleek, long */}
          <div className="absolute w-full h-full flex justify-center">
            <motion.div 
              className="absolute bottom-1/2 w-1.5 bg-white rounded-[2px] origin-bottom shadow-[0_0_8px_rgba(255,255,255,0.15)]"
              style={{ height: '52px', rotate: minuteAngle }}
            />
          </div>

          {/* Second Hand: Sweeping colored needle with counterweight */}
          <div className="absolute w-full h-full flex justify-center">
            <motion.div 
              className="absolute bottom-[40%] w-[1.5px] bg-[#ff3b30] rounded-full origin-[center_80%] shadow-[0_0_8px_rgba(255,59,48,0.6)]"
              style={{ height: '64px', rotate: secondAngle }}
            />
          </div>
          
        </div>
      </div>

      {/* Scrubbing Overlay */}
      <motion.div
        className="absolute inset-[30px] z-30 rounded-full cursor-grab active:cursor-grabbing border-2 border-transparent hover:border-white/5 transition-colors pointer-events-auto"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.4}
        onDragStart={handleDragStart}
        onDrag={(_, info) => dragRotation.set(info.offset.x)}
        onDragEnd={handleDragEnd}
        title="Drag left/right to scrub time"
      />
    </div>
  );
};

export default Clock;
