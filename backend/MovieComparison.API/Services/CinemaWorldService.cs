using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MovieComparison.API.Configuration;
using MovieComparison.API.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace MovieComparison.API.Services
{
    public class CinemaWorldService : ICinemaWorldService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<CinemaWorldService> _logger;
        private readonly MovieApiSettings _settings;

        public CinemaWorldService(
            HttpClient httpClient,
            IOptions<MovieApiSettings> options,
            ILogger<CinemaWorldService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _settings = options.Value;

            // Configure the HttpClient with the base address and headers
            _httpClient.BaseAddress = new Uri(_settings.CinemaWorldBaseUrl);
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _httpClient.DefaultRequestHeaders.Add("x-access-token", _settings.ApiToken);
        }

        public async Task<List<Movie>> GetMoviesAsync()
        {
            try
            {
                // Use .NET 8's HttpClient extensions
                var content = await _httpClient.GetStringAsync("movies");
                
                var movieResponse = JsonSerializer.Deserialize<MovieResponse>(content, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return movieResponse?.Movies ?? new List<Movie>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching movies from CinemaWorld");
                return new List<Movie>();  
            }
        }

        public async Task<MovieDetail?> GetMovieAsync(string id)
        {
            try
            {
                var content = await _httpClient.GetStringAsync($"movie/{id}");
                
                return JsonSerializer.Deserialize<MovieDetail>(content, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error fetching movie {id} from CinemaWorld");
                return null;   
            }
        }
    }
}