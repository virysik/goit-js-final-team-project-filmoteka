import refs from '../refs/'
import { AUTH_API_KEY } from './api-key'
import { hiddenClass, BASE_AUTH_URL } from '../constants'

//======================================
refs.closeBtn.addEventListener('click', () => {
    refs.loginModal.classList.add(hiddenClass);
})
refs.loginBtn.addEventListener('click', () => {
    refs.loginModal.classList.remove(hiddenClass);
})

//===Переключение на форму реєстрації===
refs.createLink.addEventListener('click', () => {
    refs.regForm.style.display = 'block'
    refs.logForm.style.display = 'none'
})
//===Перключение на фому логіна===
refs.loginLink.addEventListener('click', () => {
    refs.regForm.style.display = 'none'
    lrefs.ogForm.style.display = 'block'
})

//================register==============
function registeringWithEmailAndPassword(email, password) {

    return fetch(`${BASE_AUTH_URL}:signUp?key=${AUTH_API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: 'true',
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
}

refs.regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formElements = e.currentTarget.elements;
    const password = formElements.regPassword.value;
    const email = formElements.regEmail.value;

    registeringWithEmailAndPassword(email, password)
})

//================login=================
function authWithMailAndPassword(email, password) {
    return fetch(`${BASE_AUTH_URL}:signInWithPassword?key=${AUTH_API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: 'true',
        }),
        headers: {
            'Content-Type': 'application/json'
        },

    })
        .then(respon => respon.json())
        //Токен юзера
        .then(data => console.log(data.idToken))
}

refs.logForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formElements = e.currentTarget.elements;
    const password = formElements.loginPassword.value;
    const email = formElements.loginEmail.value;

    // const email = e.target.querySelector('#log-email').value;
    // const password = e.target.querySelector('#log-password').value;

    console.log(email)
    console.log(password)

    authWithMailAndPassword(email, password);

})
//======================================


// const bazaD = 'https://goit-js-team-project-filmoteka-default-rtdb.europe-west1.firebasedatabase.app/';
