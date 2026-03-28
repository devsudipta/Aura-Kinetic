import { useState, useEffect } from 'react';
import Clock from './components/Clock';
import WeatherWidget from './components/WeatherWidget';
import SpecialDayWidget from './components/SpecialDayWidget';
import EarthBackground from './components/EarthBackground';
import { ShieldAlert } from 'lucide-react';

const App = () => {
  const [securityMessage, setSecurityMessage] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: number;
    
    const showMessage = (msg: string) => {
      setSecurityMessage(msg);
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setSecurityMessage(null), 3000);
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showMessage("Right-click is disabled for security reasons.");
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12') {
        e.preventDefault();
        showMessage("Inspection tools are disabled.");
      }
      if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
        e.preventDefault();
        showMessage("Inspection tools are disabled.");
      }
      if (e.ctrlKey && e.key.toUpperCase() === 'U') {
        e.preventDefault();
        showMessage("Viewing source is disabled.");
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-transparent flex flex-col items-center justify-center p-4 lg:p-12 overflow-hidden relative">

      <EarthBackground />

      {/* Security Toast Notification */}
      {securityMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#ff3b30]/10 border border-[#ff3b30]/40 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-[0_0_20px_rgba(255,59,48,0.2)] flex items-center gap-3 transition-opacity">
          <ShieldAlert size={16} className="text-[#ff3b30]" />
          <span className="text-white text-xs md:text-sm font-medium tracking-wider">{securityMessage}</span>
        </div>
      )}

      {/* Top Title */}
      <div className="absolute top-8 left-0 w-full flex justify-center z-30 pointer-events-none">
        <h1 className="text-xl md:text-3xl font-light tracking-[0.3em] uppercase text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
          Aura <span className="font-bold text-[#ff3b30]">Kinetic</span>
        </h1>
      </div>

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 sm:gap-8 lg:gap-16 items-center justify-center h-full relative z-10 pt-20 pb-16 lg:pt-16 lg:pb-12">

        {/* Left Side Widget */}
        <div className="order-2 lg:order-1 flex justify-center lg:justify-end w-full">
          <WeatherWidget />
        </div>

        {/* Center Clock Widget - Scaled Responsively to prevent horizontal scroll on mobile */}
        <div className="order-1 lg:order-2 flex items-center justify-center w-full h-[320px] sm:h-[400px] md:h-[500px] mb-8 lg:mb-0">
          <div className="scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 origin-center transition-transform duration-500">
            <Clock />
          </div>
        </div>

        {/* Right Side Widget */}
        <div className="order-3 lg:order-3 flex justify-center lg:justify-start w-full">
          <SpecialDayWidget />
        </div>

      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 w-full flex justify-center z-30">
        <p className="text-[#8a8a9a] text-[10px] md:text-xs font-mono tracking-widest uppercase flex items-center gap-2.5">
          <span>
            Developed by{' '}
            <a href="https://sudiptaroy.info" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#ff3b30] transition-colors duration-300 font-semibold border-b border-white/20 hover:border-[#ff3b30] pb-[1px]">
              Sudiptaroy Akash
            </a>
          </span>
          <span className="text-white/20">|</span>
          <span className="opacity-60">v1.0.0</span>
        </p>
      </div>

    </div>
  );
};

export default App;
