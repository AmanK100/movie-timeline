const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovieData = async (title, year) => {
  if (!API_KEY) {
    console.error("Missing API Key! Make sure VITE_TMDB_API_KEY is set in your .env file.");
    return null;
  }

  try {
    // ---------------------------------------------------------
    // ATTEMPT 1: Search with strict Year
    // ---------------------------------------------------------
    let searchRes = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}&year=${year}`
    );
    let searchData = await searchRes.json();
    let movieResult = searchData.results?.[0];

    // ---------------------------------------------------------
    // ATTEMPT 2: Fallback (Search Title Only)
    // ---------------------------------------------------------
    // If exact year failed, search ONLY by title
    if (!movieResult) {
        // console.log(`Exact year match failed for ${title} (${year}). Trying loose search...`);
        
        searchRes = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`
        );
        searchData = await searchRes.json();
        
        // Filter results to find one within +/- 4 years
        // This prevents grabbing a 1930s version of a 2010s movie
        if (searchData.results) {
            movieResult = searchData.results.find(m => {
                const releaseYear = m.release_date ? parseInt(m.release_date.split('-')[0]) : null;
                return releaseYear && Math.abs(releaseYear - year) <= 4;
            });
        }
    }

    // If still nothing found, give up
    if (!movieResult) {
        console.warn(`No results found for ${title}`);
        return null;
    }

    // ---------------------------------------------------------
    // FETCH DETAILS (using the ID we found)
    // ---------------------------------------------------------
    const movieID = movieResult.id;
    const detailsRes = await fetch(
      `${BASE_URL}/movie/${movieID}?api_key=${API_KEY}&append_to_response=credits`
    );
    const detailsData = await detailsRes.json();

    // Extract Director
    const director = detailsData.credits.crew.find(person => person.job === "Director")?.name;

    return {
      description: detailsData.overview,
      runtime: detailsData.runtime,
      rating: detailsData.vote_average,
      director: director,
      tagline: detailsData.tagline,
      genres: detailsData.genres.map(g => g.name).join(", "),
      release_date: detailsData.release_date,
      // Optional: Grab a high-res backdrop if you want to use it later
      backdrop: detailsData.backdrop_path ? `https://image.tmdb.org/t/p/original${detailsData.backdrop_path}` : null
    };

  } catch (error) {
    console.error("API Fetch Error:", error);
    return null;
  }
};