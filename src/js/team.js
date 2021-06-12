import teamOfList from './teamList.js';
import teamCardTpl from '../templates/team-card.hbs';
import refs from './refs.js';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';

const modal = basicLightbox.create(document.querySelector('.lightbox'), {
  onShow: () => {
    document.body.classList.add('body-lightbox');
    window.addEventListener('keydown', onKeyPressEsc);
  },
  onClose: () => {
    document.body.classList.remove('body-lightbox');
    window.removeEventListener('keydown', onKeyPressEsc);
  },
});

refs.teamBtn.addEventListener('click', modal.show);
markupTeamCards(teamOfList);
refs.lightboxBtn.addEventListener('click', modal.close);

function markupTeamCards(team) {
  refs.teamList.insertAdjacentHTML('beforeend', teamCardTpl(team));
}

function onKeyPressEsc(e) {
  if (e.code === 'Escape') {
    modal.close();
  }
}
