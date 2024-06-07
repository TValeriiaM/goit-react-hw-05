import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

// const KEY = "3c1d69cf02a4e6a27a78dbd71c0ebc06";

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzFkNjljZjAyYTRlNmEyN2E3OGRiZDcxYzBlYmMwNiIsInN1YiI6IjY2NWEzOGM1YmY4NDljMTQwMWI2OTMzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Z4hthCrvUTYwChfEPS_YZ6yuKuUaPX0Yec6sqOy8h1c",
  },
};

export async function getTrendingMovies() {
  const response = await axios.get(`/trending/movie/day`, options);
  return response.data;
}

export async function getSearchMovies(query) {
  const response = await axios.get(`/search/movie?query=${query}`, options);
  return response.data;
}

export async function getMovieDetails(movie_id) {
  const response = await axios.get(`/movie/${movie_id}`, options);
  return response.data;
}

export async function getMovieCredits(movie_id) {
  const response = await axios.get(`/movie/${movie_id}/credits`, options);
  return response.data.cast;
}

export async function getMovieReviews(movie_id) {
  const response = await axios.get(`/movie/${movie_id}/reviews`, options);
  return response.data.results;
}
