import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

import FetchMovieData from './api-service-markup';
const oneMovie = new FetchMovieData();

window.addEventListener('click', e => {
  const idFilm = Number(e.target.dataset.id);
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const databaseUser = firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get();

      //=================WATCHED=================================
      // ==============ADD USER-DATABASE WATCHED======================
      async function pushToWatchedArrFirebase() {
        let newList = (await databaseUser).data().watched;
        let fetch = await oneMovie.fetchOneMovie(idFilm);

        if (newList.find(e => e.id === idFilm)) {
          newList = newList.filter(e => e.id !== idFilm);
          e.target.textContent = 'ADD TO WATCHED';
          return newList;
        } else {
          newList.push(fetch);
          e.target.textContent = 'REMOVE FROM WATCHED';
          return newList;
        }
      }

      //===============ADD TO ARR=============================
      async function addToWatchedUserDataBase() {
        const data = await pushToWatchedArrFirebase();
        console.log(data);
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set(
          {
            watched: data,
          },
          { merge: true },
        );
      }
      if (e.target.className === 'watched-btn') {
        addToWatchedUserDataBase();
      }

      //=====================Queue==============================
      // ==============ADD USER-DATABASE QUEUE======================
      async function pushToQueueArrFirebase() {
        let newList = (await databaseUser).data().queue;

        let fetch = await oneMovie.fetchOneMovie(idFilm);

        if (newList.find(e => e.id === idFilm)) {
          newList = newList.filter(e => e.id !== idFilm);
          e.target.textContent = 'ADD TO QUEUE';
          return newList;
        } else {
          newList.push(fetch);
          e.target.textContent = 'REMOVE FROM QUEUE';
          return newList;
        }
      }
      //==================ADD TO ARR========================
      async function addToQueueUserDataBase() {
        const data = await pushToQueueArrFirebase();
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set(
          {
            queue: data,
          },
          { merge: true },
        );
      }

      if (e.target.className === 'queue-btn') {
        addToQueueUserDataBase();
      }
    } else {
      console.log('error');
    }
  });
});

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    const fireBase = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get();

    const userDataBase = (await fireBase).data();
    console.log(userDataBase);
  }
});
