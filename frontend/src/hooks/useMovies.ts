import { useQuery } from '@tanstack/react-query';
import { getCombinedMovies, getMoviePrice } from '../services/movieService';

export const useCombinedMovies = () => {
  return useQuery({
    queryKey: ['combinedMovies'],
    queryFn: getCombinedMovies,
    staleTime: 5 * 60 * 1000,  
  });
};;

export const useMoviePrice = (cinemaWorldId: string, filmWorldId: string, options = {}) => {
  return useQuery({
    queryKey: ['moviePrice', cinemaWorldId, filmWorldId],
    queryFn: () => getMoviePrice(cinemaWorldId, filmWorldId),
    enabled: Boolean(cinemaWorldId && filmWorldId),
    staleTime: 30 * 1000,  
    ...options
  });
};