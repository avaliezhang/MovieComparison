import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MovieListPage from './pages/MovieListPage';
 
 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 500,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      
      <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold mb-0">Movie Price Finder</h1>
        <p className="text-sm opacity-80 mt-0">Find the best movie deals</p>
      </div>
      </header>
        <main>
          <MovieListPage />
        </main>
     
    </QueryClientProvider>
  );
}

export default App;