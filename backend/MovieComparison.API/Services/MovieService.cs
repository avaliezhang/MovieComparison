using Microsoft.Extensions.Logging;
using MovieComparison.API.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace MovieComparison.API.Services
{
    public class MovieService : IMovieService
    {
        private readonly ICinemaWorldService _cinemaWorldService;
        private readonly IFilmWorldService _filmWorldService;
        private readonly ILogger<MovieService> _logger;

        public MovieService(
            ICinemaWorldService cinemaWorldService,
            IFilmWorldService filmWorldService,
            ILogger<MovieService> logger)
        {
            _cinemaWorldService = cinemaWorldService;
            _filmWorldService = filmWorldService;
            _logger = logger;
        }

        public async Task<List<CombinedMovie>> GetCombinedMoviesAsync()
        {
            try
            {
                 
                var cinemaWorldTask = _cinemaWorldService.GetMoviesAsync();
                var filmWorldTask = _filmWorldService.GetMoviesAsync();

                await Task.WhenAll(cinemaWorldTask, filmWorldTask);

                var cinemaWorldMovies = cinemaWorldTask.Result ?? new List<Movie>();
                var filmWorldMovies = filmWorldTask.Result ?? new List<Movie>();

                var matchedMovies = (from cwMovie in cinemaWorldMovies
                                   join fwMovie in filmWorldMovies
                                   on new { cwMovie.Title, cwMovie.Year } 
                                   equals new { fwMovie.Title, fwMovie.Year }
                                   select new CombinedMovie
                                   {
                                       ID = cwMovie.ID,
                                       Title = cwMovie.Title,
                                       Year = cwMovie.Year,
                                       Poster = cwMovie.Poster ?? fwMovie.Poster ?? string.Empty,
                                       CinemaWorld = new ProviderID
                                       {
                                           ID = cwMovie.ID,
                                           IsAvailable = true
                                       },
                                       FilmWorld = new ProviderID
                                       {
                                           ID = fwMovie.ID,
                                           IsAvailable = true
                                       }
                                   }).ToList();

                return matchedMovies;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "error getting movie list");
                return new List<CombinedMovie>();
            }
        }

        public async Task<PriceComparison?> GetMoviePriceComparisonAsync(string cinemaWorldId, string filmWorldId)
        {
            try
            {
                
                var cinemaWorldTask = _cinemaWorldService.GetMovieAsync(cinemaWorldId);
                var filmWorldTask = _filmWorldService.GetMovieAsync(filmWorldId);
                
                await Task.WhenAll(cinemaWorldTask, filmWorldTask);
                
                var cinemaWorldMovie = cinemaWorldTask.Result;
                var filmWorldMovie = filmWorldTask.Result;
                
             
                if (cinemaWorldMovie == null && filmWorldMovie == null)
                {
                    return null;
                }

                
                decimal cinemaWorldPrice = 0;
                decimal filmWorldPrice = 0;
                
                if (cinemaWorldMovie?.Price != null)
                {
                    decimal.TryParse(cinemaWorldMovie.Price, NumberStyles.Any, CultureInfo.InvariantCulture, out cinemaWorldPrice);
                }
                
                if (filmWorldMovie?.Price != null)
                {
                    decimal.TryParse(filmWorldMovie.Price, NumberStyles.Any, CultureInfo.InvariantCulture, out filmWorldPrice);
                }
                
           
                var result = new PriceComparison
                {
                    ID = cinemaWorldId,
                    Title = cinemaWorldMovie?.Title ?? filmWorldMovie?.Title ?? string.Empty,
                    Year = cinemaWorldMovie?.Year ?? filmWorldMovie?.Year ?? string.Empty,
                    Poster = cinemaWorldMovie?.Poster ?? filmWorldMovie?.Poster ?? string.Empty,
                    CinemaWorld = new ProviderPrice
                    {
                        ID = cinemaWorldId,
                        Price = cinemaWorldPrice,
                        IsAvailable = cinemaWorldMovie != null
                    },
                    FilmWorld = new ProviderPrice
                    {
                        ID = filmWorldId,
                        Price = filmWorldPrice,
                        IsAvailable = filmWorldMovie != null
                    }
                };
                
             
                if (result.CinemaWorld.IsAvailable && result.FilmWorld.IsAvailable)
                {
                    if (result.CinemaWorld.Price <= result.FilmWorld.Price)
                    {
                        result.BestProvider = "Cinema World";
                        result.BestPrice = result.CinemaWorld.Price;
                    }
                    else
                    {
                        result.BestProvider = "Film World";
                        result.BestPrice = result.FilmWorld.Price;
                    }
                }
                else if (result.CinemaWorld.IsAvailable)
                {
                    result.BestProvider = "Cinema World";
                    result.BestPrice = result.CinemaWorld.Price;
                }
                else if (result.FilmWorld.IsAvailable)
                {
                    result.BestProvider = "Film World";
                    result.BestPrice = result.FilmWorld.Price;
                }
                
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "error comparing movie prices");
                return null;
            }
        }
    }
}