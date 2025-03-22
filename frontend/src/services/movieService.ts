import axios from 'axios';
import { CombinedMovie, PriceComparison } from '../types/movie';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5249/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCombinedMovies = async (): Promise<CombinedMovie[]> => {
  try {
 
    const response = await apiClient.get<CombinedMovie[]>('/movies');
    return response.data;
  } catch (error) {
    console.error('error fetching combined movies:', error);
    return [];
  }
};

export const getMoviePrice = async (cinemaWorldId: string, filmWorldId: string): Promise<PriceComparison> => {
  try {
    console.log(`Fetching price for CW:${cinemaWorldId}, FW:${filmWorldId}`);
    const response = await apiClient.get<PriceComparison>(`/movies/price/${cinemaWorldId}/${filmWorldId}`);
    return response.data;
  } catch (error) {
    console.error('error fetching movie price:', error);
    throw error;
  }
};