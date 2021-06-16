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

//======================================
refs.closeBtn.addEventListener('click', () => {
  refs.loginModal.classList.add('is-hidden');
});
refs.loginBtn.addEventListener('click', () => {
  refs.loginModal.classList.remove('is-hidden');
});

//===Переключение на форму реєстрації===
refs.createLink.addEventListener('click', () => {
  refs.regForm.style.display = 'block';
  refs.logForm.style.display = 'none';
});
//===Перключение на фому логіна===
refs.loginLink.addEventListener('click', () => {
  refs.regForm.style.display = 'none';
  refs.logForm.style.display = 'block';
});

//================register==============
function registeringWithEmailAndPassword(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return firebase.firestore().collection('users').doc(cred.user.uid).set({
        watched: [],
        queue: [],
      });
    });
}

refs.regForm.addEventListener('submit', e => {
  e.preventDefault();
  const formElements = e.currentTarget.elements;
  const password = formElements.regPassword.value;
  const email = formElements.regEmail.value;

  registeringWithEmailAndPassword(email, password);
});

//================login=================
function authWithMailAndPassword(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password);
  // Написати рендер
  //...
}

refs.logForm.addEventListener('submit', e => {
  e.preventDefault();

  const email = e.target.querySelector('#log-email').value;
  const password = e.target.querySelector('#log-password').value;

  console.log(email);
  console.log(password);

  authWithMailAndPassword(email, password);
});
