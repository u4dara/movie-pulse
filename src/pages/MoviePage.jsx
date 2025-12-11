import { useLocation, useParams } from 'react-router-dom';
import { IoMdTrendingUp } from 'react-icons/io';
import { useEffect, useState } from 'react';

import { Loader } from '../components/Spinner.jsx';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
   },
};

const MoviePage = () => {
   const { state } = useLocation();
   const { id } = useParams();

   const movie = state?.movie;

   const [languages, setLanguages] = useState([]);
   const [genres, setGenres] = useState([]);
   const [errorMessage, setErrorMessage] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const fetchLanguages = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
         const response = await fetch(
            `${API_BASE_URL}/configuration/languages`,
            API_OPTIONS
         );

         if (!response.ok) {
            throw new Error('Failed to fetch languages');
         }

         const data = await response.json();

         if (data.response === 'False') {
            setErrorMessage(
               data.ERROR ||
                  'Failed to fetch languages. Please try again later.'
            );
            setLanguages([]);
            return;
         }

         setLanguages(data || []);
      } catch (e) {
         console.log('Error fetching languages:', e);
         setErrorMessage('Failed to fetch languages. Please try again later.');
      } finally {
         setIsLoading(false);
      }
   };

   const fetchGenre = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
         const response = await fetch(
            `${API_BASE_URL}/genre/movie/list?language=en`,
            API_OPTIONS
         );

         if (!response.ok) throw new Error('Failed to fetch genre');

         const data = await response.json();

         const genreNames = findGenreNames(movie.genre_ids, data.genres);
         setGenres(genreNames);
      } catch (e) {
         console.log('Error fetching genre:', e);
         setErrorMessage('Failed to fetch genre. Please try again later.');
      } finally {
         setIsLoading(false);
      }
   };

   const findLanguage = (movie) => {
      const language = languages.find(
         (object) => object.iso_639_1 === movie.original_language
      );
      return language ? language.english_name : 'N/A';
   };

   const findGenreNames = (genreIdList, genres) => {
      const genreObjects = genres.filter((genre) =>
         genreIdList.includes(genre.id)
      );

      const genreNames = genreObjects.map((genre) => genre.name);
      return genreNames;
   };

   const formatedDate = new Date(movie.release_date).toLocaleDateString(
      'en-US',
      {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      }
   );
   console.log(movie);

   useEffect(() => {
      fetchLanguages();
      fetchGenre();
   }, []);

   console.log(genres);

   return (
      <main>
         {isLoading ? (
            <div className="flex justify-center items-center h-screen">
               {' '}
               <Loader />{' '}
            </div>
         ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
         ) : (
            <div className="bg-dark-100">
               <div className="wrapper">
                  <section className="title flex flex-col">
                     <div className="flex justify-between mb-3">
                        <h2 className="text-[32px] flex flex-nowrap">
                           {movie.title}
                        </h2>
                        <div className="flex gap-2">
                           <div className="flex flex-col items-center justify-center px-3.5 bg-dark-trasparent rounded-md">
                              <div className="flex justify-center items-center text-gray-500 rounded-md">
                                 <img src="./star.svg" />
                                 <p className="ml-1 text-[16px] ">
                                    {movie.vote_average.toFixed(1)}/10 (
                                    {movie.vote_count})
                                 </p>
                              </div>
                           </div>
                           <div className="flex flex-col items-center justify-center px-3.5 bg-dark-trasparent rounded-md">
                              <div className="flex justify-center items-center text-gray-500 rounded-md">
                                 <IoMdTrendingUp />
                                 <p className=" ml-1 text-[16px] ">1</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="text-gray-500">
                        <label>
                           {movie.release_date
                              ? movie.release_date.split('-')[0]
                              : 'N/A'}
                        </label>
                        <span className="mx-1.5">&#183;</span>
                     </div>
                  </section>
                  <section className="movie-images flex flex-col gap-5 md:flex-row">
                     <div className="movie-poster flex-1">
                        <img
                           className="w-full h-100 object-contain rounded-md"
                           src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                           alt={movie.title}
                        />
                     </div>
                  </section>
                  <div className="movie-details">
                     <table className="min-w-full flex justify-center">
                        <tbody className="align-top">
                           <tr className="align-center">
                              <td className="p-3 text-table-header ">
                                 Generes
                              </td>
                              <td className="p-3 flex gap-2">
                                 {genres.map((genre, index) => {
                                    return (
                                       <div
                                          className="text-white bg-dark-trasparent px-3 py-2 rounded-md"
                                          key={index}
                                       >
                                          {genre}
                                       </div>
                                    );
                                 })}
                              </td>
                           </tr>

                           <tr className="">
                              <td className="p-3 text-table-header">
                                 Overview
                              </td>
                              <td className="p-3 text-white">
                                 {movie.overview}
                              </td>
                           </tr>

                           <tr className="">
                              <td className="p-3 text-table-header text-nowrap">
                                 Release Date
                              </td>
                              <td className="p-3 text-white">{formatedDate}</td>
                           </tr>

                           <tr className="">
                              <td className="p-3 text-table-header text-nowrap">
                                 Language
                              </td>
                              <td className="p-3 text-white">
                                 {findLanguage(movie)}
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         )}
      </main>
   );
};
export default MoviePage;
