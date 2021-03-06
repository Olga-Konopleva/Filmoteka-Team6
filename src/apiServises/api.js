import axios from 'axios';

const apiKey = '44fd846a8fbd886b31f763260ef2b77b';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
export default {
  searchQuery: '',
  page: 1,

  async getUpdatedFilms() {
    try {
      // отримуємо масив результатів запитів для отримання повної інформації про фільми
      const filmsData = await this.getFullFilmsInfoByQuery();
      // проходимося по отриманому масиві і вибираємо всі об'єкти з повною інформацією про фільми
      const films = filmsData.map(({ data }) => data);
      // Для кожного об'єкта оновлюємо необхідну в ньому інформацію
      const updatedFilms = this.updateInfo(films);
      return updatedFilms;
    } catch (error) {
      console.log(error);
    }
  },
  // Функція повертає всю інформацію по id фільма, знайденого за query
  async getFullFilmsInfoByQuery() {
    try {
      // створюємо запит для пошуку, який повертає масив об'єктів знайдених фільмів
      const searchUrl = `/search/movie?api_key=44fd846a8fbd886b31f763260ef2b77b&language=en-US&query==${this.query}&page=${this.page}&include_adult=false`;
      // Вибираємо id всіх отриманих об'єктів масиву
      const idList = await this.getFilmiIdList(searchUrl);
      // для кожного об'єкта, за його id, робимо ще один запит для отримання повної інформації про фільм
      const promises = idList.map(id =>
        axios.get(`movie/${id}?api_key=${apiKey}&language=en-US`),
      );
      // отримуємо масив промісів з об'єктами, в яких є повна інформація про фільм
      const films = await Promise.all(promises);
      // Не знаю чи тут збільшується сторінка, вже голова не варить😃
      this.page += 1;
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

   // Функція повертає id всіх фільмів
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

  // Функція отримує масив об'єктів з повною інформацією про фільми, оновлює необхідні дані для ставки в шаблон і повертає новий масив об'єктів з необхідними даними
  updateInfo(data) {
    // проходимося по масиву об'єктів, для кожного об'єкта робимо необхідні зміни і додаємо їх в новий масив
    const updatedInfo = data.reduce((filmsList, film) => {
     if (index > 8) {
          return filmsList;
        }
      // перетворюємо release_date в формат '***' (рік)
      film.release_date = film.release_date.slice(0, -6);
      // перетворюємо масив об'єктів з жанрами з формате [{ id: name},..., { id: name} ] в формат [name, ..., name]
      film.genres = film.genres.map(({ name }) => name);
      // додаємо змінені об'єкти в  масив
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
