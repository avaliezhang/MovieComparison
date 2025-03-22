namespace MovieComparison.API.Models
{
public class CombinedMovie
{
    public string ID { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Year { get; set; } = string.Empty;
    public string Poster { get; set; } = string.Empty;
    public ProviderID CinemaWorld { get; set; } = new ProviderID();
    public ProviderID FilmWorld { get; set; } = new ProviderID();
}

public class ProviderID
{
    public string ID { get; set; } = string.Empty;
    public bool IsAvailable { get; set; }
}
}