import { signOut , onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth , db } from "./config.js";
import {getDocs ,
       collection,
       addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
       

const items = document.querySelector("#items");
const logbtn = document.querySelectorAll("#btn");
const userid = document.querySelector("#user")
const todo = document.querySelector("#todo");



//check user
onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(user.uid); 
      userid.innerHTML = user.email ;
    //   popupModal.classList.remove("hidden");
    } else {
        window.location = "index.html" ;
    }
});

let arr = [ ] ; 

logbtn.forEach((btn , index)=>{
    btn.addEventListener('click' ,  ()=> {
      signOut(auth).then(() => {
            window.location = "index.html";
            }).catch((error) => {
              alert("err");
            });
    } )
  })

//   render func 
function render() {
    items.innerHTML = " ";
arr.forEach((value , index)=>{
  console.log(value + ' ' + index); 
  items.innerHTML +=   `
    <a href="#" class="block text-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="subpixel-antialiased mb-2 text-2xl text-sm text-lg text-xl font-bold tracking-tight text-gray-900 dark:text-white">${value}</h5>
    <div class="flex justify-around justify-items-end ms-auto mt-4 container">
    <button class="editBtn focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
    <button class="dltBtn focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
    </div>
    </a>`;


})//..
      //edit button work 
      const editBtn = document.querySelectorAll(".editBtn");
      editBtn.forEach((btn , index)=>{
        btn.addEventListener('click' ,  ()=> editFunc(index) )
      })
      //...
      
      //delete button work 
      const dltBtn = document.querySelectorAll(".dltBtn");
  dltBtn.forEach((btn , index)=>{
    btn.addEventListener('click' , ()=> dltFunc(index))
  })
  //...
  
   // }//...for-loop ended   
  }

//edit function
function editFunc(index) {
    const newItem = prompt(`Edit Your Entered Text.`);
    arr.splice(index , 1 , newItem );
  render();
  }
  //delete function
  function dltFunc(index){
    console.log(`${arr[index]} is deleted`);
  arr.splice(index , 1);
  render();
  }
//...//  




  form.addEventListener('submit' ,async (event)=>{
    event.preventDefault();
    // modal.classList.add("hidden");
    arr.push(todo.value);
    render();
    try {
      const docRef = await addDoc(collection(db, "text"), {
        Text: todo.value , 
        Uid : auth.currentUser.uid, 
        Time: serverTimestamp()
      });      
      console.log(todo.value + ' ' + "Pushed");
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
   
    todo.value = ' ' ;
  })



