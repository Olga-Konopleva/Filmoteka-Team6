import refs from './refs';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

refs.toolbar.addEventListener('change', changeTheme);

function changeTheme() {
  if (refs.stateCheckbox.checked) {
    refs.body.classList.add(Theme.DARK);
    refs.body.classList.remove(Theme.LIGHT);
    refs.footer.classList.add(Theme.DARK);
    refs.footer.classList.remove(Theme.LIGHT);
    localStorage.setItem('Theme', Theme.DARK);
    return;
  }

  refs.body.classList.remove(Theme.DARK);
  refs.body.classList.add(Theme.LIGHT);
  refs.footer.classList.remove(Theme.DARK);
  refs.footer.classList.add(Theme.LIGHT);
  localStorage.setItem('Theme', Theme.LIGHT);
}

const currentTheme = localStorage.getItem('Theme');
if (currentTheme === Theme.DARK) {
  refs.body.classList.add(Theme.DARK);
  refs.footer.classList.add(Theme.DARK);
  refs.stateCheckbox.checked = true;
}
