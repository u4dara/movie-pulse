import { useLocation, useParams } from 'react-router-dom';
import { IoMdTrendingUp } from 'react-icons/io';

const MoviePage = () => {
   const { state } = useLocation();
   const { id } = useParams();

   const movie = state?.movie;
   console.log(movie);

   if (!movie) {
      return <p>No movie data found. Try going back.</p>;
   }

   return (
      <main>
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
               <section className="movie-poster">
                  <img
                     className="w-full rounded-md"
                     src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                     alt={movie.title}
                  />
                  <p>{movie.overview}</p>
               </section>
            </div>
         </div>
      </main>
   );
};
export default MoviePage;
