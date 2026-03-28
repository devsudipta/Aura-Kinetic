import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

type RingType = 'year' | 'outer' | 'middle' | 'inner';

interface RingProps {
  type: RingType;
  currentTime: Date;
  radius: number;
}

const generateItems = (type: RingType) => {
  if (type === 'year') {
    const currentYear = new Date().getFullYear();
    // Generate 12 years around the dial: 5 years past, current, 6 years future
    return Array.from({ length: 12 }, (_, i) => ({
      value: currentYear - 5 + i,
      label: (currentYear - 5 + i).toString()
    }));
  }
  if (type === 'outer') {
    return Array.from({ length: 31 }, (_, i) => ({ 
      value: i + 1, 
      label: (i + 1).toString().padStart(2, '0') 
    }));
  }
  if (type === 'middle') {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return months.map((m, i) => ({ value: i, label: m }));
  }
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return days.map((d, i) => ({ value: i, label: d }));
};

const Ring: React.FC<RingProps> = ({ type, currentTime, radius }) => {
  const items = useMemo(() => generateItems(type), [type]);
  const itemCount = items.length;
  const angleStep = 360 / itemCount;

  // Determine current active item index
  let activeIndex = 0;
  if (type === 'year') {
    activeIndex = items.findIndex(item => item.value === currentTime.getFullYear());
    if (activeIndex === -1) activeIndex = 0;
  }
  else if (type === 'outer') activeIndex = currentTime.getDate() - 1; 
  else if (type === 'middle') activeIndex = currentTime.getMonth();
  else if (type === 'inner') activeIndex = currentTime.getDay();

  const targetRotation = -activeIndex * angleStep;

  // Distinct colors for each active ring item text
  const isActiveColor = type === 'year' ? '#bf5af2' : type === 'outer' ? '#ff3b30' : type === 'middle' ? '#0a84ff' : '#30d158';
  const labelSize = 'text-[11px] font-bold tracking-widest';

  return (
    <motion.div
      className="absolute inset-0 w-full h-full origin-center pointer-events-none"
      initial={{ rotate: targetRotation }}
      animate={{ rotate: targetRotation }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
    >
      {/* Subtle Background Track without colored progress line */}
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <circle 
          cx="50%" cy="50%" r={radius} 
          fill="none" 
          stroke="#1b1c20" 
          strokeWidth="16" 
        />
      </svg>
      
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const currentAngle = index * angleStep;
        
        // Ensure text stands properly perpendicular to the circle center radially
        const transformX = radius * Math.sin((currentAngle * Math.PI) / 180);
        const transformY = -radius * Math.cos((currentAngle * Math.PI) / 180);

        return (
          <div
            key={item.label}
            className={`absolute top-1/2 left-1/2 transition-all duration-700 ease-in-out flex items-center justify-center ${labelSize}`}
            style={{
              transform: `translate(-50%, -50%) translate(${transformX}px, ${transformY}px) rotate(${currentAngle}deg)`,
              color: isActive ? isActiveColor : '#5c5c66',
              textShadow: isActive ? `0 0 8px ${isActiveColor}40` : 'none',
              opacity: isActive ? 1 : 0.8,
            }}
          >
            {item.label}
          </div>
        );
      })}
    </motion.div>
  );
};

export default Ring;
