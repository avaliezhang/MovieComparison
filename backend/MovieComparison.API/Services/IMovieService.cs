using MovieComparison.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieComparison.API.Services
{
    public interface IMovieService
    {
        Task<List<ComparisonResult>> GetMovieComparisonsAsync();
        Task<ComparisonResult?> GetMovieComparisonAsync(string cinemaWorldId, string filmWorldId);
    }
}