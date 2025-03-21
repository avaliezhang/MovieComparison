namespace MovieComparison.API.Models
{
    public class ComparisonResult
    {
        public string ID { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Year { get; set; }= string.Empty;
        public string Poster { get; set; } = string.Empty;
        public ProviderPrice CinemaWorld { get; set; } = new ProviderPrice();
        public ProviderPrice FilmWorld { get; set; } = new ProviderPrice();
        public string BestProvider { get; set; } = string.Empty;
        public decimal BestPrice { get; set; }
    }

    public class ProviderPrice
    {
        public string ID { get; set; } = string.Empty;
        public string Price { get; set; } = string.Empty;
        public bool IsAvailable { get; set; }
    }
}