import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovieDetails } from '../hooks/useMovieDetails';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import PriceTag from '../components/PriceTag';

const MovieDetailPage: React.FC = () => {
  const { cinemaWorldId = '', filmWorldId = '' } = useParams<{ 
    cinemaWorldId: string; 
    filmWorldId: string 
  }>();
  
  const { 
    data: movie, 
    isLoading, 
    isError, 
    error 
  } = useMovieDetails(cinemaWorldId, filmWorldId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="text-primary hover:underline mb-4 inline-block">
          &larr; Back to Movies
        </Link>
        <ErrorMessage message={(error as Error)?.message || 'Movie details not available'} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-primary hover:underline mb-4 inline-block">
        &larr; Back to Movies
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-100">
            <img
              src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
              }}
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            <p className="text-gray-600 mb-4">{movie.year}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Price Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded border">
                  <h3 className="font-semibold">CinemaWorld</h3>
                  <PriceTag 
                    price={movie.cinemaWorld.price} 
                    isBest={movie.bestProvider === 'CinemaWorld'}
                    provider="CinemaWorld"
                    isAvailable={movie.cinemaWorld.isAvailable}
                  />
                </div>
                
                <div className="bg-gray-50 p-4 rounded border">
                  <h3 className="font-semibold">FilmWorld</h3>
                  <PriceTag 
                    price={movie.filmWorld.price} 
                    isBest={movie.bestProvider === 'FilmWorld'}
                    provider="FilmWorld"
                    isAvailable={movie.filmWorld.isAvailable}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded mb-6 border border-blue-100">
              <h3 className="font-semibold text-blue-800">Best Deal</h3>
              <p className="text-lg font-bold text-blue-800">
                ${movie.bestPrice.toFixed(2)} from {movie.bestProvider}
              </p>
            </div>
            
            {/* Additional movie details */}
            {movie.plot && (
              <div className="mb-4">
                <h3 className="font-semibold">Plot</h3>
                <p className="text-gray-700">{movie.plot}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              {movie.director && (
                <div>
                  <h3 className="font-semibold text-sm">Director</h3>
                  <p className="text-gray-700">{movie.director}</p>
                </div>
              )}
              
              {movie.genre && (
                <div>
                  <h3 className="font-semibold text-sm">Genre</h3>
                  <p className="text-gray-700">{movie.genre}</p>
                </div>
              )}
              
              {movie.rated && (
                <div>
                  <h3 className="font-semibold text-sm">Rated</h3>
                  <p className="text-gray-700">{movie.rated}</p>
                </div>
              )}
              
              {movie.runtime && (
                <div>
                  <h3 className="font-semibold text-sm">Runtime</h3>
                  <p className="text-gray-700">{movie.runtime}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;