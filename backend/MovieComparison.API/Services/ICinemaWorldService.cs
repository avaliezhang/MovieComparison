using MovieComparison.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieComparison.API.Services
{
    public interface ICinemaWorldService
    {
        Task<List<Movie>> GetMoviesAsync();
        Task<MovieDetail> GetMovieAsync(string id);
    }
}