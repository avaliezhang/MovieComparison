using MovieComparison.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieComparison.API.Services
{
   public interface IMovieService
{
    Task<List<CombinedMovie>> GetCombinedMoviesAsync();
    Task<PriceComparison?> GetMoviePriceComparisonAsync(string cinemaWorldId, string filmWorldId);
}
}