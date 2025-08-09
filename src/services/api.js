const API_KEY = "5b648ef9b864f03fb07f39dc1e47afc5";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.result;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search.movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.result;
};
