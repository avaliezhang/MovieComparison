import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const placeholderImage = 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <Link 
      to={`/movie/${movie.cinemaWorld.id}/${movie.filmWorld.id}`} 
      className="card hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img
          src={movie.poster || placeholderImage}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = placeholderImage;
          }}
        />
        <div className="absolute bottom-0 right-0 bg-primary text-white px-2 py-1 text-sm font-bold m-2 rounded">
          ${movie.bestPrice.toFixed(2)}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
        <p className="text-sm text-gray-600">{movie.year}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xs text-gray-700">
            Best price from: {movie.bestProvider}
          </span>
          {(!movie.cinemaWorld.isAvailable || !movie.filmWorld.isAvailable) && (
            <span className="text-xs text-yellow-600 font-semibold">Limited availability</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default memo(MovieCard);