import React, { useState } from 'react';
import { CombinedMovie } from '../types/movie';
import { useMoviePrice } from '../hooks/useMovies';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface MovieCardProps {
  movie: CombinedMovie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [showPrice, setShowPrice] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const { 
    data: priceData, 
    isLoading: isPriceLoading, 
    isError: isPriceError,
    error
  } = useMoviePrice(
    movie.cinemaWorld.id, 
    movie.filmWorld.id, 
    { enabled: showPrice }
  );
 
console.log(priceData,'priceData');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 w-full bg-gray-100">
        {!imageError && movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 p-2 text-center">
            <div style={{ 
              maxWidth: '100%', 
              wordWrap: 'break-word', 
              overflowWrap: 'break-word',
              whiteSpace: 'normal'
            }}>
              {movie.title}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h2 className="text-sm font-bold text-gray-800" style={{ 
          wordWrap: 'break-word', 
          overflowWrap: 'break-word', 
          whiteSpace: 'normal' 
        }}>
          {movie.title}
        </h2>
        <p className="text-xs text-gray-600 mt-1">{movie.year}</p>
        
        {!showPrice ? (
          <button 
            onClick={() => setShowPrice(true)}
            className="mt-3 w-full py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
          >
            Compare Prices
          </button>
        ) : isPriceLoading ? (
          <div className="mt-3 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : isPriceError ? (
          <ErrorMessage message={
            error instanceof Error 
              ? `Error: ${error.message}` 
              : "Error loading prices"
          } />
        ) : priceData ? (
          <div className="mt-3 bg-blue-50 p-3 rounded">
            <div className="text-sm font-bold text-center mb-2">
              Best Price: ${priceData.bestPrice.toFixed(2)} 
              <span className="ml-1 text-blue-700">({priceData.bestProvider})</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={`p-2 rounded ${priceData.bestProvider === 'Cinema World' ? 'bg-green-100' : 'bg-gray-100'}`}>
                <div className="font-semibold">Cinema World</div>
                {priceData.cinemaWorld.isAvailable ? (
                  <div className={priceData.bestProvider === 'Cinema World' ? 'font-bold' : ''}>
                    ${priceData.cinemaWorld.price.toFixed(2)}
                  </div>
                ) : (
                  <div className="italic text-gray-500">Unavailable</div>
                )}
              </div>
              
              <div className={`p-2 rounded ${priceData.bestProvider === 'Film World' ? 'bg-green-100' : 'bg-gray-100'}`}>
                <div className="font-semibold">Film World</div>
                {priceData.filmWorld.isAvailable ? (
                  <div className={priceData.bestProvider === 'Film World' ? 'font-bold' : ''}>
                    ${priceData.filmWorld.price.toFixed(2)}
                  </div>
                ) : (
                  <div className="italic text-gray-500">Unavailable</div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MovieCard;