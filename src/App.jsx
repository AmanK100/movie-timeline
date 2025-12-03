import React, { useMemo, useRef, useEffect } from 'react';
import { getProcessedData } from './oscarData';

// ==========================================
// STUBS
// ==========================================

const FullSizePosterStub = () => (
  <div className="h-5/6 aspect-[2/3] bg-neutral-800 rounded-lg shadow-2xl flex items-center justify-center border border-neutral-700">
    <span className="text-neutral-500 font-mono text-xl">POSTER IMG</span>
  </div>
);

const MovieStillStub = () => (
  <div className="w-full h-4/6 bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-700">
    <span className="text-neutral-500 font-mono text-xl">MOVIE STILL IMG</span>
  </div>
);

const FullSizeVideoStub = () => (
  <div className="w-full max-w-4xl aspect-video bg-neutral-900 rounded-lg border border-neutral-700 flex items-center justify-center">
    <div className="w-20 h-20 rounded-full border-4 border-neutral-600 flex items-center justify-center">
      <div className="w-0 h-0 border-t-[16px] border-t-transparent border-l-[24px] border-l-white border-b-[16px] border-b-transparent ml-2"></div>
    </div>
  </div>
);

const TextStub = () => (
  <div className="max-w-md space-y-4 p-8">
    <p className="text-neutral-500 font-mono mb-4 text-center">PLACEHOLDER TEXT</p>
    <div className="h-4 bg-neutral-800 rounded w-full animate-pulse"></div>
    <div className="h-4 bg-neutral-800 rounded w-5/6 mx-auto animate-pulse"></div>
    <div className="h-4 bg-neutral-800 rounded w-full animate-pulse"></div>
    <div className="h-4 bg-neutral-800 rounded w-4/6 mx-auto animate-pulse"></div>
  </div>
);

// ==========================================
// COVERS (Year & Category)
// ==========================================

const YearCover = ({ year }) => (
  <section className="min-w-[100vw] h-full flex items-center justify-center snap-start border-r border-neutral-800 bg-black shrink-0">
    <h2 className="text-[12rem] md:text-[20rem] font-bold stroke-text tracking-tighter">
      {year}
    </h2>
  </section>
);

const CategoryCover = ({ title, subtitle }) => (
  <section className="min-w-[100vw] h-full flex flex-col items-center justify-center snap-start border-r border-neutral-800 bg-black shrink-0 p-8">
    {/* UPDATED: Reduced font size to text-4xl (mobile) / text-7xl (desktop) */}
    <h2 className="text-4xl md:text-7xl font-black text-center uppercase tracking-tighter mb-6 stroke-text-white max-w-[90vw]">
      {title}
    </h2>
    <p className="text-xl md:text-3xl text-red-600 font-mono tracking-widest uppercase border-t border-red-600 pt-4">
      {subtitle}
    </p>
  </section>
);

const FullScreenTitle = ({ title, subtitle, bg = "bg-black" }) => (
  <section className={`min-w-[100vw] h-full flex flex-col items-center justify-center snap-start ${bg} text-center p-4 border-r border-neutral-800 shrink-0`}>
    <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase mb-4">
      {title}
    </h1>
    {subtitle && (
      <p className="text-xl md:text-2xl text-red-500 font-mono tracking-widest uppercase">
        {subtitle}
      </p>
    )}
  </section>
);

// ==========================================
// MOVIE SLIDE (Content Only)
// ==========================================
const MovieSlide = () => {
  // Common styles for each section
  const sectionStyles = "h-full flex items-center justify-center snap-start border-r border-neutral-800 bg-black shrink-0";

  return (
    <>
      {/* --- Col 1: POSTER --- */}
      <section className={`${sectionStyles} min-w-[50vw] p-8`}>
        <FullSizePosterStub />
      </section>

      {/* --- Col 2: TEXT BLOCK 1 --- */}
      <section className={`${sectionStyles} min-w-[35vw]`}>
        <TextStub />
      </section>

      {/* --- Col 3: MOVIE STILL --- */}
      <section className={`${sectionStyles} min-w-[60vw] p-8`}>
        <MovieStillStub />
      </section>

      {/* --- Col 4: TEXT BLOCK 2 --- */}
      <section className={`${sectionStyles} min-w-[35vw]`}>
        <TextStub />
      </section>

      {/* --- Col 5: VIDEO --- */}
      <section className={`${sectionStyles} min-w-[50vw] p-8`}>
        <FullSizeVideoStub />
      </section>
    </>
  );
};

const IntroText = () => (
  <section className="min-w-[60vw] h-full flex items-center justify-center snap-start bg-neutral-900 border-r border-neutral-800 p-12 shrink-0">
    <div className="max-w-2xl text-xl text-neutral-300 leading-relaxed font-light">
      <p className="mb-6"><strong className="text-white">Cinema is a battleground.</strong></p>
      <p>The Academy vs The Audience. This archive explores the divergence.</p>
    </div>
  </section>
);

// ==========================================
// HELPER: Calculate Ordinal (1st, 2nd, 3rd)
// ==========================================
const getOrdinalCeremony = (year) => {
  const n = year - 1927;
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

// ==========================================
// MAIN APP
// ==========================================
function App() {
  const sortedData = useMemo(() => getProcessedData(1950), []);
  const scrollContainerRef = useRef(null);

  const dataByDecade = useMemo(() => {
    const groups = {};
    sortedData.forEach((item) => {
      const decade = Math.floor(item.filmYear / 10) * 10;
      if (!groups[decade]) groups[decade] = [];
      groups[decade].push(item);
    });
    return groups;
  }, [sortedData]);

  const decades = Object.keys(dataByDecade).sort();

  // Scroll Hijack
  useEffect(() => {
    const container = scrollContainerRef.current;
    const handleWheel = (e) => {
      if (container && e.deltaY !== 0) {
        container.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div 
      ref={scrollContainerRef}
      className="flex flex-row h-screen w-screen overflow-x-auto overflow-y-hidden bg-neutral-950 text-neutral-200 snap-x snap-mandatory no-scrollbar items-stretch"
    >
      <FullScreenTitle title="Evolution" subtitle="The Academy vs The Audience" />
      <IntroText />

      {decades.map((decade) => (
        <React.Fragment key={decade}>
          <FullScreenTitle title={`${decade}s`} subtitle="The Era Begins" bg="bg-neutral-900" />
          
          {dataByDecade[decade].map((yearData) => {
            const ceremonySubtitle = `${getOrdinalCeremony(yearData.filmYear)} Academy Awards`;

            return (
              <React.Fragment key={yearData.filmYear}>
                
                {/* 1. YEAR COVER */}
                <YearCover year={yearData.filmYear} />

                {/* 2. ACADEMY BEST PICTURE */}
                <CategoryCover 
                  title="Best Picture" 
                  subtitle={ceremonySubtitle} 
                />
                <MovieSlide />

                {/* 3. AUDIENCE FAVORITE (ENGLISH) */}
                <CategoryCover 
                  title="Audience Favorite" 
                  subtitle="English Language" 
                />
                <MovieSlide />

                {/* 4. ACADEMY INTERNATIONAL */}
                <CategoryCover 
                  title="Best International Feature Film" 
                  subtitle={ceremonySubtitle} 
                />
                <MovieSlide />

                {/* 5. AUDIENCE FAVORITE (INTERNATIONAL) */}
                <CategoryCover 
                  title="Audience Favorite" 
                  subtitle="International" 
                />
                <MovieSlide />
              
              </React.Fragment>
            );
          })}
        </React.Fragment>
      ))}
      <section className="min-w-[20vw] h-full bg-black snap-start shrink-0"></section>
    </div>
  );
}

export default App;