import React, { useState, useMemo } from 'react';
import { useCombinedMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MovieListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: movies = [], isLoading, error, isError } = useCombinedMovies();
  
  const filteredMovies = useMemo(() => {
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  return (
    <div className="w-[80%] mx-auto border-b border-transparent">
      <div className='my-10'>
      <input
        type="text"
        placeholder="Search movies..."
        className="w-full px-4 py-2 border border-gray-300 rounded-full 
          text-gray-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
          transition duration-300 ease-in-out 
          shadow-sm hover:shadow-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
</div>
      {isLoading && movies.length === 0 && (
        <div className="flex justify-center py-8 ">
          <LoadingSpinner />
        </div>
      )}
      
      {isError && (
        <ErrorMessage message={(error as Error)?.message || 'Failed to load movies'} />
      )}

      {!isLoading && filteredMovies.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No movies found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {filteredMovies.map(movie => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieListPage;