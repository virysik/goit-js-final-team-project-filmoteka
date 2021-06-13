const checkBox = document.querySelector('#theme-switch-toggle');
const themeLocalStorage = localStorage.getItem('theme')
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const classOnBody = document.body.classList;
setDefaultTheme();
function setDefaultTheme() {
  if (!themeLocalStorage) {
    classOnBody.add(Theme.LIGHT);
  } else if (themeLocalStorage === 'light') {
    classOnBody.add(Theme.LIGHT);
  } else if (themeLocalStorage === 'dark') {
    checkBox.checked = true;
    classOnBody.add(Theme.DARK);
  }
}

checkBox.addEventListener('change', onSwitchTrackChange);
function onSwitchTrackChange(e) {
  if (checkBox.checked) {
    localStorage.setItem('theme', 'dark');
    classOnBody.replace(Theme.LIGHT, Theme.DARK);
  } else if (!checkBox.checked) {
    localStorage.setItem('theme', 'light');
    classOnBody.replace(Theme.DARK, Theme.LIGHT);
  }
}
