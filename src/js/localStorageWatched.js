import notification from './notification';
import refs from './refs';

const getListFilmsWatched = () => {
  const currentList = localStorage.getItem('watch');
  const watch = JSON.parse(currentList);
  if(!watch){
    return;
  }
  const listWatch = watch.map(item => {
    return item['filmWatched'];
  });
  return listWatch;
};

const chekDuplicates = id => {
  const listfilms = getListFilmsWatched();
  if (listfilms.indexOf(String(id)) === -1) {
    return true;
  } else {
    return false;
  }
};

const updateList = (currentList, id) => {
  const watch = JSON.parse(currentList);
  const filmToAdd = { filmWatched: id };
  watch.push(filmToAdd);
  localStorage.setItem('watch', JSON.stringify(watch));
  notification.infoLiberyMessage();
};
const addFilmHandlerWatched = id => {
  const currentList = localStorage.getItem('watch');
  if (!currentList) {
    const watch = [{ filmWatched: id }];
    localStorage.setItem('watch', JSON.stringify(watch));
  } else {
    if (chekDuplicates(id)) {
      updateList(currentList, id);
    } else {
      notification.duplicateMessage();
    }
  }
};

const deleteFilmHandlerWatched = id => {
  const filmList = getListFilmsWatched();
  const indexToDelete = filmList.indexOf(id);
  const currentList = localStorage.getItem('watch');
  const watch = JSON.parse(currentList);
  watch.splice(indexToDelete, 1);
  localStorage.setItem('watch', JSON.stringify(watch));
  notification.removeLiberyMessage();
};
export { addFilmHandlerWatched, deleteFilmHandlerWatched, getListFilmsWatched };
