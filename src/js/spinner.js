import refs from "./refs/index";

function showSpinner() {
  refs.spinner.classList.remove('spinner-is-hidden');
}

function hideSpinner() {
  refs.spinner.classList.add('spinner-is-hidden');
}

export {
  showSpinner,
  hideSpinner,
};
window.addEventListener('load', () => {
  setTimeout(() => {
    refs.mask.remove();
  }, 600);
})