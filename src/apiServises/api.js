import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const apiService = {
  apiKey: 'e3cac6b09ca16e2df27fc1a61005a6af',
  page: 1,
  searchQuery: 'titanic',
  showPopularFilms: async () => {
    try {
      const { data } = await axios.get(
        `/trending/movie/day?api_key=${apiService.apiKey}&page=${apiService.page}`,
      );
      const { results } = data;

      apiService.getYear(results);

      return results;
    } catch (error) {
      console.log(error);
    }
  },
  findFilm: async () => {
    try {
      const { data } = await axios.get(
        `/search/movie?api_key=${apiService.apiKey}&language=en-US&query=${apiService.searchQuery}&page=${apiService.page}&include_adult=false&`,
      );
      const { results } = data;
      apiService.getYear(results);

      return results;
    } catch (error) {
      console.log(error);
    }
  },
  showFilmDetails: async id => {
    try {
      const { data } = await axios.get(
        `/movie/${id}?api_key=${apiService.apiKey}&language=en-US`,
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getGenre: async id => {
    try {
      const { data } = await axios.get(
        `/genre/movie/list?api_key=${apiService.apiKey}&language=en-US`,
      );
      const { genres } = data;
      const name = genres.reduce((acc, genre) => {
        if (genre.id === id) {
          acc += genre.name;
        }
        return acc;
      }, '');

      return name;
    } catch (error) {
      console.log(error);
    }
  },
  getYear(data) {
    data.map(film => {
      const year = film.release_date.slice(0, -6);
      film.release_date = year;
    });
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
  incrementPage() {
    this.page += 1;
  },

  getGenres: async films => {},
};

export default apiService;

//////////////////
// console.log(apiService.showPopularFilms());

// const getGenre = async id => {
//   const { data } = await axios.get(
//     `/genre/movie/list?api_key=${apiKey}&language=en-US`,
//   );
//   const { genres } = data;
//   const name = genres.reduce((acc, genre) => {
//     if (genre.id === id) {
//       acc += genre.name;
//     }
//     return acc;
//   }, '');

//   return name;
// };

// const getGenres = async films => {
//   console.log(films);
// };

// // getGenre(53).then(result => console.log(result));

// const showPopularFilms = async () => {
//   const { data } = await axios.get(`/trending/movie/day?api_key=${apiKey}`);
//   const { results } = data;

//   return results;
// };

// // showPopularFilms();

// const findFilm = async query => {
//   query = 'titanic';
//   const { data } = await axios.get(
//     `/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`,
//   );
//   const { results } = data;

//   return results;
// };

// findFilm();

// const showFilmDetails = async id => {
//   const { data } = await axios.get(
//     `/movie/${id}?api_key=${apiKey}&language=en-US`,
//   );
//   console.log(data);

//   return data;
// };

// showFilmDetails(587807);

//page - which page

//   const name = ids.map(id =>
//     getGenre(id).then(name => {
//       return name;
//     }),
//   );
//   console.log(name);
//   const names = ids.map(async id => {
//     console.log(id);
//     const name = await getGenre(id);
//     return name;
//   });
//   const result = await names;
//   console.log(result);
//   const name = await getGenre(53);
//   console.log(name);

//   results.map(film => {
//     const id = film.genre_ids;
//     console.log(id);
//   });

// results.reduce((acc, film) => {
//     const ids = film.genre_ids;
//     const genre_ids = ids.reduce((acc, id) => {
//         getGenre(id).then(name => {
//             console.log(name);
//             console.log(id);
//             return acc;
//         });
//     }, []);

//     //   console.log(genre_ids);

// }

//  getGenre(id).then(name => {
//    console.log(name);
//    console.log(id);
//  });

//  const names = await ids.reduce((acc, id) => {
//     const allNames = id.reduce((acc, item) => {
//       const name = getGenre(item).then(result => {
//         return result;
//       });
//       acc.push(name);
//       return acc;
//     }, []);
//     acc.push(allNames);
//     return acc;
//   }, []);
