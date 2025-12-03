import React, { useMemo, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getProcessedData } from './oscarData';

// ==========================================
// COMPONENT: PARALLAX IMAGE (Generic)
// ==========================================
const ParallaxImage = ({ containerRef, label = "IMG", scaleBase = 1.25 }) => {
  const targetRef = useRef(null);
  const { scrollXProgress } = useScroll({
    target: targetRef,
    container: containerRef,
    axis: "x",
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollXProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(scrollXProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div ref={targetRef} className="w-full h-full overflow-hidden relative bg-black">
      <motion.div 
        style={{ x, opacity, scale: scaleBase }} 
        className="w-full h-full bg-neutral-800 flex items-center justify-center relative origin-center"
      >
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-700 to-neutral-900" />
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        {/* Label Stub */}
        <span className="text-neutral-300 font-mono text-4xl font-black tracking-widest z-10 border-4 border-neutral-300 p-6 bg-black/40 backdrop-blur-md shadow-2xl uppercase">
          {label}
        </span>
      </motion.div>
    </div>
  );
};

// ==========================================
// STUBS
// ==========================================

const StaticPosterStub = () => (
  <div className="h-4/6 aspect-[2/3] bg-neutral-800 rounded-lg shadow-2xl flex items-center justify-center border border-neutral-700 shrink-0">
    <span className="text-neutral-500 font-mono text-xl font-bold">PORTRAIT POSTER</span>
  </div>
);

const FullSizeVideoStub = () => (
  <div className="w-full h-full max-w-5xl max-h-[80vh] aspect-video bg-neutral-900 rounded-lg border border-neutral-700 flex items-center justify-center shadow-2xl">
    <div className="w-24 h-24 rounded-full border-4 border-neutral-500 flex items-center justify-center group cursor-pointer hover:border-white hover:scale-110 transition-all duration-300">
      <div className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[32px] border-l-neutral-500 border-b-[20px] border-b-transparent ml-2 group-hover:border-l-white transition-colors"></div>
    </div>
  </div>
);

const TextStub = () => (
  <div className="w-full max-w-lg space-y-6 p-8">
    <div className="h-6 bg-neutral-800 rounded w-1/3 mb-8"></div>
    <div className="h-4 bg-neutral-800 rounded w-full"></div>
    <div className="h-4 bg-neutral-800 rounded w-full"></div>
    <div className="h-4 bg-neutral-800 rounded w-5/6"></div>
    <div className="h-4 bg-neutral-800 rounded w-full"></div>
    <div className="h-4 bg-neutral-800 rounded w-4/6"></div>
  </div>
);

// ==========================================
// COVERS
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

const IntroText = () => (
  <section className="min-w-[60vw] h-full flex items-center justify-center snap-start bg-neutral-900 border-r border-neutral-800 p-12 shrink-0">
    <div className="max-w-2xl text-xl text-neutral-300 leading-relaxed font-light">
      <p className="mb-6"><strong className="text-white">Cinema is a battleground.</strong></p>
      <p>The Academy vs The Audience. This archive explores the divergence.</p>
    </div>
  </section>
);

// ==========================================
// MOVIE SLIDE (UPDATED FLOW)
// ==========================================
const MovieSlide = ({ scrollRef }) => {
  return (
    <>
      {/* SLIDE 1: INTRO (Split Screen) 
        Left: Static Portrait Poster | Right: Text Info
      */}
      <section className="min-w-[100vw] h-full flex snap-start border-r border-neutral-800 bg-black shrink-0">
        <div className="w-[40%] h-full flex items-center justify-center border-r border-neutral-900 bg-neutral-950">
          <StaticPosterStub />
        </div>
        <div className="w-[60%] h-full flex items-center justify-center bg-black">
          <TextStub />
        </div>
      </section>

      {/* SLIDE 2: THE IMMERSION (Full Screen Parallax)
        THIS IS NOW THE WIDE STILL (Not the Poster)
      */}
      <section className="min-w-[100vw] h-full snap-start border-r border-neutral-800 bg-black shrink-0 overflow-hidden">
        <ParallaxImage containerRef={scrollRef} label="WIDE STILL (FULL)" />
      </section>

      {/* SLIDE 3: THE CONTEXT (Wide Split)
        Left: SAME WIDE STILL (65%) | Right: Text (35%)
      */}
      <section className="min-w-[100vw] h-full flex snap-start border-r border-neutral-800 bg-black shrink-0">
        <div className="w-[65%] h-full border-r border-neutral-900 overflow-hidden">
          {/* Re-using the same still here to create the continuity effect */}
          <ParallaxImage containerRef={scrollRef} label="WIDE STILL (CONT.)" scaleBase={1.2} />
        </div>
        <div className="w-[35%] h-full flex items-center justify-center bg-black">
          <TextStub />
        </div>
      </section>

      {/* SLIDE 4: THE VIDEO (Full Screen)
      */}
      <section className="min-w-[100vw] h-full flex items-center justify-center snap-start border-r border-neutral-800 bg-black shrink-0 p-8">
        <FullSizeVideoStub />
      </section>
    </>
  );
};

// ==========================================
// HELPERS
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
      className="flex flex-row h-screen w-screen overflow-x-auto overflow-y-hidden bg-neutral-950 text-neutral-200 snap-x snap-mandatory items-stretch pb-4"
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
                
                <YearCover year={yearData.filmYear} />

                {/* BEST PICTURE */}
                <CategoryCover title="Best Picture" subtitle={ceremonySubtitle} />
                <MovieSlide scrollRef={scrollContainerRef} />

                {/* AUDIENCE FAV (ENGLISH) */}
                <CategoryCover title="Audience Favorite" subtitle="English Language" />
                <MovieSlide scrollRef={scrollContainerRef} />

                {/* INTERNATIONAL */}
                <CategoryCover title="Best International Feature Film" subtitle={ceremonySubtitle} />
                <MovieSlide scrollRef={scrollContainerRef} />

                {/* AUDIENCE FAV (INTL) */}
                <CategoryCover title="Audience Favorite" subtitle="International" />
                <MovieSlide scrollRef={scrollContainerRef} />
              
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