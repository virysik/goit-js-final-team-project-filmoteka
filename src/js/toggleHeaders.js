const headerEl = document.getElementById('page-header');
const navMenuEl = headerEl.querySelector(`.nav`);

const REFS = {
  HEADER: document.getElementById('page-header'),
  NAV_MENU: document.getElementById('page-nav'),
  NAV_LINKS: document.querySelectorAll('.link-nav')
}

REFS.HEADER.addEventListener('click', e => {
  const target = e.target;
  const targetParent = target.closest('.logo');

  if (target.dataset.link === '' || targetParent) {
    e.preventDefault();

    const link = targetParent || target;
    const path = link.href.split('#')[1];

    REFS.NAV_LINKS.forEach(link => link.classList.remove('current'));

    REFS.NAV_MENU.querySelector(`[href='#${path}']`).classList.add(`current`);

    if (path === 'home') {
      e.currentTarget.classList.remove(`header-library`);
      e.currentTarget.classList.add(`header-${path}`);
    } else if (path === 'library') {
      e.currentTarget.classList.remove(`header-home`);
      e.currentTarget.classList.add(`header-${path}`);
    }

  }


})