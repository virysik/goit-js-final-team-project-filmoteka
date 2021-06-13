import { theme } from './constants/'
import refs from './refs/'

const classOnBody = document.body.classList;
const LOCAL_STORAGE_THEME_KEY = 'theme'

setDefaultTheme();

function setDefaultTheme() {
  if (!localStorage.getItem(LOCAL_STORAGE_THEME_KEY)) {
    classOnBody.add(theme.LIGHT);
  } else if (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === theme.LIGHT) {
    classOnBody.add(theme.LIGHT);
  } else if (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === theme.DARK) {
    refs.checkBox.checked = true;
    classOnBody.add(theme.DARK);
  }
}

refs.checkBox.addEventListener('change', onSwitchTrackChange);

function onSwitchTrackChange(e) {
  if (refs.checkBox.checked) {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme.DARK);
    classOnBody.replace(theme.LIGHT, theme.DARK);
  } else if (!refs.checkBox.checked) {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme.LIGHT);
    classOnBody.replace(theme.DARK, theme.LIGHT);
  }
}
