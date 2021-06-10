import teamOfList from './teamList.js';
import teamCardTpl from '../templates/team-card.hbs';
import refs from './refs.js';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';

refs.teamBtn.addEventListener('click', onTeamBtnClick);
console.log(refs.lightboxContainer);

const modal = basicLightbox.create(document.querySelector('.lightbox'));
function onTeamBtnClick() {
  modal.show();
  refs.lightboxBtn.addEventListener('click', modal.close);
}

markupTeamCards(teamOfList);

function markupTeamCards(team) {
  refs.teamList.insertAdjacentHTML('beforeend', teamCardTpl(team));
}
