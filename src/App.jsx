import { useEffect, useState } from 'react';

import Search from './components/Search.jsx';
import { Loader } from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
   },
};

const App = () => {
   const [searchText, setSearchText] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const [movieList, setMovieList] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   const fetchMovies = async () => {
      setIsLoading(true);
      try {
         const endpoint = `${API_BASE_URL}/discover/movie?language=en-US&page=1&sort_by=popularity.desc`;

         const response = await fetch(endpoint, API_OPTIONS);
         if (!response.ok) {
            throw new Error('Failed to fetch movies!');
         }

         const data = await response.json();
         if (data.response === 'False') {
            setErrorMessage(
               data.Error || 'Failed to fetch movies. Please try again later.'
            );
            setMovieList([]);
            return;
         }
         setMovieList(data.results || []);
      } catch (e) {
         console.error('Error fetching movies:', e);
         setErrorMessage('Failed to fetch movies. Please try again later.');
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchMovies();
   }, []);

   return (
      <main>
         <div className="pattern" />
         <div className="wrapper">
            <header>
               <img src="./hero.png" alt="Hero Banner" />
               <h1>
                  Find <span className="text-gradient">Movies</span> You'll
                  Enjoy without the Hassle
               </h1>

               <Search searchTerm={searchText} setSearchTerm={setSearchText} />
            </header>

            <section className="all-movies mt-10">
               <h2>All Movies</h2>

               {isLoading ? (
                  <div className="flex justify-center">
                     <Loader />
                  </div>
               ) : errorMessage ? (
                  <p className="text-red-500">{errorMessage}</p>
               ) : (
                  <ul className="text-white">
                     {movieList.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                     ))}
                  </ul>
               )}
            </section>
         </div>
      </main>
   );
};

export default App;
