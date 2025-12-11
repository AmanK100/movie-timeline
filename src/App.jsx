import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getProcessedData } from './oscarData';

// ==========================================
// CONFIGURATION
// ==========================================
const START_YEAR = 1950;
const END_YEAR = 2024;
const YEARS = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i);

// ==========================================
// COMPONENT: ARTWORK QUADRANT STUB
// ==========================================
const ArtworkQuadrant = ({ label, movieData, dataKey, isSpecial, onClick }) => {
  const [imgError, setImgError] = useState(false);
  
  // DYNAMIC IMAGE LOGIC
  // Even though it looks the same, we still check for the '_special.jpg' file
  // so you can use a different image file for the duplicate entry if you want.
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
    <div 
      onClick={onClick}
      className="relative w-full h-full bg-neutral-900 overflow-hidden cursor-pointer group"
    >
      {/* Image Layer */}
      <div className="absolute inset-0 transition-all duration-500 ease-in-out filter brightness-50 group-hover:brightness-100 group-hover:scale-105">
        {!imgError && imgSrc ? (
          <img 
            src={imgSrc} 
            alt={label} 
            className="w-full h-full object-cover"
            onError={() => setImgError(true)} 
          />
        ) : (
          // Fallback Pattern
          <div className="w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" 
               style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(#555 1px, transparent 1px)' }}
          />
        )}
      </div>

      {/* Label: Standard white look for everyone */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 p-4 text-center">
        <span className="font-mono text-sm md:text-xl font-bold uppercase tracking-widest border-2 border-white/50 bg-black/50 text-white backdrop-blur-md px-4 py-2">
          {label}
        </span>
      </div>
    </div>
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

  // DUPLICATE DETECTION LOGIC
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

  // CLICK HANDLER
  // This is where you will add navigation logic later.
  // For now, it just logs differently so you know it worked.
  const handleClick = (category, movie) => {
    if (isSpecial(movie)) {
      console.log(`Open SPOTLIGHT Page for: ${movie.title} (${category})`);
    } else {
      console.log(`Open Standard Movie Page: ${category}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="relative w-screen h-screen bg-black overflow-hidden"
    >
      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
        <ArtworkQuadrant 
          label="Best Picture" 
          dataKey="bestPicture"
          movieData={yearData.bestPicture} 
          isSpecial={isSpecial(yearData.bestPicture)}
          onClick={() => handleClick("Best Picture", yearData.bestPicture)} 
        />
        <ArtworkQuadrant 
          label="Audience (Eng)" 
          dataKey="highestRatedEnglish"
          movieData={yearData.highestRatedEnglish} 
          isSpecial={isSpecial(yearData.highestRatedEnglish)}
          onClick={() => handleClick("Audience English", yearData.highestRatedEnglish)} 
        />
        <ArtworkQuadrant 
          label="Best International" 
          dataKey="bestInternational"
          movieData={yearData.bestInternational} 
          isSpecial={isSpecial(yearData.bestInternational)}
          onClick={() => handleClick("Best International", yearData.bestInternational)} 
        />
        <ArtworkQuadrant 
          label="Audience (Intl)" 
          dataKey="highestRatedInternational"
          movieData={yearData.highestRatedInternational} 
          isSpecial={isSpecial(yearData.highestRatedInternational)}
          onClick={() => handleClick("Audience Intl", yearData.highestRatedInternational)} 
        />
      </div>

      {/* CENTER YEAR BUTTON */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto group relative flex items-center justify-center px-6 py-3 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg hover:bg-black hover:border-white/50 hover:scale-105 transition-all duration-300 z-50 shadow-2xl"
        >
          <span className="text-white font-black text-3xl md:text-5xl tracking-tighter group-hover:hidden">
            {year}
          </span>
          <span className="hidden group-hover:block text-white font-bold text-sm uppercase tracking-widest">
            Back to Timeline
          </span>
        </button>
      </div>
    </motion.div>
  );
};
// ==========================================
// COMPONENT: TIMELINE VIEW
// ==========================================
const Timeline = ({ startDecade, onBack, onSelectYear }) => {
  const scrollRef = useRef(null);
  const ITEM_WIDTH = 300; 

  useEffect(() => {
    // If we have a target decade/year to jump to
    if (scrollRef.current && startDecade) {
      const yearElement = document.getElementById(`year-${startDecade}`);
      if (yearElement) {
        const container = scrollRef.current;
        const scrollLeft = yearElement.offsetLeft - (container.clientWidth / 2) + (yearElement.clientWidth / 2);
        
        // CHANGED: 'smooth' -> 'auto'
        // This makes it jump instantly so you don't see the long scroll animation
        container.scrollTo({ 
          left: scrollLeft, 
          behavior: 'auto' 
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

      <div 
        ref={scrollRef}
        className="flex-1 overflow-x-auto no-scrollbar flex items-center relative snap-x snap-mandatory cursor-grab active:cursor-grabbing"
      >
        <div 
          className="absolute top-1/2 h-0.5 bg-white/20" 
          style={{ 
            left: `calc(50vw + ${ITEM_WIDTH / 2}px)`, 
            width: `${(YEARS.length - 1) * ITEM_WIDTH}px` 
          }} 
        />

        <div className="flex px-[50vw]"> 
          {YEARS.map((year) => {
            const isDecade = year % 10 === 0;
            return (
              <div 
                key={year}
                id={`year-${year}`}
                onClick={() => onSelectYear(year)}
                className={`relative flex flex-col items-center justify-center shrink-0 h-screen snap-center group cursor-pointer`}
                style={{ width: `${ITEM_WIDTH}px` }}
              >
                <div 
                  className={`w-0.5 transition-all duration-300 bg-white 
                    ${isDecade ? 'h-24 bg-white' : 'h-12 bg-white/50'}
                    group-hover:h-32 group-hover:bg-red-500
                  `} 
                />
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-black border-2 border-white rounded-full group-hover:scale-150 group-hover:bg-red-500 group-hover:border-red-500 transition-all duration-300 z-10" />
                <h3 
                  className={`mt-8 font-mono transition-all duration-300 select-none text-5xl font-bold
                    ${isDecade ? 'text-white' : 'text-white/40'}
                    group-hover:text-red-500 group-hover:scale-110
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
// COMPONENT: DECADE SELECTOR
// ==========================================
const DecadeSelector = ({ onSelect }) => {
  const decades = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

  return (
    <div className="w-screen h-screen bg-black flex flex-row overflow-hidden">
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
    </div>
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
      {view === 'home' && (
        <DecadeSelector onSelect={handleDecadeSelect} />
      )}
      
      {view === 'timeline' && (
        <Timeline 
          startDecade={selectedDecade} 
          onBack={handleBackToHome} 
          onSelectYear={handleYearSelect}
        />
      )}

      {view === 'year' && selectedYear && (
        <SingleYearView 
          year={selectedYear} 
          onBack={handleBackToTimeline} 
        />
      )}
    </div>
  );
}

export default App;