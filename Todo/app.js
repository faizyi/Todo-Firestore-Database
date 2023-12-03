import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
 import { getFirestore, collection, addDoc, doc, deleteDoc, onSnapshot, updateDoc } from  "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
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
 const auth = getAuth();
 const db = getFirestore(app);



 let form = document.querySelector('.form');
 let todoInput = document.querySelector('.todoInput');
 let clearAll = document.querySelector('.clearAll');
 let logOut = document.querySelector('.logOut');
 let ul = document.querySelector('.todo-box');
 let userUid = localStorage.getItem('userUid')
 let ids = [];


 form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    if(todoInput.value == ''){
      return
    }
    //Add Data
    try {
        const docRef = await addDoc(collection(db, userUid), {
            todo: todoInput.value,
            time: new Date().toLocaleString()
          
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      todoInput.value = '';

 })


 let getTodos = function(){
    onSnapshot(collection(db, userUid), (data) => {
      data.docChanges().forEach((newdata)=>{
        console.log(newdata);
        ids.push(newdata.doc.id)
        if(newdata.type == 'removed'){
          let delLi = document.getElementById(newdata.doc.id)
          delLi.remove()

        }else if(newdata.type == 'added'){
          
          ul.innerHTML += `<li
                         id='${newdata.doc.id}' class="task">
                         <p>${newdata.doc.data().todo}</p>
                         <div id="todo-setting" class="todo-setting">
                         <abbr title="Edit">
                         <button><i onclick="editTodo(this,'${newdata.doc.id}')"  id="todo-icon" class='bx bxs-edit-alt'></i></button></abbr>
                         <abbr title="Delete">
                         <button><ion-icon onclick="delTodo('${newdata.doc.id}')"  id="todo-icon" name="trash-outline"></ion-icon></button>
                         </div></abbr>
                         </li>`
        }

        })
        
      });
 }

 getTodos();

 //del Todo
 async function delTodo(id){
  await deleteDoc(doc(db, userUid, id));

 }


//  //edit Todo
 async function editTodo(e,id){
  let editValue = prompt('Enter Edit value', e.parentNode.parentNode.parentNode.parentNode.childNodes[1].firstChild.nodeValue);
  e.parentNode.parentNode.parentNode.parentNode.childNodes[1].firstChild.nodeValue = editValue;
 

  const washingtonRef = doc(db, userUid, id);
  await updateDoc(washingtonRef, {
  todo : editValue
});
  
}


//  //Clear All 
 clearAll.addEventListener('click', async()=>{
  ul.innerHTML = '';
  let arr = [];
  for(let i =0; i<ids.length; i++){
    arr.push(await deleteDoc(doc(db, userUid, ids[i])));
  }
  Promise.all(arr)
  .then((res)=>console.log('All Data Removed'))
  .catch((err)=>console.log(err))
 })


 window.getTodos = getTodos;
 window.delTodo = delTodo;
 window.editTodo = editTodo;
