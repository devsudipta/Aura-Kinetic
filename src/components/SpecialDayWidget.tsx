import { useState, useEffect } from 'react';
import { Landmark } from 'lucide-react';

interface HistoryEvent {
  year: number;
  text: string;
}

const SpecialDayWidget = () => {
  const [historyEvents, setHistoryEvents] = useState<HistoryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;
        
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        const events: HistoryEvent[] = data.events || [];

        // Sort events by year (most recent first)
        events.sort((a, b) => b.year - a.year);

        setHistoryEvents(events);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching historical events:", err);
        setError("Unavailable");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const color = '#ff3b30'; // Theme color for the special day widget (Kinetic red-orange)

  return (
    <div className="flex flex-col gap-4 w-full max-w-[300px] h-[380px] bg-[#16161c]/60 backdrop-blur-md rounded-[2rem] border border-white/5 shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_10px_20px_rgba(0,0,0,0.5)] p-5 relative overflow-hidden pointer-events-auto group cursor-default">
      
      {/* Background radial glow */}
      <div 
        className="absolute -top-10 -right-10 w-32 h-32 opacity-10 blur-2xl transition-opacity duration-1000 group-hover:opacity-20 pointer-events-none z-0"
        style={{ backgroundColor: color }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-4 z-10 shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#1b1c20] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] border border-white/5 flex items-center justify-center shrink-0">
          <Landmark size={18} className={`text-[${color}] drop-shadow-[0_0_8px_rgba(255,59,48,0.4)] transition-transform duration-500 group-hover:scale-110`} fill="currentColor" />
        </div>
        <div>
          <h2 className="text-white font-bold tracking-wider text-sm">On This Day</h2>
          <span className="text-[10px] text-[#6c6c76] uppercase tracking-widest font-semibold block mt-0.5">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto pr-3 z-10 flex flex-col gap-4 relative [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20 pb-4">
        {loading ? (
           <div className="flex flex-col gap-3 animate-pulse mt-2">
             <div className="w-full h-12 bg-white/5 rounded-xl" />
             <div className="w-5/6 h-12 bg-white/5 rounded-xl" />
             <div className="w-full h-12 bg-white/5 rounded-xl" />
             <div className="w-4/5 h-12 bg-white/5 rounded-xl" />
           </div>
        ) : error ? (
           <span className="text-xs text-red-500/70 font-medium tracking-wider text-center mt-4">{error}</span>
        ) : historyEvents.length === 0 ? (
           <span className="text-xs text-[#6c6c76] font-medium tracking-wider text-center mt-4">No historical events found.</span>
        ) : (
          historyEvents.map((evt, idx) => (
            <div key={idx} className="group/item flex gap-3 text-[#8a8a9a] hover:text-white transition-colors duration-300">
               <div className="mt-0.5 flex flex-col items-end shrink-0 w-8">
                 <span className={`text-[11px] font-bold text-[${color}] tracking-wider`}>{evt.year}</span>
                 <div className="w-1 h-1 rounded-full bg-white/10 mt-1.5 group-hover/item:bg-[#ff3b30]/50 transition-colors" />
               </div>
               <div className="text-[11px] leading-relaxed border-l-[1.5px] border-white/5 pl-3 py-0.5 group-hover/item:border-[#ff3b30]/30 transition-colors duration-300">
                 {evt.text}
               </div>
            </div>
          ))
        )}
      </div>
      
      {/* Gentle gradient overlay for bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#16161c] to-transparent pointer-events-none z-20" />
    </div>
  );
};

export default SpecialDayWidget;
