import teamOfList from './teamList.js';
import teamCardTpl from '../templates/team-card.hbs';

const teamList = document.querySelector('.team-list');

markupTeamCards(teamOfList);

function markupTeamCards(team) {
  teamList.insertAdjacentHTML('beforeend', teamCardTpl(team));
}
