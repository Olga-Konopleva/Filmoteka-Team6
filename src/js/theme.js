import refs from './refs';
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

refs.toolbar.addEventListener('change', changeTheme);

function changeTheme() {
  if (refs.stateCheckbox.checked) {
    activeDarkTheme();
    return;
  }
  activeLightTheme();
}

const currentTheme = localStorage.getItem('Theme');
if (currentTheme === Theme.DARK) {
  refs.body.classList.add(Theme.DARK);
  refs.footer.classList.add(Theme.DARK);
  refs.modalThemeFilm.classList.add(Theme.DARK);
  refs.modalThemeFooter.classList.add(Theme.DARK);

  refs.stateCheckbox.checked = true;
}

function activeDarkTheme() {
  refs.body.classList.add(Theme.DARK);
  refs.body.classList.remove(Theme.LIGHT);
  refs.footer.classList.add(Theme.DARK);
  refs.footer.classList.remove(Theme.LIGHT);
  refs.modalThemeFilm.classList.add(Theme.DARK);
  refs.modalThemeFilm.classList.remove(Theme.LIGHT);
  refs.modalThemeFooter.classList.add(Theme.DARK);
  refs.modalThemeFooter.classList.remove(Theme.LIGHT);

  localStorage.setItem('Theme', Theme.DARK);
}

function activeLightTheme() {
  refs.body.classList.remove(Theme.DARK);
  refs.body.classList.add(Theme.LIGHT);
  refs.footer.classList.remove(Theme.DARK);
  refs.footer.classList.add(Theme.LIGHT);
  refs.modalThemeFilm.classList.remove(Theme.DARK);
  refs.modalThemeFilm.classList.add(Theme.LIGHT);
  refs.modalThemeFooter.classList.remove(Theme.DARK);
  refs.modalThemeFooter.classList.add(Theme.LIGHT);

  localStorage.setItem('Theme', Theme.LIGHT);
}
