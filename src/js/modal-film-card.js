import refs from './refs/';
import modalFilmCardTpl from '../templates/movie-card-template.hbs';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import { on } from 'events';

const modalCard = basicLightbox.create(document.querySelector('.lightbox-film-card'), {
  onShow: () => {
    document.body.classList.add('body-lightbox');
    window.addEventListener('keydown', onKeyEsc);
  },
  onClose: () => {
    document.body.classList.remove('body-lightbox');
    window.removeEventListener('keydown', onKeyEsc);
  },
});

refs.movieList.addEventListener('click', onMovieListClick);
onCloseBtn();

function onCloseBtn() {
  refs.iconCloseBtn.forEach(btn => {
    btn.addEventListener('click', modalCard.close);
  });
}
function onMovieListClick(e) {
  e.preventDefault();
  modalCard.show();
}

function onKeyEsc(e) {
  if (e.code === 'Escape') {
    modalCard.close();
  }
}
