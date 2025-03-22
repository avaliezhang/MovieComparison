using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MovieComparison.API.Models;
using MovieComparison.API.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieComparison.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieService _movieService;
        private readonly ILogger<MoviesController> _logger;

        public MoviesController(IMovieService movieService, ILogger<MoviesController> logger)
        {
            _movieService = movieService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<CombinedMovie>>> GetCombinedMovies()
        {
        _logger.LogInformation("Fetching combined movies list");
        var combinedMovies = await _movieService.GetCombinedMoviesAsync();
            // if no result return empty list rather than 404
        if (combinedMovies == null || combinedMovies.Count == 0)
        {
            _logger.LogWarning("No combined movies found or both providers are unavailable");
            return Ok(new List<CombinedMovie>()); 
        }

        return Ok(combinedMovies);
        }

        [HttpGet("price/{cinemaWorldId}/{filmWorldId}")]
        public async Task<ActionResult<PriceComparison>> GetMoviePriceComparison(string cinemaWorldId, string filmWorldId)
        {
            _logger.LogInformation($"Fetching price comparison for CW:{cinemaWorldId}, FW:{filmWorldId}");
            
             
            if (string.IsNullOrEmpty(cinemaWorldId) || string.IsNullOrEmpty(filmWorldId))
            {
                _logger.LogWarning("missing provider IDs");
                return BadRequest("Both Ids are required");
            }
            
            var comparison = await _movieService.GetMoviePriceComparisonAsync(cinemaWorldId, filmWorldId);
            
            if (comparison == null)
            {
                _logger.LogWarning($"Movie comparison not available for CW:{cinemaWorldId}, FW:{filmWorldId}");
                return NotFound("Movie comparison not available. Both providers may be offline.");
            }
            
            return Ok(comparison);
        }
    }
}