import axios from 'axios';
import { error404Handler, error500Handler } from '../js/util/errors';
import {
  API_KEY,
  BASE_URL,
  PICTURE_REPLACER,
  IMAGE_BASE_URL,
} from './api-variables';
// import backdropSizes from '../js/data/backdrop-sizes';
import posterSizes from '../js/data/poster-sizes';
import getImageSize from '../js/image-sizes';

export default {
  searchQuery: '',

  // Функція повертає об'єкт url для основних запитів
  getUrl(page) {
    const urls = {};
    urls.searchUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query==${this.query}&page=${page}&include_adult=false`;
    urls.popylarFilmsUrl = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`;
    return urls;
  },

  async getUpdatedFilms(url) {
    try {
      // 404, 500 Error Handlers
      const request = await axios.get(url);

      if (request.status === 404) {
        error404Handler();
      }
      if (request.status === 500) {
        error500Handler();
      }

      // отримуємо масив результатів запитів для отримання повної інформації про фільми
      const filmsData = await this.getFullFilmsInfo(url);
      // проходимося по отриманому масиві і вибираємо всі об'єкти з повною інформацією про фільми
      const films = filmsData.map(({ data }) => data);
      // Для кожного об'єкта оновлюємо необхідну в ньому інформацію
      const updatedFilms = this.updateInfo(films);
      // console.log(updatedFilms);
      return updatedFilms;
    } catch (error) {
      console.log(error);
    }
  },

  // Функція повертає всю інформацію по id фільма, знайденого за query
  async getFullFilmsInfo(url) {
    try {
      // 404, 500 Error Handlers
      const request = await axios.get(url);

      if (request.status === 404) {
        error404Handler();
      }
      if (request.status === 500) {
        error500Handler();
      }
      // Вибираємо id всіх отриманих об'єктів масиву за певним запитом
      const idList = await this.getFilmiIdList(url);
      // для кожного об'єкта, за його id, робимо ще один запит для отримання повної інформації про фільм
      const promises = idList.map(id =>
        axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`),
      );
      // отримуємо масив промісів з об'єктами, в яких є повна інформація про фільм
      const films = await Promise.all(promises);
      return films;
    } catch (error) {}
  },

  // getUpdatedPopularFilms -  вывод популярных фильмов за неделю
  async getUpdatedPopularFilms() {
    try {
      const filmsData = await this.getFullPopularFilms();
      const films = filmsData.map(({ data }) => data);
      const updatedFilms = this.updateInfo(films);
      return updatedFilms;
    } catch (error) {
      console.log(error);
    }
  },

  //showFilmDetails(id) - показ детальной инфы о фильме при показе модалке, айдишник добавлен в ли каждого фильма data-id
  async showFilmDetails(id) {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
      );

      const results = await data;
      //добавила фунцкию для получения ключа для показа трейлера для вывода в шаблон
      const idTrailer = await this.getFilmTrailer(id);
      // const updateFilm = this.updateInfo(results);
      return { idTrailer, ...results };
    } catch (error) {
      console.log(error);
    }
  },

  // Функція отримує масив об'єктів з повною інформацією про фільми, оновлює необхідні дані для ставки в шаблон і повертає новий масив об'єктів з необхідними даними
  updateInfo(data) {
    // проходимося по масиву об'єктів, для кожного об'єкта робимо необхідні зміни і додаємо їх в новий масив
    const updatedInfo = data.reduce((filmsList, film) => {
      // перетворюємо release_date в формат '***' (рік)
      film.release_date = film.release_date.slice(0, -6);

      // film.popularity = Math.floor(Math.ceil(film.popularity * 10)) / 10;
      // перетворюємо масив об'єктів з жанрами з формате [{ id: name},..., { id: name} ] в формат [name, ..., name]
      film.genres = this.updateGenres(film.genres);
      // додаємо змінені об'єкти в  масив
      if (!film.poster_path) {
        film.poster_path = PICTURE_REPLACER;
      } else {
        film.poster_path = `${IMAGE_BASE_URL}${getImageSize(posterSizes)}/${
          film.poster_path
        }`;
      }
      filmsList.push(film);
      return filmsList;
    }, []);
    return updatedInfo;
  },

  // Функція оновлює дані для одного фільма
  updateOneFilmInfo(data) {
    const updateFilm = { ...data };
    // перетворюємо release_date в формат '***' (рік)
    updateFilm.release_date = updateFilm.release_date.slice(0, -6);
    // перетворюємо масив об'єктів з жанрами з формате [{ id: name},..., { id: name} ] в формат [name, ..., name]
    updateFilm.genres = updateFilm.genres.map(({ name }) => name);
    // Робимо заголовок великими
    updateFilm.original_title = updateFilm.original_title.toUpperCase();
    // Округлюємо популярність до десятих
    updateFilm.popularity =
      Math.floor(Math.ceil(updateFilm.popularity * 10)) / 10;
    // додаємо змінені об'єкти в  масив
    if (!updateFilm.poster_path) {
      updateFilm.poster_path = PICTURE_REPLACER;
    } else {
      updateFilm.poster_path = `${IMAGE_BASE_URL}${getImageSize(posterSizes)}/${
        updateFilm.poster_path
      }`;
    }
    return updateFilm;
  },

  // Функція повертає id всіх фільмів
  async getFilmiIdList(url) {
    try {
      // 404, 500 Error Handlers
      const request = await axios.get(url);
      if (request.status === 404) {
        error404Handler();
      }
      if (request.status === 500) {
        error500Handler();
      }

      const { data } = await axios.get(url);
      const { results } = await data;
      const filmIdList = results.map(({ id }) => id);
      return filmIdList;
    } catch (error) {
      console.log(error);
    }
  },

  //согласно макета если жанров 3 -высвечиваются все 3 жанра,если больше - 2 слова плюс Other
  updateGenres(genres) {
    const result = genres.reduce((genresList, genre, index) => {
      const { name } = genre;
      if (index === 3) {
        const tooManyGenres = 'Other';
        genresList[2] = tooManyGenres;
        return genresList;
      } else if (index > 3) {
        return genresList;
      }

      genresList.push(name);
      return genresList;
    }, []);

    return result;
  },

  get query() {
    return this.searchQuery;
  },
  set query(search) {
    this.searchQuery = search;
  },

  resetPage() {
    this.page = 1;
  },

  // запрос по айди фильма для получения ключей всех видео о фильме
  async getFilmTrailer(id) {
    const { data } = await axios.get(
      `/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
    );
    const { results } = data;
    //оставила самый популярный трейлер для показа
    const trailer = results[0];

    return trailer.key;
  },
};
