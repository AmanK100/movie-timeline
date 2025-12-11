import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ==========================================
// CONFIGURATION
// ==========================================
const START_YEAR = 1950;
const END_YEAR = 2024;
const YEARS = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i);
const DECADES = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

// ==========================================
// COMPONENT: DECADE SELECTOR (HOME)
// ==========================================
const DecadeSelector = ({ onSelect }) => {
  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-neutral-950">
      {DECADES.map((decade, index) => (
        <motion.div
          key={decade}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelect(decade)}
          className="relative flex-1 group cursor-pointer border-b md:border-b-0 md:border-r border-white/10 hover:bg-neutral-900 transition-colors duration-500 flex items-center justify-center overflow-hidden"
        >
          {/* Background Number Faded */}
          <span className="absolute text-9xl font-black text-white/5 group-hover:text-white/10 transition-colors scale-150 select-none">
            {decade.toString().slice(2)}
          </span>

          {/* Foreground Text */}
          <div className="z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter group-hover:scale-110 transition-transform duration-300">
              {decade}s
            </h2>
            <div className="w-0 group-hover:w-full h-0.5 bg-red-600 mt-4 transition-all duration-300 mx-auto" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ==========================================
// COMPONENT: TIMELINE VIEW
// ==========================================
const Timeline = ({ startDecade, onBack }) => {
  const scrollRef = useRef(null);

  // Auto-scroll to the selected decade on mount
  useEffect(() => {
    if (scrollRef.current && startDecade) {
      const yearElement = document.getElementById(`year-${startDecade}`);
      if (yearElement) {
        // Calculate center position
        const container = scrollRef.current;
        const scrollLeft = yearElement.offsetLeft - (container.clientWidth / 2) + (yearElement.clientWidth / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [startDecade]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full bg-neutral-950 flex flex-col"
    >
      {/* Header / Nav */}
      <div className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack}
          className="pointer-events-auto px-6 py-2 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-neutral-300 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          ← Decades
        </button>
        <h1 className="text-white/30 font-mono text-sm tracking-[0.2em] uppercase">
          Timeline {START_YEAR} — {END_YEAR}
        </h1>
      </div>

      {/* Scrollable Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-x-auto no-scrollbar flex items-center relative cursor-grab active:cursor-grabbing"
        // Optional: Enable drag-to-scroll logic here if desired, otherwise native scroll works
      >
        {/* The Central Line */}
        <div className="absolute top-1/2 left-0 w-[max-content] h-0.5 bg-white/20 min-w-full" style={{ width: `${YEARS.length * 300}px` }} />

        {/* Years */}
        <div className="flex px-[50vw]"> {/* Padding ensures first/last years can be centered */}
          {YEARS.map((year) => {
            const isDecade = year % 10 === 0;
            return (
              <div 
                key={year}
                id={`year-${year}`}
                className="relative flex flex-col items-center justify-center shrink-0 w-[300px] group"
              >
                {/* Tick Mark */}
                <div 
                  className={`w-0.5 transition-all duration-300 bg-white 
                    ${isDecade ? 'h-16 group-hover:h-24 bg-white' : 'h-8 group-hover:h-16 bg-white/50'}
                  `} 
                />

                {/* Dot on the line */}
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-black border-2 border-white rounded-full group-hover:scale-150 group-hover:bg-white transition-all duration-300 z-10" />

                {/* Year Number */}
                <h3 
                  className={`mt-8 font-mono transition-all duration-300 select-none
                    ${isDecade ? 'text-4xl text-white font-bold' : 'text-xl text-white/50 font-normal'}
                    group-hover:text-white group-hover:text-5xl group-hover:font-black
                  `}
                >
                  {year}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN APP
// ==========================================
function App() {
  const [view, setView] = useState('home'); // 'home' | 'timeline'
  const [selectedDecade, setSelectedDecade] = useState(null);

  const handleDecadeSelect = (decade) => {
    setSelectedDecade(decade);
    setView('timeline');
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-black text-white">
      {view === 'home' ? (
        <DecadeSelector onSelect={handleDecadeSelect} />
      ) : (
        <Timeline 
          startDecade={selectedDecade} 
          onBack={() => setView('home')} 
        />
      )}
    </div>
  );
}

export default App;