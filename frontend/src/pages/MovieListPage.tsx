import React, { useState, useMemo } from 'react';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MovieListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: movies = [], isLoading, error, isError } = useMovies();

  const filteredMovies = useMemo(() => {
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  if (isLoading && movies.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Movie Price Comparison</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isError && (
        <ErrorMessage message={(error as Error)?.message || 'Failed to load movies'} />
      )}

      {movies.length === 0 && !isLoading ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No movies available at the moment. Please try again later.</p>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No movies found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieListPage;