import teamOfList from './teamList.js';
import teamCardTpl from '../templates/team-card.hbs';
import refs from './refs.js';
import * as basicLightbox from 'basiclightbox';
// import '/basiclightbox/dist/basicLightbox.min.css';

refs.teamBtn.addEventListener('click', onTeamBtnClick);
refs.lightboxBtn.addEventListener('click', onLightboxBtn);

function onTeamBtnClick() {
  const modal = basicLightbox.create(document.querySelector('.lightbox'));
  modal.show();
}

function onLightboxBtn() {
  const modal = basicLightbox.create(document.querySelector('.lightbox'));
  modal.close();
}
markupTeamCards(teamOfList);

function markupTeamCards(team) {
  refs.teamList.insertAdjacentHTML('beforeend', teamCardTpl(team));
}

// console.log(basicLightbox);
