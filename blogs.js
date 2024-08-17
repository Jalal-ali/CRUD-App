import { signOut , onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth , db } from "./config.js";
import {getDocs ,
       collection,
       addDoc,updateDoc ,deleteField ,
       doc, deleteDoc  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
       const userid = document.querySelector("#user");
       const items = document.querySelector("#items");
       const logbtn = document.querySelectorAll("#btn");

//logout func
logbtn.forEach((btn , index)=>{
  btn.addEventListener('click' ,  ()=> {
    signOut(auth).then(() => {
          window.location = "index.html";
          }).catch((error) => {
            alert("err");
          });
  } )
})






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

let docid = ' ' ;
let arr = [ ] ;

// get data from firebasse Db
async function getData() {  
  const querySnapshot = await getDocs(collection(db, "text"));
  querySnapshot.forEach((doc) => {
    // if logged in userid is matches the doc id then..
    if(doc.data().Uid === auth.currentUser.uid){
      arr.push(doc.data().Text);
    }
    docid = doc.id ;
    console.log(arr);
    console.log(doc.id);
  }); 
 
  
  arr.map((value)=>{
      items.innerHTML +=  `
      <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg text-center shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 class="subpixel-antialiased mb-2 text-2xl text-sm text-lg text-xl font-bold tracking-tight text-gray-900 dark:text-white">${value}</h5>
<div class="flex justify-around justify-items-end ms-auto mt-4 container">
<button class="editBtn focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
<button class="dltBtn focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
</div>
</a>`;
})
//  //edit button work 
//  const editBtn = document.querySelectorAll(".editBtn");
//  editBtn.forEach((btn , index)=>{
//    btn.addEventListener('click' ,  ()=> editFunc(index) )
//  })
//  //...
 
//  //delete button work 
//  const dltBtn = document.querySelectorAll(".dltBtn");
// dltBtn.forEach((btn , index)=>{
// btn.addEventListener('click' , ()=> dltFunc(docid))
// })
  
}
// //edit function
// function editFunc(index) {
  
// }
// //delete function
// async function dltFunc(docid){

//   if(docid === docid ){

//     console.log("dlt btn running");
//     try {
//       // Reference the document you want to delete
//       const docRef = doc(db, "text", docid);
  
//       // Delete the document
//       await deleteDoc(docRef);  
//       console.log("Document successfully deleted!");
//     } catch (error) {
//       console.error("Error deleting document: ", error);
//     }
//   }else{
//     console.log("error");
//   }
// }



getData() ;