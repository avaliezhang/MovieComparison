import axios from 'axios';
import { Movie, MovieDetail } from '../types/movie';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getMovies = async (): Promise<Movie[]> => {
  try {
    const response = await apiClient.get<Movie[]>('/movies');
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};


export const getMovieDetails = async (
  cinemaWorldId: string, 
  filmWorldId: string
): Promise<MovieDetail | null> => {
  try {
    const response = await apiClient.get<MovieDetail>(
      `/movies/${cinemaWorldId}/${filmWorldId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};