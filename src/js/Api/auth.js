import firebase from 'firebase/app';
import refs from '../refs';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBtnalvJhfnAWRZlTM1VDPywHEPPs20Yhs',
  authDomain: 'goit-js-team-project-filmoteka.firebaseapp.com',
  databaseURL:
    'https://goit-js-team-project-filmoteka-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'goit-js-team-project-filmoteka',
  storageBucket: 'goit-js-team-project-filmoteka.appspot.com',
  messagingSenderId: '39626584611',
  appId: '1:39626584611:web:ad3feb4c5126ba39fdf796',
  measurementId: 'G-FCHRQM7EC5',
};
firebase.initializeApp(firebaseConfig);

export default class Auth {
  constructor() {
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  openModal() {
    refs.loginModal.classList.remove('is-hidden');
    refs.logForm.style.display = 'block';
    refs.regForm.style.display = 'none';
  }

  closedModal() {
    refs.loginModal.classList.add('is-hidden');
  }

  modalSwitch() {
    if ((refs.regForm.style.display = 'block')) {
      refs.logForm.style.display = 'none';
    }
  }

  registeringWithEmailAndPassword(e) {
    e.preventDefault();
    const email = refs.regForm.querySelector('#reg-email').value;
    const password = refs.regForm.querySelector('#reg-password').value;

    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        return firebase.firestore().collection('users').doc(cred.user.uid).set({
          watched: [],
          queue: [],
        });
      })
      .then(() => {
        this.closedModal();
      });
  }

  authWithMailAndPassword(e) {
    e.preventDefault();
    const email = refs.logForm.querySelector('#log-email').value;
    const password = refs.logForm.querySelector('#log-password').value;
    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.closedModal();
    });
  }
  logout(e) {
    e.preventDefault();
    this.auth.signOut();
  }

  setupLoginBtn(user) {
    if (user) {
      refs.loginBtn.style.display = 'none';
      refs.logoutBtn.style.display = 'block';
    } else {
      refs.loginBtn.style.display = 'block';
      refs.logoutBtn.style.display = 'none';
    }
  }

  init() {
    refs.logoutBtn.addEventListener('click', this.logout.bind(this));
    refs.loginLink.addEventListener('click', this.modalSwitch.bind(this));
    refs.createLink.addEventListener('click', this.modalSwitch.bind(this));
    refs.closeBtn.addEventListener('click', this.closedModal.bind(this));
    refs.loginBtn.addEventListener('click', this.openModal.bind(this));
    refs.regForm.addEventListener('submit', this.registeringWithEmailAndPassword.bind(this));
    refs.logForm.addEventListener('submit', this.authWithMailAndPassword.bind(this));
  }
}
