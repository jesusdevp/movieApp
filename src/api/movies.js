import {API_HOST, API_KEY, LANG} from '../utils/config';

export const getNewsMoviesApi = (page = 1) => {
  const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const getGenresMovieApi = (idGenres) => {
  const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const arrGenres = [];
      idGenres.forEach((id) => {
        result.genres.forEach((item) => {
          if (item.id === id) arrGenres.push(item.name);
        });
      });
      return arrGenres;
    });
};

export const getAllGenresApi = () => {
  const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const getGenreMoviesApi = (idGenre) => {
  const url = `${API_HOST}/discover/movie?api_key=${API_KEY}&with_genres=${idGenre}&language=${LANG}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const getMovieByIdApi = (idMovie) => {
  const url = `${API_HOST}/movie/${idMovie}?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const getVideoMovieApi = (idMovie) => {
  const url = `${API_HOST}/movie/${idMovie}/videos?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const getPopularMoviesApi = (page = 1) => {
  const url = `${API_HOST}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const searchMovieApi = (search) => {
  const url = `${API_HOST}/search/movie?api_key=${API_KEY}&language=${LANG}&query=${search}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};
