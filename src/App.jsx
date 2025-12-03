import React, { useMemo, useRef, useEffect } from 'react';
import { getProcessedData } from './oscarData';

// ==========================================
// STUBS
// ==========================================
const PosterStub = () => (
  <div className="w-64 h-96 bg-neutral-800 rounded-lg shadow-2xl flex items-center justify-center border border-neutral-700 shrink-0">
    <span className="text-neutral-500 font-mono text-sm">POSTER IMG</span>
  </div>
);

const VideoStub = () => (
  <div className="w-full h-48 bg-neutral-900 rounded-lg border border-neutral-700 flex items-center justify-center mb-4">
    <div className="w-12 h-12 rounded-full border-2 border-neutral-600 flex items-center justify-center">
      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
    </div>
  </div>
);

const ImageStub = () => (
  <div className="w-full h-32 bg-neutral-800 rounded mb-4 animate-pulse"></div>
);

const TextStub = () => (
  <div className="space-y-2 mb-6">
    <div className="h-4 bg-neutral-800 rounded w-3/4"></div>
    <div className="h-4 bg-neutral-800 rounded w-full"></div>
    <div className="h-4 bg-neutral-800 rounded w-5/6"></div>
  </div>
);

// ==========================================
// MOVIE SLIDE
// ==========================================
const MovieSlide = ({ title, category, year }) => {
  return (
    // REMOVED "overflow-y-auto" to prevent scroll trapping
    <section className="min-w-[85vw] md:min-w-[50vw] h-full p-8 md:p-16 border-r border-neutral-800 flex flex-col justify-center snap-start relative overflow-hidden">
      <div className="max-w-xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold tracking-wider uppercase rounded-full mb-4">
            {year} • {category}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
            {title}
          </h2>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <PosterStub />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-neutral-400 text-lg mb-6">
              A placeholder description for the film {title}.
            </p>
            <ImageStub />
            <TextStub />
            <VideoStub />
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// COVERS
// ==========================================
const FullScreenTitle = ({ title, subtitle, bg = "bg-black" }) => (
  <section className={`min-w-[100vw] h-full flex flex-col items-center justify-center snap-start ${bg} text-center p-4 border-r border-neutral-800`}>
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
  <section className="min-w-[60vw] h-full flex items-center justify-center snap-start bg-neutral-900 border-r border-neutral-800 p-12">
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

  // --- THE SCROLL FIX ---
  useEffect(() => {
    const container = scrollContainerRef.current;
    
    const handleWheel = (e) => {
      // If we have a container and the user is scrolling vertically
      if (container && e.deltaY !== 0) {
        // 1. Force horizontal movement on the container
        container.scrollLeft += e.deltaY;
        
        // 2. Kill the browser's native vertical scroll
        e.preventDefault();
      }
    };

    // Attach to WINDOW to catch the event everywhere (Poster, text, empty space)
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    // H-SCREEN + W-SCREEN ensures it fills the viewport exactly
    <div 
      ref={scrollContainerRef}
      className="flex flex-row h-screen w-screen overflow-x-auto overflow-y-hidden bg-neutral-950 text-neutral-200 snap-x snap-mandatory no-scrollbar"
    >
      <FullScreenTitle title="Evolution" subtitle="The Academy vs The Audience" />
      <IntroText />

      {decades.map((decade) => (
        <React.Fragment key={decade}>
          <FullScreenTitle title={`${decade}s`} subtitle="The Era Begins" bg="bg-neutral-900" />
          {dataByDecade[decade].map((yearData) => (
            <React.Fragment key={yearData.filmYear}>
              <section className="min-w-[40vw] h-full flex items-center justify-center snap-start border-r border-neutral-800 bg-black">
                <div className="rotate-90 md:rotate-0">
                  <h2 className="text-8xl font-bold text-neutral-800 stroke-text">
                    {yearData.filmYear}
                  </h2>
                </div>
              </section>
              <MovieSlide year={yearData.filmYear} category="Academy Best Picture" title={yearData.bestPicture} />
              <MovieSlide year={yearData.filmYear} category="Audience Favorite (English)" title={yearData.highestRatedEnglish} />
              <MovieSlide year={yearData.filmYear} category="Academy Best International" title={yearData.bestInternational} />
              <MovieSlide year={yearData.filmYear} category="Audience Favorite (Intl)" title={yearData.highestRatedInternational} />
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
      <section className="min-w-[20vw] h-full bg-black snap-start"></section>
    </div>
  );
}

export default App;