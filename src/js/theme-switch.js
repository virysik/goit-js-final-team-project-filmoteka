const checkBox = document.querySelector('#theme-switch-toggle');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const classOnBody = document.body.classList;
setDefaultTheme();
function setDefaultTheme() {
  if (!localStorage.getItem('theme')) {
    classOnBody.add(Theme.LIGHT);
  } else if (localStorage.getItem('theme') === 'light') {
    classOnBody.add(Theme.LIGHT);
  } else if (localStorage.getItem('theme') === 'dark') {
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
