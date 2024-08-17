import { signInWithEmailAndPassword,
  signInWithPopup, 
        GoogleAuthProvider
 } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth } from "./config.js"
// auth.languageCode = 'en';

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector("#form");
const googlebtn = document.querySelector("#ggl-btn");

const btn = document.querySelector("#btn");
 btn.addEventListener('clicK' , ()=>{
  btn.innerHTML = "Loading" ;
  console.log(email.value);
 })


form.addEventListener('submit' , (event)=>{
    event.preventDefault();
    // const auth = getAuth();
signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.href = "home.html" ;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    alert("Invalid! Try Again. :(");
    const errorMessage = error.message;
  });
})

//google reg
const provider = new GoogleAuthProvider();

googlebtn.addEventListener('click' , ()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
   const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
   const user = result.user;
   
    window.location.href = "home.html" ;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
})