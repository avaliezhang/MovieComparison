using Microsoft.Extensions.Logging;
using MovieComparison.API.Models;
using System;
using System.Collections.Generic;
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

        public async Task<List<ComparisonResult>> GetMovieComparisonsAsync()
        {
            try
            {
                // Execute API calls in parallel
                var cinemaWorldTask = _cinemaWorldService.GetMoviesAsync();
                var filmWorldTask = _filmWorldService.GetMoviesAsync();

                // Wait for both tasks to complete, regardless of whether they succeed or fail
                await Task.WhenAll(cinemaWorldTask, filmWorldTask);

                var cinemaWorldMovies = cinemaWorldTask.Result;
                var filmWorldMovies = filmWorldTask.Result;

                // Match movies by title and year
                var matchedMovies = from cwMovie in cinemaWorldMovies
                                    join fwMovie in filmWorldMovies
                                    on new { cwMovie.Title, cwMovie.Year } equals new { fwMovie.Title, fwMovie.Year }
                                    select new { CinemaWorldMovie = cwMovie, FilmWorldMovie = fwMovie };

                // Get details for each matched movie
                var comparisonResults = new List<ComparisonResult>();
                
                foreach (var match in matchedMovies)
                {
                    var comparison = await GetMovieComparisonAsync(match.CinemaWorldMovie.ID, match.FilmWorldMovie.ID);
                    if (comparison != null)
                    {
                        comparisonResults.Add(comparison);
                    }
                }

                return comparisonResults;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting movie comparisons");
                return new List<ComparisonResult>();
            }
        }

        public async Task<ComparisonResult?> GetMovieComparisonAsync(string cinemaWorldId, string filmWorldId)
        {
            try
            {
                var cinemaWorldTask = _cinemaWorldService.GetMovieAsync(cinemaWorldId);
                var filmWorldTask = _filmWorldService.GetMovieAsync(filmWorldId);

                // Wait for both tasks to complete, regardless of whether they succeed or fail
                await Task.WhenAll(cinemaWorldTask, filmWorldTask);

                var cinemaWorldMovie = cinemaWorldTask.Result;
                var filmWorldMovie = filmWorldTask.Result;

                // If both services failed, return null
                if (cinemaWorldMovie == null && filmWorldMovie == null)
                {
                    return null;
                }

                // Create the comparison result using available data
                var result = new ComparisonResult
                {
                    ID = cinemaWorldMovie?.ID ?? filmWorldMovie?.ID ?? string.Empty,
                    Title = cinemaWorldMovie?.Title ?? filmWorldMovie?.Title ?? string.Empty,
                    Year = cinemaWorldMovie?.Year ?? filmWorldMovie?.Year ??  string.Empty,
                    Poster = cinemaWorldMovie?.Poster ?? filmWorldMovie?.Poster ?? string.Empty,
                    CinemaWorld = new ProviderPrice
                    {
                        ID = cinemaWorldMovie?.ID ?? string.Empty,
                        Price = cinemaWorldMovie?.Price ??  string.Empty,
                        IsAvailable = cinemaWorldMovie != null
                    },
                    FilmWorld = new ProviderPrice
                    {
                        ID = filmWorldMovie?.ID ?? string.Empty,
                        Price = filmWorldMovie?.Price ??  string.Empty,
                        IsAvailable = filmWorldMovie != null
                    }
                };

                // Determine the best price
            if (result.CinemaWorld.IsAvailable && result.FilmWorld.IsAvailable)
{
    // Parse the price strings into decimals.
    bool cinemaParsed = decimal.TryParse(result.CinemaWorld.Price, out decimal cinemaPrice);
    bool filmParsed = decimal.TryParse(result.FilmWorld.Price, out decimal filmPrice);

    // If parsing fails, you might want to handle it (here we default to 0).
    if (!cinemaParsed)
    {
        cinemaPrice = 0m;
    }
    if (!filmParsed)
    {
        filmPrice = 0m;
    }

    // Compare the parsed decimal values.
    if (cinemaPrice <= filmPrice)
    {
        result.BestProvider = "CinemaWorld";
        result.BestPrice = cinemaPrice;
    }
    else
    {
        result.BestProvider = "FilmWorld";
        result.BestPrice = filmPrice;
    }
}
else if (result.CinemaWorld.IsAvailable)
{
    if (decimal.TryParse(result.CinemaWorld.Price, out decimal cinemaPrice))
    {
        result.BestProvider = "CinemaWorld";
        result.BestPrice = cinemaPrice;
    }
    else
    {
        // Handle parse failure as needed.
        result.BestProvider = "CinemaWorld";
        result.BestPrice = 0m;
    }
}
else
{
    if (decimal.TryParse(result.FilmWorld.Price, out decimal filmPrice))
    {
        result.BestProvider = "FilmWorld";
        result.BestPrice = filmPrice;
    }
    else
    {
        // Handle parse failure as needed.
        result.BestProvider = "FilmWorld";
        result.BestPrice = 0m;
    }
}

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error comparing movie prices");
                return null;
            }
        }
    }
}