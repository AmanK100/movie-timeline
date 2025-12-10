// src/oscarData.js

// Helper to generate consistent paths
const mkMovie = (year, key, title) => ({
  title: title,
  poster: `/images/${year}/${key}_poster.jpg`,
  still: `/images/${year}/${key}_still.jpg`,
  description: "", 
  video: ""        
});

export const oscarMasterList = [
  // ==============================================================================
  // 2020s
  // ==============================================================================
  {
    ceremonyNumber: 97, ceremonyYear: 2025, filmYear: 2024,
    bestPicture: mkMovie(2024, "bestPicture", "Anora"),
    bestInternational: mkMovie(2024, "bestInternational", "I'm Still Here"),
    highestRatedEnglish: mkMovie(2024, "highestRatedEnglish", "Dune: Part Two"),
    highestRatedInternational: mkMovie(2024, "highestRatedInternational", "The Seed of the Sacred Fig")
  },
  {
    ceremonyNumber: 96, ceremonyYear: 2024, filmYear: 2023,
    bestPicture: mkMovie(2023, "bestPicture", "Oppenheimer"),
    bestInternational: mkMovie(2023, "bestInternational", "The Zone of Interest"),
    highestRatedEnglish: mkMovie(2023, "highestRatedEnglish", "Spider-Man: Across the Spider-Verse"),
    highestRatedInternational: mkMovie(2023, "highestRatedInternational", "Godzilla Minus One")
  },
  {
    ceremonyNumber: 95, ceremonyYear: 2023, filmYear: 2022,
    bestPicture: mkMovie(2022, "bestPicture", "Everything Everywhere All At Once"),
    bestInternational: mkMovie(2022, "bestInternational", "All Quiet on the Western Front"),
    highestRatedEnglish: mkMovie(2022, "highestRatedEnglish", "Everything Everywhere All At Once"),
    highestRatedInternational: mkMovie(2022, "highestRatedInternational", "Puss in Boots: The Last Wish")
  },
  {
    ceremonyNumber: 94, ceremonyYear: 2022, filmYear: 2021,
    bestPicture: mkMovie(2021, "bestPicture", "CODA"),
    bestInternational: mkMovie(2021, "bestInternational", "Drive My Car"),
    highestRatedEnglish: mkMovie(2021, "highestRatedEnglish", "Marcel the Shell with Shoes On"),
    highestRatedInternational: mkMovie(2021, "highestRatedInternational", "Drive My Car")
  },
  {
    ceremonyNumber: 93, ceremonyYear: 2021, filmYear: 2020,
    bestPicture: mkMovie(2020, "bestPicture", "Nomadland"),
    bestInternational: mkMovie(2020, "bestInternational", "Another Round"),
    highestRatedEnglish: mkMovie(2020, "highestRatedEnglish", "The Father"),
    highestRatedInternational: mkMovie(2020, "highestRatedInternational", "Demon Slayer: Mugen Train")
  },

  // ==============================================================================
  // 2010s
  // ==============================================================================
  {
    ceremonyNumber: 92, ceremonyYear: 2020, filmYear: 2019,
    bestPicture: mkMovie(2019, "bestPicture", "Parasite"),
    bestInternational: mkMovie(2019, "bestInternational", "Parasite"),
    highestRatedEnglish: mkMovie(2019, "highestRatedEnglish", "Sound of Metal"),
    highestRatedInternational: mkMovie(2019, "highestRatedInternational", "Parasite")
  },
  {
    ceremonyNumber: 91, ceremonyYear: 2019, filmYear: 2018,
    bestPicture: mkMovie(2018, "bestPicture", "Green Book"),
    bestInternational: mkMovie(2018, "bestInternational", "Roma"),
    highestRatedEnglish: mkMovie(2018, "highestRatedEnglish", "Spider-Man: Into the Spider-Verse"),
    highestRatedInternational: mkMovie(2018, "highestRatedInternational", "Capernaum")
  },
  {
    ceremonyNumber: 90, ceremonyYear: 2018, filmYear: 2017,
    bestPicture: mkMovie(2017, "bestPicture", "The Shape of Water"),
    bestInternational: mkMovie(2017, "bestInternational", "A Fantastic Woman"),
    highestRatedEnglish: mkMovie(2017, "highestRatedEnglish", "Phantom Thread"),
    highestRatedInternational: mkMovie(2017, "highestRatedInternational", "Paddington 2")
  },
  {
    ceremonyNumber: 89, ceremonyYear: 2017, filmYear: 2016,
    bestPicture: mkMovie(2016, "bestPicture", "Moonlight"),
    bestInternational: mkMovie(2016, "bestInternational", "The Salesman"),
    highestRatedEnglish: mkMovie(2016, "highestRatedEnglish", "Moonlight"),
    highestRatedInternational: mkMovie(2016, "highestRatedInternational", "Your Name")
  },
  {
    ceremonyNumber: 88, ceremonyYear: 2016, filmYear: 2015,
    bestPicture: mkMovie(2015, "bestPicture", "Spotlight"),
    bestInternational: mkMovie(2015, "bestInternational", "Son of Saul"),
    highestRatedEnglish: mkMovie(2015, "highestRatedEnglish", "Mad Max: Fury Road"),
    highestRatedInternational: mkMovie(2015, "highestRatedInternational", "Embrace of the Serpent")
  },
  {
    ceremonyNumber: 87, ceremonyYear: 2015, filmYear: 2014,
    bestPicture: mkMovie(2014, "bestPicture", "Birdman"),
    bestInternational: mkMovie(2014, "bestInternational", "Ida"),
    highestRatedEnglish: mkMovie(2014, "highestRatedEnglish", "Interstellar"),
    highestRatedInternational: mkMovie(2014, "highestRatedInternational", "Wild Tales")
  },
  {
    ceremonyNumber: 86, ceremonyYear: 2014, filmYear: 2013,
    bestPicture: mkMovie(2013, "bestPicture", "12 Years a Slave"),
    bestInternational: mkMovie(2013, "bestInternational", "The Great Beauty"),
    highestRatedEnglish: mkMovie(2013, "highestRatedEnglish", "Prisoners"),
    highestRatedInternational: mkMovie(2013, "highestRatedInternational", "The Tale of the Princess Kaguya")
  },
  {
    ceremonyNumber: 85, ceremonyYear: 2013, filmYear: 2012,
    bestPicture: mkMovie(2012, "bestPicture", "Argo"),
    bestInternational: mkMovie(2012, "bestInternational", "Amour"),
    highestRatedEnglish: mkMovie(2012, "highestRatedEnglish", "It's Such a Beautiful Day"),
    highestRatedInternational: mkMovie(2012, "highestRatedInternational", "The Hunt")
  },
  {
    ceremonyNumber: 84, ceremonyYear: 2012, filmYear: 2011,
    bestPicture: mkMovie(2011, "bestPicture", "The Artist"),
    bestInternational: mkMovie(2011, "bestInternational", "A Separation"),
    highestRatedEnglish: mkMovie(2011, "highestRatedEnglish", "Warrior"),
    highestRatedInternational: mkMovie(2011, "highestRatedInternational", "A Separation")
  },
  {
    ceremonyNumber: 83, ceremonyYear: 2011, filmYear: 2010,
    bestPicture: mkMovie(2010, "bestPicture", "The King's Speech"),
    bestInternational: mkMovie(2010, "bestInternational", "In a Better World"),
    highestRatedEnglish: mkMovie(2010, "highestRatedEnglish", "Inception"),
    highestRatedInternational: mkMovie(2010, "highestRatedInternational", "Incendies")
  },

  // ==============================================================================
  // 2000s
  // ==============================================================================
  {
    ceremonyNumber: 82, ceremonyYear: 2010, filmYear: 2009,
    bestPicture: mkMovie(2009, "bestPicture", "The Hurt Locker"),
    bestInternational: mkMovie(2009, "bestInternational", "The Secret in Their Eyes"),
    highestRatedEnglish: mkMovie(2009, "highestRatedEnglish", "Inglourious Basterds"),
    highestRatedInternational: mkMovie(2009, "highestRatedInternational", "3 Idiots")
  },
  {
    ceremonyNumber: 81, ceremonyYear: 2009, filmYear: 2008,
    bestPicture: mkMovie(2008, "bestPicture", "Slumdog Millionaire"),
    bestInternational: mkMovie(2008, "bestInternational", "Departures"),
    highestRatedEnglish: mkMovie(2008, "highestRatedEnglish", "The Dark Knight"),
    highestRatedInternational: mkMovie(2008, "highestRatedInternational", "Ponyo")
  },
  {
    ceremonyNumber: 80, ceremonyYear: 2008, filmYear: 2007,
    bestPicture: mkMovie(2007, "bestPicture", "No Country for Old Men"),
    bestInternational: mkMovie(2007, "bestInternational", "The Counterfeiters"),
    highestRatedEnglish: mkMovie(2007, "highestRatedEnglish", "There Will Be Blood"),
    highestRatedInternational: mkMovie(2007, "highestRatedInternational", "The Diving Bell and the Butterfly")
  },
  {
    ceremonyNumber: 79, ceremonyYear: 2007, filmYear: 2006,
    bestPicture: mkMovie(2006, "bestPicture", "The Departed"),
    bestInternational: mkMovie(2006, "bestInternational", "The Lives of Others"),
    highestRatedEnglish: mkMovie(2006, "highestRatedEnglish", "The Departed"),
    highestRatedInternational: mkMovie(2006, "highestRatedInternational", "Pan's Labyrinth")
  },
  {
    ceremonyNumber: 78, ceremonyYear: 2006, filmYear: 2005,
    bestPicture: mkMovie(2005, "bestPicture", "Crash"),
    bestInternational: mkMovie(2005, "bestInternational", "Tsotsi"),
    highestRatedEnglish: mkMovie(2005, "highestRatedEnglish", "Brokeback Mountain"),
    highestRatedInternational: mkMovie(2005, "highestRatedInternational", "Cache")
  },
  {
    ceremonyNumber: 77, ceremonyYear: 2005, filmYear: 2004,
    bestPicture: mkMovie(2004, "bestPicture", "Million Dollar Baby"),
    bestInternational: mkMovie(2004, "bestInternational", "The Sea Inside"),
    highestRatedEnglish: mkMovie(2004, "highestRatedEnglish", "Before Sunset"),
    highestRatedInternational: mkMovie(2004, "highestRatedInternational", "Downfall")
  },
  {
    ceremonyNumber: 76, ceremonyYear: 2004, filmYear: 2003,
    bestPicture: mkMovie(2003, "bestPicture", "The Lord of the Rings: The Return of the King"),
    bestInternational: mkMovie(2003, "bestInternational", "The Barbarian Invasions"),
    highestRatedEnglish: mkMovie(2003, "highestRatedEnglish", "The Lord of the Rings: The Return of the King"),
    highestRatedInternational: mkMovie(2003, "highestRatedInternational", "Oldboy")
  },
  {
    ceremonyNumber: 75, ceremonyYear: 2003, filmYear: 2002,
    bestPicture: mkMovie(2002, "bestPicture", "Chicago"),
    bestInternational: mkMovie(2002, "bestInternational", "Nowhere in Africa"),
    highestRatedEnglish: mkMovie(2002, "highestRatedEnglish", "The Lord of the Rings: The Two Towers"),
    highestRatedInternational: mkMovie(2002, "highestRatedInternational", "City of God")
  },
  {
    ceremonyNumber: 74, ceremonyYear: 2002, filmYear: 2001,
    bestPicture: mkMovie(2001, "bestPicture", "A Beautiful Mind"),
    bestInternational: mkMovie(2001, "bestInternational", "No Man's Land"),
    highestRatedEnglish: mkMovie(2001, "highestRatedEnglish", "The Lord of the Rings: The Fellowship of the Ring"),
    highestRatedInternational: mkMovie(2001, "highestRatedInternational", "Spirited Away")
  },
  {
    ceremonyNumber: 73, ceremonyYear: 2001, filmYear: 2000,
    bestPicture: mkMovie(2000, "bestPicture", "Gladiator"),
    bestInternational: mkMovie(2000, "bestInternational", "Crouching Tiger, Hidden Dragon"),
    highestRatedEnglish: mkMovie(2000, "highestRatedEnglish", "Dancer in the Dark"),
    highestRatedInternational: mkMovie(2000, "highestRatedInternational", "Yi Yi")
  },

  // ==============================================================================
  // 1990s
  // ==============================================================================
  {
    ceremonyNumber: 72, ceremonyYear: 2000, filmYear: 1999,
    bestPicture: mkMovie(1999, "bestPicture", "American Beauty"),
    bestInternational: mkMovie(1999, "bestInternational", "All About My Mother"),
    highestRatedEnglish: mkMovie(1999, "highestRatedEnglish", "Fight Club"),
    highestRatedInternational: mkMovie(1999, "highestRatedInternational", "Beau Travail")
  },
  {
    ceremonyNumber: 71, ceremonyYear: 1999, filmYear: 1998,
    bestPicture: mkMovie(1998, "bestPicture", "Shakespeare in Love"),
    bestInternational: mkMovie(1998, "bestInternational", "Life Is Beautiful"),
    highestRatedEnglish: mkMovie(1998, "highestRatedEnglish", "Saving Private Ryan"),
    highestRatedInternational: mkMovie(1998, "highestRatedInternational", "Festen")
  },
  {
    ceremonyNumber: 70, ceremonyYear: 1998, filmYear: 1997,
    bestPicture: mkMovie(1997, "bestPicture", "Titanic"),
    bestInternational: mkMovie(1997, "bestInternational", "Character"),
    highestRatedEnglish: mkMovie(1997, "highestRatedEnglish", "Good Will Hunting"),
    highestRatedInternational: mkMovie(1997, "highestRatedInternational", "Princess Mononoke")
  },
  {
    ceremonyNumber: 69, ceremonyYear: 1997, filmYear: 1996,
    bestPicture: mkMovie(1996, "bestPicture", "The English Patient"),
    bestInternational: mkMovie(1996, "bestInternational", "Kolya"),
    highestRatedEnglish: mkMovie(1996, "highestRatedEnglish", "Secrets & Lies"),
    highestRatedInternational: mkMovie(1996, "highestRatedInternational", "A Moment of Innocence")
  },
  {
    ceremonyNumber: 68, ceremonyYear: 1996, filmYear: 1995,
    bestPicture: mkMovie(1995, "bestPicture", "Braveheart"),
    bestInternational: mkMovie(1995, "bestInternational", "Antonia's Line"),
    highestRatedEnglish: mkMovie(1995, "highestRatedEnglish", "Se7en"),
    highestRatedInternational: mkMovie(1995, "highestRatedInternational", "La Haine")
  },
  {
    ceremonyNumber: 67, ceremonyYear: 1995, filmYear: 1994,
    bestPicture: mkMovie(1994, "bestPicture", "Forrest Gump"),
    bestInternational: mkMovie(1994, "bestInternational", "Burnt by the Sun"),
    highestRatedEnglish: mkMovie(1994, "highestRatedEnglish", "The Shawshank Redemption"),
    highestRatedInternational: mkMovie(1994, "highestRatedInternational", "Chungking Express")
  },
  {
    ceremonyNumber: 66, ceremonyYear: 1994, filmYear: 1993,
    bestPicture: mkMovie(1993, "bestPicture", "Schindler's List"),
    bestInternational: mkMovie(1993, "bestInternational", "Belle Époque"),
    highestRatedEnglish: mkMovie(1993, "highestRatedEnglish", "Schindler's List"),
    highestRatedInternational: mkMovie(1993, "highestRatedInternational", "Three Colors: Blue")
  },
  {
    ceremonyNumber: 65, ceremonyYear: 1993, filmYear: 1992,
    bestPicture: mkMovie(1992, "bestPicture", "Unforgiven"),
    bestInternational: mkMovie(1992, "bestInternational", "Indochine"),
    highestRatedEnglish: mkMovie(1992, "highestRatedEnglish", "Twin Peaks: Fire Walk with Me"),
    highestRatedInternational: mkMovie(1992, "highestRatedInternational", "Baraka")
  },
  {
    ceremonyNumber: 64, ceremonyYear: 1992, filmYear: 1991,
    bestPicture: mkMovie(1991, "bestPicture", "The Silence of the Lambs"),
    bestInternational: mkMovie(1991, "bestInternational", "Mediterraneo"),
    highestRatedEnglish: mkMovie(1991, "highestRatedEnglish", "The Silence of the Lambs"),
    highestRatedInternational: mkMovie(1991, "highestRatedInternational", "A Brighter Summer Day")
  },
  {
    ceremonyNumber: 63, ceremonyYear: 1991, filmYear: 1990,
    bestPicture: mkMovie(1990, "bestPicture", "Dances with Wolves"),
    bestInternational: mkMovie(1990, "bestInternational", "Journey of Hope"),
    highestRatedEnglish: mkMovie(1990, "highestRatedEnglish", "Goodfellas"),
    highestRatedInternational: mkMovie(1990, "highestRatedInternational", "Close-Up")
  },

  // ==============================================================================
  // 1980s
  // ==============================================================================
  {
    ceremonyNumber: 62, ceremonyYear: 1990, filmYear: 1989,
    bestPicture: mkMovie(1989, "bestPicture", "Driving Miss Daisy"),
    bestInternational: mkMovie(1989, "bestInternational", "Cinema Paradiso"),
    highestRatedEnglish: mkMovie(1989, "highestRatedEnglish", "Do the Right Thing"),
    highestRatedInternational: mkMovie(1989, "highestRatedInternational", "Cinema Paradiso")
  },
  {
    ceremonyNumber: 61, ceremonyYear: 1989, filmYear: 1988,
    bestPicture: mkMovie(1988, "bestPicture", "Rain Man"),
    bestInternational: mkMovie(1988, "bestInternational", "Pelle the Conqueror"),
    highestRatedEnglish: mkMovie(1988, "highestRatedEnglish", "Die Hard"),
    highestRatedInternational: mkMovie(1988, "highestRatedInternational", "Grave of the Fireflies")
  },
  {
    ceremonyNumber: 60, ceremonyYear: 1988, filmYear: 1987,
    bestPicture: mkMovie(1987, "bestPicture", "The Last Emperor"),
    bestInternational: mkMovie(1987, "bestInternational", "Babette's Feast"),
    highestRatedEnglish: mkMovie(1987, "highestRatedEnglish", "Full Metal Jacket"),
    highestRatedInternational: mkMovie(1987, "highestRatedInternational", "Wings of Desire")
  },
  {
    ceremonyNumber: 59, ceremonyYear: 1987, filmYear: 1986,
    bestPicture: mkMovie(1986, "bestPicture", "Platoon"),
    bestInternational: mkMovie(1986, "bestInternational", "The Assault"),
    highestRatedEnglish: mkMovie(1986, "highestRatedEnglish", "Stand by Me"),
    highestRatedInternational: mkMovie(1986, "highestRatedInternational", "The Sacrifice")
  },
  {
    ceremonyNumber: 58, ceremonyYear: 1986, filmYear: 1985,
    bestPicture: mkMovie(1985, "bestPicture", "Out of Africa"),
    bestInternational: mkMovie(1985, "bestInternational", "The Official Story"),
    highestRatedEnglish: mkMovie(1985, "highestRatedEnglish", "Back to the Future"),
    highestRatedInternational: mkMovie(1985, "highestRatedInternational", "Come and See")
  },
  {
    ceremonyNumber: 57, ceremonyYear: 1985, filmYear: 1984,
    bestPicture: mkMovie(1984, "bestPicture", "Amadeus"),
    bestInternational: mkMovie(1984, "bestInternational", "Dangerous Moves"),
    highestRatedEnglish: mkMovie(1984, "highestRatedEnglish", "Paris, Texas"),
    highestRatedInternational: mkMovie(1984, "highestRatedInternational", "Nausicaä of the Valley of the Wind")
  },
  {
    ceremonyNumber: 56, ceremonyYear: 1984, filmYear: 1983,
    bestPicture: mkMovie(1983, "bestPicture", "Terms of Endearment"),
    bestInternational: mkMovie(1983, "bestInternational", "Fanny and Alexander"),
    highestRatedEnglish: mkMovie(1983, "highestRatedEnglish", "Scarface"),
    highestRatedInternational: mkMovie(1983, "highestRatedInternational", "Nostalghia")
  },
  {
    ceremonyNumber: 55, ceremonyYear: 1983, filmYear: 1982,
    bestPicture: mkMovie(1982, "bestPicture", "Gandhi"),
    bestInternational: mkMovie(1982, "bestInternational", "Volver a Empezar"),
    highestRatedEnglish: mkMovie(1982, "highestRatedEnglish", "The Thing"),
    highestRatedInternational: mkMovie(1982, "highestRatedInternational", "Fanny and Alexander")
  },
  {
    ceremonyNumber: 54, ceremonyYear: 1982, filmYear: 1981,
    bestPicture: mkMovie(1981, "bestPicture", "Chariots of Fire"),
    bestInternational: mkMovie(1981, "bestInternational", "Mephisto"),
    highestRatedEnglish: mkMovie(1981, "highestRatedEnglish", "Raiders of the Lost Ark"),
    highestRatedInternational: mkMovie(1981, "highestRatedInternational", "Das Boot")
  },
  {
    ceremonyNumber: 53, ceremonyYear: 1981, filmYear: 1980,
    bestPicture: mkMovie(1980, "bestPicture", "Ordinary People"),
    bestInternational: mkMovie(1980, "bestInternational", "Moscow Does Not Believe in Tears"),
    highestRatedEnglish: mkMovie(1980, "highestRatedEnglish", "The Empire Strikes Back"),
    highestRatedInternational: mkMovie(1980, "highestRatedInternational", "Kagemusha")
  },

  // ==============================================================================
  // 1970s
  // ==============================================================================
  {
    ceremonyNumber: 52, ceremonyYear: 1980, filmYear: 1979,
    bestPicture: mkMovie(1979, "bestPicture", "Kramer vs. Kramer"),
    bestInternational: mkMovie(1979, "bestInternational", "The Tin Drum"),
    highestRatedEnglish: mkMovie(1979, "highestRatedEnglish", "Apocalypse Now"),
    highestRatedInternational: mkMovie(1979, "highestRatedInternational", "Stalker")
  },
  {
    ceremonyNumber: 51, ceremonyYear: 1979, filmYear: 1978,
    bestPicture: mkMovie(1978, "bestPicture", "The Deer Hunter"),
    bestInternational: mkMovie(1978, "bestInternational", "Get Out Your Handkerchiefs"),
    highestRatedEnglish: mkMovie(1978, "highestRatedEnglish", "The Deer Hunter"),
    highestRatedInternational: mkMovie(1978, "highestRatedInternational", "Autumn Sonata")
  },
  {
    ceremonyNumber: 50, ceremonyYear: 1978, filmYear: 1977,
    bestPicture: mkMovie(1977, "bestPicture", "Annie Hall"),
    bestInternational: mkMovie(1977, "bestInternational", "Madame Rosa"),
    highestRatedEnglish: mkMovie(1977, "highestRatedEnglish", "Opening Night"),
    highestRatedInternational: mkMovie(1977, "highestRatedInternational", "Suspiria")
  },
  {
    ceremonyNumber: 49, ceremonyYear: 1977, filmYear: 1976,
    bestPicture: mkMovie(1976, "bestPicture", "Rocky"),
    bestInternational: mkMovie(1976, "bestInternational", "Black and White in Color"),
    highestRatedEnglish: mkMovie(1976, "highestRatedEnglish", "Network"),
    highestRatedInternational: mkMovie(1976, "highestRatedInternational", "In the Realm of the Senses")
  },
  {
    ceremonyNumber: 48, ceremonyYear: 1976, filmYear: 1975,
    bestPicture: mkMovie(1975, "bestPicture", "One Flew Over the Cuckoo's Nest"),
    bestInternational: mkMovie(1975, "bestInternational", "Dersu Uzala"),
    highestRatedEnglish: mkMovie(1975, "highestRatedEnglish", "Barry Lyndon"),
    highestRatedInternational: mkMovie(1975, "highestRatedInternational", "Mirror")
  },
  {
    ceremonyNumber: 47, ceremonyYear: 1975, filmYear: 1974,
    bestPicture: mkMovie(1974, "bestPicture", "The Godfather Part II"),
    bestInternational: mkMovie(1974, "bestInternational", "Amarcord"),
    highestRatedEnglish: mkMovie(1974, "highestRatedEnglish", "The Godfather Part II"),
    highestRatedInternational: mkMovie(1974, "highestRatedInternational", "Celine and Julie Go Boating")
  },
  {
    ceremonyNumber: 46, ceremonyYear: 1974, filmYear: 1973,
    bestPicture: mkMovie(1973, "bestPicture", "The Sting"),
    bestInternational: mkMovie(1973, "bestInternational", "Day for Night"),
    highestRatedEnglish: mkMovie(1973, "highestRatedEnglish", "Paper Moon"),
    highestRatedInternational: mkMovie(1973, "highestRatedInternational", "The Spirit of the Beehive")
  },
  {
    ceremonyNumber: 45, ceremonyYear: 1973, filmYear: 1972,
    bestPicture: mkMovie(1972, "bestPicture", "The Godfather"),
    bestInternational: mkMovie(1972, "bestInternational", "The Discreet Charm of the Bourgeoisie"),
    highestRatedEnglish: mkMovie(1972, "highestRatedEnglish", "The Godfather"),
    highestRatedInternational: mkMovie(1972, "highestRatedInternational", "Cries and Whispers")
  },
  {
    ceremonyNumber: 44, ceremonyYear: 1972, filmYear: 1971,
    bestPicture: mkMovie(1971, "bestPicture", "The French Connection"),
    bestInternational: mkMovie(1971, "bestInternational", "The Garden of the Finzi-Continis"),
    highestRatedEnglish: mkMovie(1971, "highestRatedEnglish", "The Devils"),
    highestRatedInternational: mkMovie(1971, "highestRatedInternational", "A Touch of Zen")
  },
  {
    ceremonyNumber: 43, ceremonyYear: 1971, filmYear: 1970,
    bestPicture: mkMovie(1970, "bestPicture", "Patton"),
    bestInternational: mkMovie(1970, "bestInternational", "Investigation of a Citizen Above Suspicion"),
    highestRatedEnglish: mkMovie(1970, "highestRatedEnglish", "Patton"),
    highestRatedInternational: mkMovie(1970, "highestRatedInternational", "Le Cercle Rouge")
  },

  // ==============================================================================
  // 1960s
  // ==============================================================================
  {
    ceremonyNumber: 42, ceremonyYear: 1970, filmYear: 1969,
    bestPicture: mkMovie(1969, "bestPicture", "Midnight Cowboy"),
    bestInternational: mkMovie(1969, "bestInternational", "Z"),
    highestRatedEnglish: mkMovie(1969, "highestRatedEnglish", "Kes"),
    highestRatedInternational: mkMovie(1969, "highestRatedInternational", "Army of Shadows")
  },
  {
    ceremonyNumber: 41, ceremonyYear: 1969, filmYear: 1968,
    bestPicture: mkMovie(1968, "bestPicture", "Oliver!"),
    bestInternational: mkMovie(1968, "bestInternational", "War and Peace"),
    highestRatedEnglish: mkMovie(1968, "highestRatedEnglish", "Once Upon a Time in the West"),
    highestRatedInternational: mkMovie(1968, "highestRatedInternational", "Once Upon a Time in the West")
  },
  {
    ceremonyNumber: 40, ceremonyYear: 1968, filmYear: 1967,
    bestPicture: mkMovie(1967, "bestPicture", "In the Heat of the Night"),
    bestInternational: mkMovie(1967, "bestInternational", "Closely Watched Trains"),
    highestRatedEnglish: mkMovie(1967, "highestRatedEnglish", "Cool Hand Luke"),
    highestRatedInternational: mkMovie(1967, "highestRatedInternational", "Playtime")
  },
  {
    ceremonyNumber: 39, ceremonyYear: 1967, filmYear: 1966,
    bestPicture: mkMovie(1966, "bestPicture", "A Man for All Seasons"),
    bestInternational: mkMovie(1966, "bestInternational", "A Man and a Woman"),
    highestRatedEnglish: mkMovie(1966, "highestRatedEnglish", "The Good, the Bad and the Ugly"),
    highestRatedInternational: mkMovie(1966, "highestRatedInternational", "Persona")
  },
  {
    ceremonyNumber: 38, ceremonyYear: 1966, filmYear: 1965,
    bestPicture: mkMovie(1965, "bestPicture", "The Sound of Music"),
    bestInternational: mkMovie(1965, "bestInternational", "The Shop on Main Street"),
    highestRatedEnglish: mkMovie(1965, "highestRatedEnglish", "For a Few Dollars More"),
    highestRatedInternational: mkMovie(1965, "highestRatedInternational", "Pierrot le Fou")
  },
  {
    ceremonyNumber: 37, ceremonyYear: 1965, filmYear: 1964,
    bestPicture: mkMovie(1964, "bestPicture", "My Fair Lady"),
    bestInternational: mkMovie(1964, "bestInternational", "Yesterday, Today and Tomorrow"),
    highestRatedEnglish: mkMovie(1964, "highestRatedEnglish", "Dr. Strangelove"),
    highestRatedInternational: mkMovie(1964, "highestRatedInternational", "Woman in the Dunes")
  },
  {
    ceremonyNumber: 36, ceremonyYear: 1964, filmYear: 1963,
    bestPicture: mkMovie(1963, "bestPicture", "Tom Jones"),
    bestInternational: mkMovie(1963, "bestInternational", "8½"),
    highestRatedEnglish: mkMovie(1963, "highestRatedEnglish", "The Great Escape"),
    highestRatedInternational: mkMovie(1963, "highestRatedInternational", "High and Low")
  },
  {
    ceremonyNumber: 35, ceremonyYear: 1963, filmYear: 1962,
    bestPicture: mkMovie(1962, "bestPicture", "Lawrence of Arabia"),
    bestInternational: mkMovie(1962, "bestInternational", "Sundays and Cybele"),
    highestRatedEnglish: mkMovie(1962, "highestRatedEnglish", "Lawrence of Arabia"),
    highestRatedInternational: mkMovie(1962, "highestRatedInternational", "Harakiri")
  },
  {
    ceremonyNumber: 34, ceremonyYear: 1962, filmYear: 1961,
    bestPicture: mkMovie(1961, "bestPicture", "West Side Story"),
    bestInternational: mkMovie(1961, "bestInternational", "Through a Glass Darkly"),
    highestRatedEnglish: mkMovie(1961, "highestRatedEnglish", "Judgment at Nuremberg"),
    highestRatedInternational: mkMovie(1961, "highestRatedInternational", "Yojimbo")
  },
  {
    ceremonyNumber: 33, ceremonyYear: 1961, filmYear: 1960,
    bestPicture: mkMovie(1960, "bestPicture", "The Apartment"),
    bestInternational: mkMovie(1960, "bestInternational", "The Virgin Spring"),
    highestRatedEnglish: mkMovie(1960, "highestRatedEnglish", "The Apartment"),
    highestRatedInternational: mkMovie(1960, "highestRatedInternational", "Le Trou")
  },

  // ==============================================================================
  // 1950s
  // ==============================================================================
  {
    ceremonyNumber: 32, ceremonyYear: 1960, filmYear: 1959,
    bestPicture: mkMovie(1959, "bestPicture", "Ben-Hur"),
    bestInternational: mkMovie(1959, "bestInternational", "Black Orpheus"),
    highestRatedEnglish: mkMovie(1959, "highestRatedEnglish", "Some Like It Hot"),
    highestRatedInternational: mkMovie(1959, "highestRatedInternational", "The Human Condition III")
  },
  {
    ceremonyNumber: 31, ceremonyYear: 1959, filmYear: 1958,
    bestPicture: mkMovie(1958, "bestPicture", "Gigi"),
    bestInternational: mkMovie(1958, "bestInternational", "Mon Oncle"),
    highestRatedEnglish: mkMovie(1958, "highestRatedEnglish", "Vertigo"),
    highestRatedInternational: mkMovie(1958, "highestRatedInternational", "Ivan the Terrible, Part II")
  },
  {
    ceremonyNumber: 30, ceremonyYear: 1958, filmYear: 1957,
    bestPicture: mkMovie(1957, "bestPicture", "The Bridge on the River Kwai"),
    bestInternational: mkMovie(1957, "bestInternational", "Nights of Cabiria"),
    highestRatedEnglish: mkMovie(1957, "highestRatedEnglish", "12 Angry Men"),
    highestRatedInternational: mkMovie(1957, "highestRatedInternational", "Wild Strawberries")
  },
  {
    ceremonyNumber: 29, ceremonyYear: 1957, filmYear: 1956,
    bestPicture: mkMovie(1956, "bestPicture", "Around the World in 80 Days"),
    bestInternational: mkMovie(1956, "bestInternational", "La Strada"),
    highestRatedEnglish: mkMovie(1956, "highestRatedEnglish", "Tea and Sympathy"),
    highestRatedInternational: mkMovie(1956, "highestRatedInternational", "A Man Escaped")
  },
  {
    ceremonyNumber: 28, ceremonyYear: 1956, filmYear: 1955,
    bestPicture: mkMovie(1955, "bestPicture", "Marty"),
    bestInternational: mkMovie(1955, "bestInternational", "Samurai I: Musashi Miyamoto"),
    highestRatedEnglish: mkMovie(1955, "highestRatedEnglish", "The Night of the Hunter"),
    highestRatedInternational: mkMovie(1955, "highestRatedInternational", "Ordet")
  },
  {
    ceremonyNumber: 27, ceremonyYear: 1955, filmYear: 1954,
    bestPicture: mkMovie(1954, "bestPicture", "On the Waterfront"),
    bestInternational: mkMovie(1954, "bestInternational", "Gate of Hell"),
    highestRatedEnglish: mkMovie(1954, "highestRatedEnglish", "Rear Window"),
    highestRatedInternational: mkMovie(1954, "highestRatedInternational", "Seven Samurai")
  },
  {
    ceremonyNumber: 26, ceremonyYear: 1954, filmYear: 1953,
    bestPicture: mkMovie(1953, "bestPicture", "From Here to Eternity"),
    bestInternational: mkMovie(1953, "bestInternational", "NONE"),
    highestRatedEnglish: mkMovie(1953, "highestRatedEnglish", "Roman Holiday"),
    highestRatedInternational: mkMovie(1953, "highestRatedInternational", "Tokyo Story")
  },
  {
    ceremonyNumber: 25, ceremonyYear: 1953, filmYear: 1952,
    bestPicture: mkMovie(1952, "bestPicture", "The Greatest Show on Earth"),
    bestInternational: mkMovie(1952, "bestInternational", "Forbidden Games"),
    highestRatedEnglish: mkMovie(1952, "highestRatedEnglish", "Singin' in the Rain"),
    highestRatedInternational: mkMovie(1952, "highestRatedInternational", "Ikiru")
  },
  {
    ceremonyNumber: 24, ceremonyYear: 1952, filmYear: 1951,
    bestPicture: mkMovie(1951, "bestPicture", "An American in Paris"),
    bestInternational: mkMovie(1951, "bestInternational", "Rashomon"),
    highestRatedEnglish: mkMovie(1951, "highestRatedEnglish", "Ace in the Hole"),
    highestRatedInternational: mkMovie(1951, "highestRatedInternational", "Diary of a Country Priest")
  },
  {
    ceremonyNumber: 23, ceremonyYear: 1951, filmYear: 1950,
    bestPicture: mkMovie(1950, "bestPicture", "All About Eve"),
    bestInternational: mkMovie(1950, "bestInternational", "The Walls of Malapaga"),
    highestRatedEnglish: mkMovie(1950, "highestRatedEnglish", "Sunset Boulevard"),
    highestRatedInternational: mkMovie(1950, "highestRatedInternational", "Los Olvidados")
  },

  // ==============================================================================
  // 1940s
  // ==============================================================================
  {
    ceremonyNumber: 22, ceremonyYear: 1950, filmYear: 1949,
    bestPicture: mkMovie(1949, "bestPicture", "All the King's Men"),
    bestInternational: mkMovie(1949, "bestInternational", "The Bicycle Thief"),
    highestRatedEnglish: mkMovie(1949, "highestRatedEnglish", "The Third Man"),
    highestRatedInternational: mkMovie(1949, "highestRatedInternational", "Late Spring")
  },
  {
    ceremonyNumber: 21, ceremonyYear: 1949, filmYear: 1948,
    bestPicture: mkMovie(1948, "bestPicture", "Hamlet"),
    bestInternational: mkMovie(1948, "bestInternational", "Monsieur Vincent"),
    highestRatedEnglish: mkMovie(1948, "highestRatedEnglish", "The Treasure of the Sierra Madre"),
    highestRatedInternational: mkMovie(1948, "highestRatedInternational", "Bicycle Thieves")
  },
  {
    ceremonyNumber: 20, ceremonyYear: 1948, filmYear: 1947,
    bestPicture: mkMovie(1947, "bestPicture", "Gentleman's Agreement"),
    bestInternational: mkMovie(1947, "bestInternational", "Shoeshine"),
    highestRatedEnglish: mkMovie(1947, "highestRatedEnglish", "Out of the Past"),
    highestRatedInternational: mkMovie(1947, "highestRatedInternational", "Black Narcissus")
  }
];

// Helper to get data sorted by evolution (Oldest -> Newest) and filtered start year
export const getProcessedData = (startYear = 1950) => {
  return oscarMasterList
    .filter((item) => item.filmYear >= startYear)
    .sort((a, b) => a.filmYear - b.filmYear); // Sort ascending
};