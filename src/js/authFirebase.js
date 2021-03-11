import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import refs from './refs';
import { successLoginHandler, successLogoutHandler } from './util/success';

const firebaseConfig = {
  apiKey: 'AIzaSyDQrwCAXRj5z9sNE9veCql6qr3bmszhNFY',
  authDomain: 'filmoteka-project.firebaseapp.com',
  databaseURL: 'https://filmoteka-project-default-rtdb.firebaseio.com',
  projectId: 'filmoteka-project',
  storageBucket: 'filmoteka-project.appspot.com',
  messagingSenderId: '1026378840836',
  appId: '1:1026378840836:web:8e08307292eb95ad9f2e51',
  measurementId: 'G-JWBVEWQR7T',
};

firebase.initializeApp(firebaseConfig);
initApp();

refs.signInBtn.addEventListener('click', googleSignIn);
refs.signOutBtn.addEventListener('click', googleSignOut);

function initApp() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // SIGN IN
      refs.signOutBtn.classList.remove('hide');
      refs.signInBtn.classList.add('hide');
      const displayName = user.displayName;
      const photoURL = user.photoURL;
      const email = user.email;
      const uid = user.uid;
      refs.userInfo.innerHTML = `<img class="user-img" src="${photoURL}"> 
            <div class="user-block">
              <p class="user-name">${displayName}</p>
              <p class="user-email">${email}</p>
            </div>`;
      console.log(`Current user: ${displayName}`, `userId: ${uid}`);
      readUserData(uid);
    } else {
      // SIGN OUT
      refs.signInBtn.classList.remove('hide');
      refs.signOutBtn.classList.add('hide');
      refs.userInfo.innerHTML = '';
    }
  });
}

function googleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {

      const credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const userId = user.uid;
      const name = user.displayName;
      const email = user.email;
      const imageUrl = user.photoURL;

      console.log(user);
      console.log('Success!');

      // Перевірка чи є вже юзер в БД, якшо неа то добавляє
      checkUserID().then(data => {
        if (data.exists()) {
          console.log('User exist in database');
          // Завантажує данні з БД
          readUserData(userId);
        } else {
          console.log('User NOT exist in database');
          writeUserData(userId, name, email, imageUrl);
        }
      });

      //! Sign in notification
      setTimeout(successLoginHandler, 1000);
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.log(errorMessage);
      console.log('Failed!');
    });
}

function googleSignOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Sign-out successful.');
      //   window.location.href = 'index.html';
      refs.userInfo.innerHTML = '';
    })
    .catch(error => {
      console.log('ERRROR!');
    });



  // !Sign out notification
  setTimeout(successLogoutHandler, 500);
}

// ОТРИМУЄ ДАННІ ЮЗЕРА ПО АЙДІ З БД
function checkUserID() {
  const userId = firebase.auth().currentUser.uid;
  return firebase
    .database()
    .ref('/users/' + userId)
    .once('value');
}

// ЗАПИСУЄ ОСНОВНУ ІНФУ ПО ЮЗЕР В БД, ТІЛЬКИ ПРИ РЕЄСТРАЦІЇ ПЕРШОМУ ВХОДІ

function writeUserData(userId, name, email, imageUrl) {
  firebase
    .database()
    .ref('users/' + userId)
    .set(
      {
        username: name,
        email: email,
        profile_picture: imageUrl,
      },
      error => {
        if (error) {
          console.log('FAILED!!!');
        } else {
          console.log('SUCCESS');
        }
      },
    );
}

function readUserData(userId) {
  return firebase
    .database()
    .ref('/users/' + userId)
    .once('value');
}

export { initApp, readUserData, checkUserID };
