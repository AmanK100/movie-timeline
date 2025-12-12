import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProcessedData } from './oscarData';

// ==========================================
// CONFIGURATION
// ==========================================
const START_YEAR = 1950;
const END_YEAR = 2024;
const YEARS = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i);
const ITEM_WIDTH = 300; 

// SHARED FONT CLASS
const YEAR_FONT_CLASS = "font-mono text-5xl md:text-6xl font-bold tracking-tighter select-none";

// ==========================================
// COMPONENT: ARTWORK QUADRANT (Updated: No Text Overlay)
// ==========================================
const ArtworkQuadrant = ({ label, movieData, isHoveredExternally, onHoverChange, onClick }) => {
  const [imgError, setImgError] = useState(false);
  
  const imgSrc = movieData ? (movieData.artwork || movieData.poster) : null;

  // Visual State
  const brightness = isHoveredExternally ? "brightness-100" : "brightness-50";
  const scale = isHoveredExternally ? "scale-105" : "scale-100";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      onMouseEnter={() => onHoverChange(movieData?.title)}
      onMouseLeave={() => onHoverChange(null)}
      className="relative w-full h-full bg-neutral-900 overflow-hidden cursor-pointer group"
    >
      {/* Image Layer - Clean, no text on top */}
      <div className={`absolute inset-0 transition-all duration-500 ease-in-out filter ${brightness} ${scale}`}>
        {!imgError && imgSrc ? (
          <img 
            src={imgSrc} 
            alt={label} 
            className="w-full h-full object-cover"
            onError={() => setImgError(true)} 
          />
        ) : (
          <div className="w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" 
               style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(#555 1px, transparent 1px)' }}
          />
        )}
      </div>
    </motion.div>
  );
};

// ==========================================
// COMPONENT: SINGLE YEAR GRID VIEW
// ==========================================
const SingleYearView = ({ year, onBack }) => {
  const [hoveredTitle, setHoveredTitle] = useState(null);

  const yearData = useMemo(() => {
    const allData = getProcessedData(1950);
    return allData.find(item => item.filmYear === year);
  }, [year]);

  if (!yearData) return <div className="text-white p-10">Data not found for {year}</div>;

  const handleClick = (category) => {
    console.log(`Open Movie Page: ${category}`);
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
        <ArtworkQuadrant 
          label="Best Picture" 
          movieData={yearData.bestPicture} 
          isHoveredExternally={hoveredTitle === yearData.bestPicture?.title}
          onHoverChange={setHoveredTitle}
          onClick={() => handleClick("Best Picture")} 
        />
        <ArtworkQuadrant 
          label="Audience (Eng)" 
          movieData={yearData.highestRatedEnglish} 
          isHoveredExternally={hoveredTitle === yearData.highestRatedEnglish?.title}
          onHoverChange={setHoveredTitle}
          onClick={() => handleClick("Audience English")} 
        />
        <ArtworkQuadrant 
          label="Best International" 
          movieData={yearData.bestInternational} 
          isHoveredExternally={hoveredTitle === yearData.bestInternational?.title}
          onHoverChange={setHoveredTitle}
          onClick={() => handleClick("Best International")} 
        />
        <ArtworkQuadrant 
          label="Audience (Intl)" 
          movieData={yearData.highestRatedInternational} 
          isHoveredExternally={hoveredTitle === yearData.highestRatedInternational?.title}
          onHoverChange={setHoveredTitle}
          onClick={() => handleClick("Audience Intl")} 
        />
      </div>

      {/* CENTER YEAR BUTTON */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto cursor-pointer z-50 group hover:scale-105 transition-transform duration-300"
        >
          <span className={`${YEAR_FONT_CLASS} text-white drop-shadow-2xl`}>
            {year}
          </span>
        </button>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENT: TIMELINE VIEW
// ==========================================
const Timeline = ({ startDecade, focusYear, onBack, onSelectYear }) => {
  const scrollRef = useRef(null);
  const [activeYear, setActiveYear] = useState(null);

  const paddingStyle = { paddingInline: `calc(50vw - ${ITEM_WIDTH / 2}px)` };

  useEffect(() => {
    const targetId = focusYear ? `year-${focusYear}` : (startDecade ? `year-${startDecade}` : null);
    if (scrollRef.current && targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const container = scrollRef.current;
        const scrollLeft = targetElement.offsetLeft - (container.clientWidth / 2) + (ITEM_WIDTH / 2);
        
        container.scrollTo({ left: scrollLeft, behavior: 'auto' });
        
        const yearNum = parseInt(targetId.split('-')[1]);
        setActiveYear(yearNum);
      }
    }
  }, [startDecade, focusYear]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const centerIndex = Math.round(scrollLeft / ITEM_WIDTH);
      const currentYear = START_YEAR + centerIndex;
      
      if (currentYear !== activeYear && currentYear <= END_YEAR && currentYear >= START_YEAR) {
        setActiveYear(currentYear);
      }
    }
  };

  // JUMP HANDLER
  const handleJumpDecade = (direction) => {
    if (!activeYear || !scrollRef.current) return;

    const currentDecadeStart = Math.floor(activeYear / 10) * 10;
    let targetYear;

    if (direction === 'next') {
        targetYear = currentDecadeStart + 10;
    } else {
        targetYear = (activeYear === currentDecadeStart) ? currentDecadeStart - 10 : currentDecadeStart;
    }

    if (targetYear < START_YEAR) targetYear = START_YEAR;
    if (targetYear > END_YEAR) targetYear = 2020; 

    const targetElement = document.getElementById(`year-${targetYear}`);
    if (targetElement) {
      const container = scrollRef.current;
      const scrollLeft = targetElement.offsetLeft - (container.clientWidth / 2) + (ITEM_WIDTH / 2);
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full bg-neutral-950 flex flex-col"
    >
      <div className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack}
          className="pointer-events-auto text-white/40 hover:text-white font-mono text-sm uppercase tracking-[0.2em] transition-colors"
        >
          ← Decades
        </button>
        <h1 className="text-white/30 font-mono text-sm tracking-[0.2em] uppercase">
          Timeline {START_YEAR} — {END_YEAR}
        </h1>
      </div>

      {/* FOOTER NAV (JUMP BUTTONS) */}
      <div className="fixed bottom-0 left-0 w-full p-8 z-50 flex justify-between items-end pointer-events-none">
        <div className="pointer-events-auto">
          {activeYear > 1959 && (
            <button 
              onClick={() => handleJumpDecade('prev')}
              className="text-white/40 hover:text-white font-mono text-sm uppercase tracking-[0.2em] transition-colors"
            >
              ← Previous Decade
            </button>
          )}
        </div>

        <div className="pointer-events-auto">
          {activeYear < 2020 && (
            <button 
              onClick={() => handleJumpDecade('next')}
              className="text-white/40 hover:text-white font-mono text-sm uppercase tracking-[0.2em] transition-colors"
            >
              Next Decade →
            </button>
          )}
        </div>
      </div>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-x-auto no-scrollbar flex items-center relative snap-x snap-mandatory cursor-grab active:cursor-grabbing"
      >
        <div 
          className="absolute top-[38%] h-0.5 bg-white/20" 
          style={{ 
            left: '50vw', 
            width: `${(YEARS.length - 1) * ITEM_WIDTH}px` 
          }} 
        />

        <div className="flex h-full items-center" style={paddingStyle}> 
          {YEARS.map((year) => {
            const isDecade = year % 10 === 0;
            const isActive = year === activeYear;

            return (
              <div 
                key={year}
                id={`year-${year}`}
                onClick={() => isActive && onSelectYear(year)}
                className={`relative flex flex-col justify-center items-center shrink-0 h-full snap-center transition-all duration-300
                  ${isActive ? 'cursor-pointer opacity-100' : 'cursor-default opacity-20 scale-90'}
                `}
                style={{ width: `${ITEM_WIDTH}px` }}
              >
                <div className="absolute top-[38%] w-full flex flex-col items-center">
                   <div 
                    className={`absolute -translate-y-1/2 w-3 h-3 border-2 border-white rounded-full transition-all duration-300 z-10
                      ${isActive ? 'bg-white scale-150' : 'bg-black'}
                    `} 
                  />
                  <div 
                    className={`w-0.5 transition-all duration-300 bg-white origin-top
                      ${isDecade ? 'h-10' : 'h-5'} 
                      ${isActive ? 'h-16' : ''} 
                    `} 
                  />
                </div>
                
                <div className="pt-24"> 
                  <h3 className={`${YEAR_FONT_CLASS} ${isActive ? 'text-white' : 'text-white'}`}>
                    {year}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// COMPONENT: DECADE SELECTOR
// ==========================================
const DecadeSelector = ({ onSelect }) => {
  const decades = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="w-screen h-screen bg-black flex flex-row overflow-hidden"
    >
      {decades.map((decade, index) => (
        <motion.div
          key={decade}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelect(decade)}
          className="relative flex-1 group cursor-pointer border-b md:border-b-0 md:border-r border-neutral-800 hover:border-white/100 hover:bg-neutral-900 transition-all duration-300 flex flex-col items-center justify-center overflow-hidden"
        >
          <span className="absolute text-9xl font-black text-white/5 group-hover:text-white/10 transition-colors scale-150 select-none pointer-events-none">
            {decade.toString().slice(2)}
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter group-hover:scale-110 transition-transform relative z-10">
            {decade >= 2000 ? `${decade}s` : `${decade.toString().slice(2)}s`}
          </h2>
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 pointer-events-none transition-colors" />
        </motion.div>
      ))}
    </motion.div>
  );
};

// ==========================================
// MAIN APP
// ==========================================
function App() {
  const [view, setView] = useState('home');
  const [selectedDecade, setSelectedDecade] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleDecadeSelect = (decade) => {
    setSelectedDecade(decade);
    setView('timeline');
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setView('year');
  };

  const handleBackToTimeline = () => {
    setView('timeline');
  };

  const handleBackToHome = () => {
    setView('home');
    setSelectedDecade(null);
    setSelectedYear(null);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-black text-white">
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <DecadeSelector key="home" onSelect={handleDecadeSelect} />
        )}
        
        {view === 'timeline' && (
          <Timeline 
            key="timeline"
            startDecade={selectedDecade} 
            focusYear={selectedYear} 
            onBack={handleBackToHome} 
            onSelectYear={handleYearSelect}
          />
        )}

        {view === 'year' && selectedYear && (
          <SingleYearView 
            key="year"
            year={selectedYear} 
            onBack={handleBackToTimeline} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;