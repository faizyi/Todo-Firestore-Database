let password = document.querySelector('.signinPassword');
let eyeIcon = document.querySelector('.eye-icon');
eyeIcon.addEventListener('click',()=>{
  if(password.type == 'password'){
    password.type = 'text'
    eyeIcon.src = './../IMG/Show.png'
  }else{
    password.type = 'password'
    eyeIcon.src = './../IMG/Hide.png'
  }
})

password.addEventListener('click', ()=>{
  eyeIcon.classList.remove('eye-icon')
})








import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore,  doc, setDoc} from  "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDcG6e2B3NI3gxSShnsHK_4wjhSfW7xfQ4",
  authDomain: "todo-app-333cf.firebaseapp.com",
  projectId: "todo-app-333cf",
  storageBucket: "todo-app-333cf.appspot.com",
  messagingSenderId: "186609232552",
  appId: "1:186609232552:web:7d598ac87d25b78191b09d",
  measurementId: "G-7XDPDEPSRS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


let form = document.querySelector('.form');
let signinEmail = document.querySelector('.signinEmail');
let signinPassword  = document.querySelector('.signinPassword');
let signinBtn = document.querySelector('.signin-btn');
let signinContainer = document.querySelector('.signin-container');



form.addEventListener('submit', (e)=>{
    e.preventDefault();

    signinBtn.style.backgroundColor = 'rgb(153, 149, 149)' 
    signinBtn.innerHTML = `<div class='loader'></div>`

    signInWithEmailAndPassword(auth, signinEmail.value, signinPassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // console.log(user.email);
    localStorage.setItem('userUid', user.uid);
    location.href = './../Todo/index.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);

    signinBtn.style.backgroundColor = 'black' 
    signinBtn.innerHTML = 'Log In'
    signinContainer.style.display = 'none'

    let timerInterval;
    Swal.fire({
      title: "Invalid Email/Password!",
      // html: "I will close in <b></b> milliseconds.",
      // timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        // Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      signinContainer.style.display = 'block'
      /* Read more about handling dismissals below */
      // if (result.dismiss === Swal.DismissReason.timer) {
      //   console.log("I was closed by the timer");
      // }
    });
  });


})



//continue with google;
let google = document.querySelector('.google');
google.addEventListener('click', ()=>{
 signInWithPopup(auth, provider)
 .then(async(result) => {
   let googleUserEmail = result.user.email;
   let googleUserUid = result.user.uid;
   google.innerHTML = `<div class='googleloader'></div>`
   localStorage.setItem('userUid', googleUserUid)
   await setDoc(doc(db, "users", googleUserUid), {
     signupemail : googleUserEmail,  
     userid : googleUserUid
   });
   location.href = './../Todo/index.html'


 }).catch((error) => {
   console.log(error);
   google.innerHTML = `Continue With Google`

 });
})

