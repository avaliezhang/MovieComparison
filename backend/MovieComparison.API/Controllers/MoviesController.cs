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
        private readonly ICinemaWorldService _cinemaWorldService;
        private readonly IFilmWorldService _filmWorldService;
        private readonly ILogger<MoviesController> _logger;

         public MoviesController(
            IMovieService movieService,
            ICinemaWorldService cinemaWorldService,
            IFilmWorldService filmWorldService,
            ILogger<MoviesController> logger)
        {
            _movieService = movieService;
            _cinemaWorldService = cinemaWorldService;
            _filmWorldService = filmWorldService;
            _logger = logger;
        }

        [HttpGet()]
        public async Task<ActionResult<List<ComparisonResult>>> GetMovieComparisons()
        {
            _logger.LogInformation("Fetching all movie comparisons");
            var comparisons = await _movieService.GetMovieComparisonsAsync();
            return Ok(comparisons);
        }
         [HttpGet("cinemaworld")]
        public async Task<ActionResult<List<Movie>>> GetCinemaWorldMovies()
        {
            _logger.LogInformation("Fetching CinemaWorld movies");
            var movies = await _cinemaWorldService.GetMoviesAsync();
            
            if (movies == null || movies.Count == 0)
            {
                return NotFound("No movies available from CinemaWorld");
            }
            
            return Ok(movies);
        }

        [HttpGet("filmworld")]
        public async Task<ActionResult<List<Movie>>> GetFilmWorldMovies()
        {
            _logger.LogInformation("Fetching FilmWorld movies");
            var movies = await _filmWorldService.GetMoviesAsync();
            
            if (movies == null || movies.Count == 0)
            {
                return NotFound("No movies available from FilmWorld");
            }
            
            return Ok(movies);
        }

        [HttpGet("{cinemaWorldId}/{filmWorldId}")]
        public async Task<ActionResult<ComparisonResult>> GetMovieComparison(string cinemaWorldId, string filmWorldId)
        {
            _logger.LogInformation($"Fetching comparison for movie CW:{cinemaWorldId}, FW:{filmWorldId}");
            var comparison = await _movieService.GetMovieComparisonAsync(cinemaWorldId, filmWorldId);
            
            if (comparison == null)
            {
                return NotFound("Movie comparison not available. Both providers may be offline.");
            }
            
            return Ok(comparison);
        }
         [HttpGet("cinemaworld/{id}")]
        public async Task<ActionResult<MovieDetail>> GetCinemaWorldMovie(string id)
        {
            _logger.LogInformation($"Fetching CinemaWorld movie: {id}");
            var movie = await _cinemaWorldService.GetMovieAsync(id);
            
            if (movie == null)
            {
                return NotFound($"Movie with ID {id} not found in CinemaWorld");
            }
            
            return Ok(movie);
        }

        [HttpGet("filmworld/{id}")]
        public async Task<ActionResult<MovieDetail>> GetFilmWorldMovie(string id)
        {
            _logger.LogInformation($"Fetching FilmWorld movie: {id}");
            var movie = await _filmWorldService.GetMovieAsync(id);
            
            if (movie == null)
            {
                return NotFound($"Movie with ID {id} not found in FilmWorld");
            }
            
            return Ok(movie);
        }
    }
}