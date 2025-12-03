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
// NEW COMPONENT: YEAR COVER
// ==========================================
const YearCover = ({ year }) => (
  <section className="min-w-[100vw] h-full flex items-center justify-center snap-start border-r border-neutral-800 bg-black shrink-0">
    <h2 className="text-[12rem] md:text-[20rem] font-bold stroke-text tracking-tighter">
      {year}
    </h2>
  </section>
);

// ==========================================
// MOVIE SLIDE (Year column removed)
// ==========================================
const MovieSlide = ({ title, category, year }) => {
  // Logic to create the category title (e.g., "23RD ACADEMY..." or "AUDIENCE FAV")
  let categoryTitleNode;
  if (category.includes("Academy")) {
    const ceremonyNumber = year - 1927;
    const ordinal = (n) => {
      const s = ["TH", "ST", "ND", "RD"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    categoryTitleNode = (
      <>
        <span className="text-red-600 stroke-text-white" style={{WebkitTextStroke: '0px'}}>{ordinal(ceremonyNumber)}</span> ACADEMY<br/>BEST PICTURE
      </>
    );
  } else {
    categoryTitleNode = "AUDIENCE FAV";
  }

  // Common styles for each section
  const sectionStyles = "h-full flex items-center justify-center snap-start border-r border-neutral-800 bg-black shrink-0";

  return (
    <>
      {/* NOTE: Year Column removed from here. It is now handled by YearCover component. */}

      {/* --- Col 1: CATEGORY TITLE --- */}
      <section className={`${sectionStyles} min-w-[35vw] p-8`}>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-center stroke-text-white">
          {categoryTitleNode}
        </h2>
      </section>

      {/* --- Col 2: POSTER --- */}
      <section className={`${sectionStyles} min-w-[50vw] p-8`}>
        <FullSizePosterStub />
      </section>

      {/* --- Col 3: TEXT BLOCK 1 --- */}
      <section className={`${sectionStyles} min-w-[35vw]`}>
        <TextStub />
      </section>

      {/* --- Col 4: MOVIE STILL --- */}
      <section className={`${sectionStyles} min-w-[60vw] p-8`}>
        <MovieStillStub />
      </section>

      {/* --- Col 5: TEXT BLOCK 2 --- */}
      <section className={`${sectionStyles} min-w-[35vw]`}>
        <TextStub />
      </section>

      {/* --- Col 6: VIDEO --- */}
      <section className={`${sectionStyles} min-w-[50vw] p-8`}>
        <FullSizeVideoStub />
      </section>
    </>
  );
};

// ==========================================
// COVERS
// ==========================================
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

const IntroText = () => (
  <section className="min-w-[60vw] h-full flex items-center justify-center snap-start bg-neutral-900 border-r border-neutral-800 p-12 shrink-0">
    <div className="max-w-2xl text-xl text-neutral-300 leading-relaxed font-light">
      <p className="mb-6"><strong className="text-white">Cinema is a battleground.</strong></p>
      <p>The Academy vs The Audience. This archive explores the divergence.</p>
    </div>
  </section>
);

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

  // Scroll Hijack (Vertical -> Horizontal)
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
          
          {dataByDecade[decade].map((yearData) => (
            <React.Fragment key={yearData.filmYear}>
              
              {/* --- 1. SINGLE YEAR COVER (Appears once per year group) --- */}
              <YearCover year={yearData.filmYear} />

              {/* --- 2. THE 4 MOVIES (Category, Poster, etc.) --- */}
              <MovieSlide year={yearData.filmYear} category="Academy Best Picture" title={yearData.bestPicture} />
              <MovieSlide year={yearData.filmYear} category="Audience Favorite (English)" title={yearData.highestRatedEnglish} />
              <MovieSlide year={yearData.filmYear} category="Academy Best International" title={yearData.bestInternational} />
              <MovieSlide year={yearData.filmYear} category="Audience Favorite (Intl)" title={yearData.highestRatedInternational} />
            
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
      <section className="min-w-[20vw] h-full bg-black snap-start shrink-0"></section>
    </div>
  );
}

export default App;