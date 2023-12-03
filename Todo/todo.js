let userIcon = document.querySelector('.user-icon');
let todoContainer = document.querySelector('.todo-container');
let homeIcon = document.querySelector('.home-icon');
let userInfo = document.querySelector('.info');
userIcon.addEventListener('mouseenter',()=>{
    todoContainer.style.display = 'none'
    userInfo.style.display = 'block'
})
homeIcon.addEventListener('mouseenter',()=>{
    todoContainer.style.display = 'block'
    userInfo.style.display = 'none'
})



import { initializeApp, } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore,  collection, getDoc,doc,updateDoc} from  "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
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
  const auth = getAuth();

  let usersRef;

  //get user info
let userName = document.querySelector('.user-name')
let userNameField = document.querySelector('.user-name-field')
let userEmailField = document.querySelector('.user-email-field')
let userPasswordField = document.querySelector('.user-password-field')
userIcon.addEventListener('mouseenter',async()=>{
  onAuthStateChanged(auth, async (user) => {
    usersRef = doc(db, "users", user.uid);
        // get the details of the user
        const userSnap = await getDoc(usersRef)
        userName.innerHTML = userSnap.data().signupname
        console.log(userSnap.data());
        userNameField.value =  userSnap.data().signupname
        userEmailField.value = userSnap.data().signupemail
        userPasswordField.value = userSnap.data().signuppassword
  });

})

//eye 
let eyeIcon = document.querySelector('.eye-icon');
eyeIcon.addEventListener('click', ()=>{
  if(userPasswordField.type == 'password'){
    userPasswordField.type = 'text'
    eyeIcon.src = './../IMG/Show.png'
  }else{
    userPasswordField.type = 'password'
    eyeIcon.src = './../IMG/Hide.png'
  }
})

//update user info
let updateBtn = document.querySelector('.update');
let updateName = document.querySelector('.user-name-field');
let updatePassword = document.querySelector('.user-password-field')
let updateIcon = document.querySelector('.update-icon')
updateBtn.addEventListener('click',async()=>{
  console.log(updateName.value);
  updateBtn.innerHTML = `<div class='loader'></div>`
  await updateDoc(usersRef, {
    signupname: updateName.value,
    signuppassword : updatePassword.value
});
updateIcon.innerHTML = `Update Successfully <ion-icon name="checkmark-sharp"></ion-icon>`
setTimeout(()=>{
  updateIcon.innerHTML =''
},3000)
updateBtn.innerHTML = 'Update'
updateBtn.disabled = true;
updateBtn.style.backgroundColor = 'rgb(123, 115, 115)'
userName.innerHTML = updateName.value

  });

  updateName.addEventListener('click', ()=>{
    updateBtn.disabled = false;
    updateBtn.style.backgroundColor = 'black'
  })

  // updatePassword.addEventListener('click', ()=>{
  //   updateBtn.disabled = false;
  //   updateBtn.style.backgroundColor = 'black'
  // })



  //logout user
  let logoutUser = document.querySelector('.logout-user');
  logoutUser.addEventListener('click',()=>{
    signOut(auth).then(() => {
      logoutUser.innerHTML = `<div class='logout-loader'></div>`
      setTimeout(()=>{
        location.href = './../signin/index.html'
      },3000)
    }).catch((error) => {
      logoutUser.innerHTML = `<ion-icon name="log-out-outline"></ion-icon>Log out`
      console.log(error);
    });    
  })




  let todoInput = document.querySelector('.todoInput');
  let addBtn = document.querySelector('.add-btn');
  let todoBody = document.querySelector('.body');
  todoInput.addEventListener('click', ()=>{
    addBtn.classList.remove('add-btn')

  })


  
