import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';


const MovieListPage = lazy(() => import('./pages/MovieListPage'));
const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage'));


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, 
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Suspense fallback={<div className="container mx-auto px-4 py-8"><LoadingSpinner /></div>}>
            <Routes>
              <Route path="/" element={<MovieListPage />} />
              <Route path="/movie/:cinemaWorldId/:filmWorldId" element={<MovieDetailPage />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;