import { motion } from 'framer-motion';

export const Gears = ({ time }: { time: Date }) => {
  const seconds = time.getSeconds();
  const ms = time.getMilliseconds();
  const minutes = time.getMinutes();

  // Rotations
  const secRotate = (seconds + ms / 1000) * 6; 
  const minRotate = (minutes + seconds / 60) * 6;

  // Speeds for dynamic visual interlocking
  const speedFast = secRotate;
  const speedMedium = secRotate * 0.4;
  const speedSlow = secRotate * 0.2;
  const speedReverse = -secRotate * 0.3;
  const speedReverseSlow = -secRotate * 0.15;
  const speedReverseFast = -secRotate * 0.8;

  // SVG Gear Generator helper
  const renderGear = (radius: number, dasharray: string) => (
    <>
      <circle cx="0" cy="0" r={radius} fill="#111115" stroke="#2c2c34" strokeWidth="6" strokeDasharray={dasharray} />
      <circle cx="0" cy="0" r={radius - 8} fill="none" stroke="#1b1c20" strokeWidth="4" />
      <circle cx="0" cy="0" r={Math.max(radius * 0.3, 10)} fill="#16161c" stroke="#3a3a45" strokeWidth="2" />
      <circle cx="0" cy="0" r={Math.max(radius * 0.1, 4)} fill="#2c2c34" />
      {/* Spokes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1="0" y1={-radius + 8} x2="0" y2={Math.max(radius * 0.3, 10)} stroke="#1b1c20" strokeWidth="3" transform={`rotate(${i * 45})`} />
      ))}
    </>
  );

  return (
    <div className="absolute inset-0 overflow-hidden rounded-full opacity-35 pointer-events-none flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 500 500" className="absolute z-0">
        <defs>
          <g id="g-huge">{renderGear(240, "20 15")}</g>
          <g id="g-xl">{renderGear(180, "15 12")}</g>
          <g id="g-l">{renderGear(120, "12 10")}</g>
          <g id="g-m">{renderGear(80, "10 8")}</g>
          <g id="g-s">{renderGear(50, "8 6")}</g>
          <g id="g-xs">{renderGear(30, "6 5")}</g>
        </defs>

        {/* Outer-most containing gear accent */}
        <motion.g style={{ x: 250, y: 250, rotate: speedSlow }}>
          <circle cx="0" cy="0" r="248" fill="none" stroke="#2c2c34" strokeWidth="2" strokeDasharray="4 8" />
        </motion.g>

        {/* Center System */}
        <motion.g style={{ x: 250, y: 250, rotate: speedFast }}>
          <use href="#g-m" />
        </motion.g>

        {/* Top Left Massive Gear */}
        <motion.g style={{ x: 60, y: 100, rotate: speedReverse }}>
          <use href="#g-huge" />
        </motion.g>

        {/* Bottom Right Giant Gear */}
        <motion.g style={{ x: 420, y: 400, rotate: speedReverseSlow }}>
          <use href="#g-xl" />
        </motion.g>
        
        {/* Top Right Medium Gear */}
        <motion.g style={{ x: 380, y: 140, rotate: speedMedium }}>
          <use href="#g-l" />
        </motion.g>

        {/* Bottom Left Interlocking Gear */}
        <motion.g style={{ x: 130, y: 380, rotate: speedReverseFast }}>
          <use href="#g-l" />
        </motion.g>

        {/* Extra small gears intertwining near center */}
        <motion.g style={{ x: 250, y: 150, rotate: speedReverseFast }}>
          <use href="#g-s" />
        </motion.g>
        
        <motion.g style={{ x: 170, y: 250, rotate: minRotate * -2 }}>
          <use href="#g-s" />
        </motion.g>
        
        <motion.g style={{ x: 310, y: 290, rotate: speedFast }}>
          <use href="#g-xs" />
        </motion.g>

      </svg>
    </div>
  );
};

export default Gears;
