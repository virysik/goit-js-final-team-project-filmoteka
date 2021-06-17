import refs from './refs/index.js';

refs.libraryPage.addEventListener('click', onLibraryBtns);
refs.watchedBtn.addEventListener('click', onLibraryBtns);
refs.queueBtn.addEventListener('click', onQueueBtn);

function onLibraryBtns() {
  refs.queueBtn.classList.remove('current-btn');
  refs.watchedBtn.classList.add('current-btn');
}

function onQueueBtn() {
  refs.watchedBtn.classList.remove('current-btn');
  refs.queueBtn.classList.add('current-btn');
}
