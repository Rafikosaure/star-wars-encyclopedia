const config = {
  deeplApiKey: import.meta.env.VITE_DEEPL_API_KEY,
  serverEndpoint: import.meta.env.VITE_EXPRESS_SERVER_ENDPOINT,
  clientEndpoint: import.meta.env.VITE_CLIENT_ENDPOINT,
  starWarsAPI: import.meta.env.VITE_STAR_WARS_DATABANK_API,
  persistentConnect: import.meta.env.VITE_PERSISTENT_CONNECTION_TOKEN,
  tmdbApiKey: import.meta.env.VITE_TMDB_API_KEY,
  tmdbMoviesListId: import.meta.env.VITE_TMDB_MOVIES_LIST_ID,
  tmdbSeriesListId: import.meta.env.VITE_TMDB_SERIES_LIST_ID,
  tmdbMovieImagePath: import.meta.env.VITE_TMDB_MOVIE_IMAGE_PATH,
  tmdbApiEndpoint: import.meta.env.VITE_TMDB_API_ENDPOINT,
  youtubeTrailersEndpoint: import.meta.env.VITE_YOUTUBE_TRAILERS_ENDPOINT,
  youtubeImgThumbnailEndpoint: import.meta.env.VITE_YOUTUBE_IMG_THUMBNAIL_ENDPOINT,
  disneyPlusEndpoint: import.meta.env.VITE_DISNEY_PLUS_ENDPOINT,
  starWarsShoppingApi: import.meta.env.VITE_STAR_WARS_SHOPPING_API,
  shoppingStringSession: import.meta.env.VITE_SHOPPING_STRING_SESSION,
};

export default config;
