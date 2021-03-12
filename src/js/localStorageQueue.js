import refs from './refs';

const getListFilmsQueue = () => {
  const currentList = localStorage.getItem('queue');

  const queue = JSON.parse(currentList);
  if (!queue) {
    return;
  }
  const listQueue = queue.map(item => {
    return item['filmQueue'];
  });
  return listQueue;
};

const chekDuplicates = id => {
  const listfilms = getListFilmsQueue();
  if (listfilms.indexOf(String(id)) === -1) {
    return true;
  } else {
    return false;
  }
};

const updateList = (currentList, id) => {
  const queue = JSON.parse(currentList);
  const filmToAdd = { filmQueue: id };
  queue.push(filmToAdd);
  localStorage.setItem('queue', JSON.stringify(queue));
};
const addFilmHandlerQueue = id => {
  const currentList = localStorage.getItem('queue');
  if (!currentList) {
    const queue = [{ filmQueue: id }];
    localStorage.setItem('queue', JSON.stringify(queue));
  } else {
    if (chekDuplicates(id)) {
      updateList(currentList, id);
    }
  }
};

const deleteFilmHandlerQueue = id => {
  const filmList = getListFilmsQueue();
  const indexToDelete = filmList.indexOf(id);
  const currentList = localStorage.getItem('queue');
  const queue = JSON.parse(currentList);
  queue.splice(indexToDelete, 1);
  localStorage.setItem('queue', JSON.stringify(queue));
};
export { addFilmHandlerQueue, deleteFilmHandlerQueue, getListFilmsQueue };
