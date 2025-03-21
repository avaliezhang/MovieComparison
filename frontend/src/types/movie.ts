export interface Movie {
    id: string;
    title: string;
    year: number;
    poster: string;
    cinemaWorld: ProviderPrice;
    filmWorld: ProviderPrice;
    bestProvider: string;
    bestPrice: number;
  }
  
  export interface ProviderPrice {
    id: string;
    price: number;
    isAvailable: boolean;
  }
  
  export interface MovieDetail extends Movie {
    rated?: string;
    released?: string;
    runtime?: string;
    genre?: string;
    director?: string;
    plot?: string;
    actors?: string;
    language?: string;
    country?: string;
  }