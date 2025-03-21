namespace MovieComparison.API.Configuration
{
    public class MovieApiSettings
    {
        public const string SectionName = "MovieApiSettings";
        
        public required string ApiToken { get; set; }
        public required string CinemaWorldBaseUrl { get; set; }
        public required string FilmWorldBaseUrl { get; set; }
    }
}