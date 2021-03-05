import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const apiKey = '44fd846a8fbd886b31f763260ef2b77b';

export default {
  page: 1,
  //searchQuery оставила для проверки,будет динамически подставляться из инпута
  searchQuery: 'titanic',

  //getUpdatedFilmsByQuery -  для поиску по значения инпута, которое записывается в query
  async getUpdatedFilmsByQuery() {
    try {
      const filmsData = await this.getFullFilmsInfoByQuery();
      const films = filmsData.map(({ data }) => data);
      const updatedFilms = this.updateInfo(films);
      return updatedFilms;
    } catch (error) {
      console.log(error);
    }
  },

  async getFullFilmsInfoByQuery() {
    try {
      const searchUrl = `/search/movie?api_key=44fd846a8fbd886b31f763260ef2b77b&language=en-US&query==${this.query}&page=${this.page}&include_adult=false`;
      const idList = await this.getFilmiIdList(searchUrl);
      const promises = idList.map(id =>
        axios.get(`movie/${id}?api_key=${apiKey}&language=en-US`),
      );
      const film = await Promise.all(promises);

      // Не знаю чи тут збільшується сторінка, вже голова не варить😃
      //вроде увеличивается, но в нетворке приходит одна и та же страница,надо с пагинацией уже делать этот момент,непонятно пока
      this.page += 1;

      return film;
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

  async getFullPopularFilms() {
    try {
      const searchUrl = `/trending/movie/day?api_key=${apiKey}&page=${this.page}`;
      const idList = await this.getFilmiIdList(searchUrl);
      const promises = idList.map(id =>
        axios.get(`movie/${id}?api_key=${apiKey}&language=en-US`),
      );
      const film = await Promise.all(promises);
      // Не знаю чи тут збільшується сторінка, вже голова не варить😃
      //вроде увеличивается, но в нетворке приходит одна и та же страница,надо с пагинацией уже делать этот момент,непонятно пока
      this.page += 1;
      return film;
    } catch (error) {}
  },

  //showFilmDetails(id) - показ детальной инфы о фильме при показе модалке, айдишник добавлен в ли каждого фильма data-id
  async showFilmDetails(id) {
    try {
      const { data } = await axios.get(
        `/movie/${id}?api_key=${apiKey}&language=en-US`,
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  //получаем айдишники всех фильмов
  async getFilmiIdList(url) {
    try {
      const { data } = await axios.get(url);
      const { results } = await data;
      const filmIdList = results.map(({ id }) => id);
      return filmIdList;
    } catch (error) {
      console.log(error);
    }
  },

  //сокращаем дату до нужного формата макета(без месяца и числа) и получаем жанры как массив строк
  //сделала замену perPage : если длина масива больше 8(9 фильмов за запрос) фильм не пушиться в массив
  updateInfo(data) {
    const updatedInfo = data.reduce((filmsList, film, index) => {
      if (index > 8) {
        return filmsList;
      }
      film.release_date = film.release_date.slice(0, -6);
      film.genres = this.getGenre(film.genres);
      filmsList.push(film);

      return filmsList;
    }, []);
    return updatedInfo;
  },

  //согласно макета если жанров 3 -высвечиваются все 3 жанра,если больше - 2 слова плюс Other
  getGenre(genres) {
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
};
