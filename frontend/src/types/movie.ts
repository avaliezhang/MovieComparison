export interface CombinedMovie {
  id: string;
  title: string;
  year: string;
  poster?: string;
  cinemaWorld: {
    id: string;
    isAvailable: boolean;
  };
  filmWorld: {
    id: string;
    isAvailable: boolean;
  };
}

export interface PriceComparison {
  id: string;
  title: string;
  year: string;
  poster?: string;
  cinemaWorld: {
    id: string;
    price: number;
    isAvailable: boolean;
  };
  filmWorld: {
    id: string;
    price: number;
    isAvailable: boolean;
  };
  bestProvider: string;
  bestPrice: number;
}