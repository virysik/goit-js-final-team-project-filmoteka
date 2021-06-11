const loginModal = document.querySelector('.login-page')
const closeBtn = document.querySelector('.close-icon-container')

const loginBtn = document.querySelector('#login')

const regForm = document.querySelector('.register-form')
const logForm = document.querySelector('.login-form')

const createLink = document.querySelector('.create-message a');
const loginLink = document.querySelector('.login-message a')

//======================================
closeBtn.addEventListener('click', () => {
    loginModal.classList.add('is-hidden');
})
loginBtn.addEventListener('click',()=> {
    loginModal.classList.remove('is-hidden');
})

//===Переключение на форму реєстрації===
createLink.addEventListener('click', () => {
    regForm.style.display = 'block'
    logForm.style.display = 'none'
})
//===Перключение на фому логіна===
loginLink.addEventListener('click', () => {
    regForm.style.display = 'none'
    logForm.style.display = 'block'
})

//================register==============
function registeringWithEmailAndPassword(email, password) {
    const API_KEY = 'AIzaSyBtnalvJhfnAWRZlTM1VDPywHEPPs20Yhs';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: 'true',
        })
    })
        .then(response => response.json())
        .then(data=>console.log(data))
}

regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;
   
    registeringWithEmailAndPassword(email, password)
})

//================login=================
function authWithMailAndPassword(email, password) {
    const API_KEY = 'AIzaSyBtnalvJhfnAWRZlTM1VDPywHEPPs20Yhs';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            email,password,
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

logForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;

    console.log(email)
    console.log(password)

    authWithMailAndPassword(email, password);
    
})
//======================================


// const bazaD = 'https://goit-js-team-project-filmoteka-default-rtdb.europe-west1.firebasedatabase.app/';

