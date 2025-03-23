
# Movie Price Finder

Movie Price Finder is a web application that allows users to compare movie prices from two providers (Cinema World and Film World) and displays the cheapest option.

## How to Run This Project

### Prerequisites

- **.NET 8 SDK**
- **Node.js** (v16 or higher)
- **npm** 

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```
2. **Restore the dependencies:**
   ```bash
   dotnet restore
   ```
3. **Update the API token in `appsettings.development.json` :**
   ```json
   "MovieApiSettings": {
     "ApiToken": "API_TOKEN",
     "CinemaWorldBaseUrl": "https://webjetapitest.azurewebsites.net/api/cinemaworld/",
     "FilmWorldBaseUrl": "https://webjetapitest.azurewebsites.net/api/filmworld/"
   }
   ```
4. **Run the backend:**
   ```bash
   dotnet run
   ```
   The API will be available at: [https://localhost:5249/api](https://localhost:5249/api)

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a `.env.development` file with the API base URL:**
   ```env
   VITE_API_URL=http://localhost:5249/api
   ```
4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   The application will be available at: [http://localhost:5173](http://localhost:5173)

## Project Features

### Backend Implementation

- **Resilient API Integration:**
  - **Provider Service Abstraction:** Separate interfaces and implementations for each movie provider.
  - **Parallel API Requests:** Simultaneously fetch data from both providers for faster response times.
  - **Timeout Handling:** 5-second timeout for external API calls and an 8-second overall operation timeout.
  - **Graceful Degradation:** Returns partial results when one provider is unavailable.
  - **Error Handling:** Comprehensive error handling with appropriate logging.

- **Performance Optimizations:**
  - **Retry Policy:** Automatically retries failed requests with exponential backoff.
  - **Circuit Breaker Pattern:** Prevents cascade failures when a provider is consistently down.
  - **Task.WhenAny:** Processes results as they become available rather than waiting for all.

- **Data Processing:**
  - **Movie Matching:** Matches movies across providers based on title and year.
  - **Price Parsing:** Handles string-to-decimal conversion for accurate price comparison.
  - **Best Price Determination:** Identifies the provider with the best price.
  - **Combined Movie List:** Creates a unified list from both providers, handling duplicates.

### Frontend Implementation

- **Modern React Architecture:**
  - **TypeScript Integration:** Type-safe components and API interactions.
  - **React Query:** Efficient data fetching with caching and automatic refetching.
  - **Component Organization:** Clean separation of pages, components, and services.

- **User Interface Features:**
  - **Responsive Design:** Works on mobile, tablet, and desktop devices.
  - **Search Functionality:** Filter movies by title.
  - **Loading States:** Visual indicators when data is being fetched.
  - **Error Handling:** User-friendly error messages when providers are unavailable.

- **Price Comparison Modal:**
  - **On-Demand Price Fetching:** Prices are loaded only when requested.
  - **Visual Highlighting:** The best price is visually distinguished.
  - **Provider Status:** Clear indication when a provider is unavailable.

## Technical Implementation

The application is built with:

- **Backend:** .NET 8 Web API with dependency injection and comprehensive error handling.
- **Frontend:** React 18 with TypeScript, Vite, and Tailwind CSS.
- **Data Fetching:** React Query for the frontend and optimized HttpClient for the backend.
- **Styling:** Tailwind CSS for responsive, utility-first styling.

## Future Enhancements

Potential future improvements include:

- User authentication and saved favorites.
- More detailed movie information.
- Additional movie providers.
- A caching layer for improved performance.
- Unit and integration tests.

---