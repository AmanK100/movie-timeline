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

// SHARED FONT CLASS (Ensures exact match between views)
const YEAR_FONT_CLASS = "font-mono text-5xl md:text-6xl font-bold tracking-tighter select-none";

// ==========================================
// COMPONENT: ARTWORK QUADRANT
// ==========================================
const ArtworkQuadrant = ({ label, movieData, dataKey, isSpecial, onClick }) => {
  const [imgError, setImgError] = useState(false);
  
  let imgSrc = null;
  if (movieData) {
    const year = movieData.poster.split('/')[2]; 
    if (isSpecial && !imgError) {
      imgSrc = `/images/${year}/${dataKey}_special.jpg`;
    } else {
      imgSrc = movieData.artwork || movieData.poster;
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }} // Standard fade
      onClick={onClick}
      className="relative w-full h-full bg-neutral-900 overflow-hidden cursor-pointer group"
    >
      <div className="absolute inset-0 transition-all duration-500 ease-in-out filter brightness-50 group-hover:brightness-100 group-hover:scale-105">
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

      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 p-4 text-center">
        <span className="font-mono text-sm md:text-xl font-bold uppercase tracking-widest border-2 border-white/50 bg-black/50 text-white backdrop-blur-md px-4 py-2">
          {label}
        </span>
      </div>
    </motion.div>
  );
};

// ==========================================
// COMPONENT: SINGLE YEAR GRID VIEW
// ==========================================
const SingleYearView = ({ year, onBack }) => {
  const yearData = useMemo(() => {
    const allData = getProcessedData(1950);
    return allData.find(item => item.filmYear === year);
  }, [year]);

  const specials = useMemo(() => {
    if (!yearData) return new Set();
    const titles = [
      yearData.bestPicture?.title,
      yearData.highestRatedEnglish?.title,
      yearData.bestInternational?.title,
      yearData.highestRatedInternational?.title
    ].filter(Boolean);
    const duplicates = titles.filter((item, index) => titles.indexOf(item) !== index);
    return new Set(duplicates);
  }, [yearData]);

  if (!yearData) return <div className="text-white p-10">Data not found for {year}</div>;

  const isSpecial = (movie) => movie && specials.has(movie.title);

  const handleClick = (category, movie) => {
    if (isSpecial(movie)) {
      console.log(`Open SPOTLIGHT Page for: ${movie.title}`);
    } else {
      console.log(`Open Standard Movie Page: ${category}`);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
        <ArtworkQuadrant label="Best Picture" dataKey="bestPicture" movieData={yearData.bestPicture} isSpecial={isSpecial(yearData.bestPicture)} onClick={() => handleClick("Best Picture", yearData.bestPicture)} />
        <ArtworkQuadrant label="Audience (Eng)" dataKey="highestRatedEnglish" movieData={yearData.highestRatedEnglish} isSpecial={isSpecial(yearData.highestRatedEnglish)} onClick={() => handleClick("Audience English", yearData.highestRatedEnglish)} />
        <ArtworkQuadrant label="Best International" dataKey="bestInternational" movieData={yearData.bestInternational} isSpecial={isSpecial(yearData.bestInternational)} onClick={() => handleClick("Best International", yearData.bestInternational)} />
        <ArtworkQuadrant label="Audience (Intl)" dataKey="highestRatedInternational" movieData={yearData.highestRatedInternational} isSpecial={isSpecial(yearData.highestRatedInternational)} onClick={() => handleClick("Audience Intl", yearData.highestRatedInternational)} />
      </div>

      {/* CENTER YEAR BUTTON */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto cursor-pointer z-50 group hover:scale-105 transition-transform duration-300"
        >
          {/* STATIC TEXT (No layoutId) */}
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

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-x-auto no-scrollbar flex items-center relative snap-x snap-mandatory cursor-grab active:cursor-grabbing"
      >
        {/* Central Line - MOVED UP to 38% */}
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
                // Flex centered (items-center justify-center) guarantees vertical centering
                className={`relative flex flex-col items-center justify-center shrink-0 h-full snap-center transition-all duration-300
                  ${isActive ? 'cursor-pointer opacity-100' : 'cursor-default opacity-20 scale-90'}
                `}
                style={{ width: `${ITEM_WIDTH}px` }}
              >
                {/* Visuals (Absolute to avoid pushing text) */}
                <div className="absolute top-[38%] w-full flex flex-col items-center">
                   {/* Dot */}
                   <div 
                    className={`absolute -translate-y-1/2 w-3 h-3 border-2 border-white rounded-full transition-all duration-300 z-10
                      ${isActive ? 'bg-white scale-150' : 'bg-black'}
                    `} 
                  />
                  
                  {/* Vertical Line hanging down */}
                  <div 
                    className={`w-0.5 transition-all duration-300 bg-white origin-top
                      ${isDecade ? 'h-10' : 'h-5'} 
                      ${isActive ? 'h-16' : ''} 
                    `} 
                  />
                </div>
                
                {/* YEAR TEXT - Centered by flex parent */}
                {/* No top margin needed anymore, or just a small one if you want spacing from the tick */}
                <h3 className={`${YEAR_FONT_CLASS} text-white mt-16`}>
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