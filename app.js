let password = document.querySelector('.signupPassword');
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
 import { getAuth,createUserWithEmailAndPassword, onAuthStateChanged,GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
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
 let signupName = document.querySelector('.signupName')
 let signupEmail = document.querySelector('.signupEmail');
 let signupPassword  = document.querySelector('.signupPassword');
 let signupBtn = document.querySelector('.signup-btn');
 let signupContainer = document.querySelector('.signup-container');

 form.addEventListener('submit', (e)=>{
    e.preventDefault();
    signupBtn.style.backgroundColor = 'rgb(153, 149, 149)' 
    signupBtn.innerHTML = `<div class='loader'></div>`

    let userData ={
      signupname : signupName.value,
      signupemail : signupEmail.value,
      signuppassword : signupPassword.value
    }

    createUserWithEmailAndPassword(auth, userData.signupemail, userData.signuppassword)
  .then(async (userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // console.log(user);
    
         await setDoc(doc(db, "users", user.uid), {
        ...userData,
        userid : user.uid
      });
      location.href = './signin/index.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    signupBtn.style.backgroundColor = 'black' 
    signupBtn.innerHTML = 'Sign Up'
    signupContainer.style.display = 'none'
    // Swal.fire("This account is already registered!");
    let timerInterval;
Swal.fire({
  title: "This account is already registered!",
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
  signupContainer.style.display = 'block'
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
    location.href = './Todo/index.html'


  }).catch((error) => {
    console.log(error);
    google.innerHTML = `Continue With Google`

  });
 })


 






