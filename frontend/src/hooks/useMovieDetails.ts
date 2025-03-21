import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '../services/movieService';

export const useMovieDetails = (cinemaWorldId: string, filmWorldId: string) => {
  return useQuery({
    queryKey: ['movie', cinemaWorldId, filmWorldId],
    queryFn: () => getMovieDetails(cinemaWorldId, filmWorldId),
    enabled: Boolean(cinemaWorldId && filmWorldId),
    staleTime: 60 * 1000,  
    refetchOnWindowFocus: false,
  });
};