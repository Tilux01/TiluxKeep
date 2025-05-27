import {createUserWithEmailAndPassword,signInWithEmailAndPassword, sendEmailVerification,updateProfile, GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import {auth} from "./config.js"

const btn = document.getElementById("btn")

btn.addEventListener("click", async()=>{
    document.querySelector(".load").style.display = "block"
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    if(email == "" || password == ""){
        alert("Pls fill in the info")
    }
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        if(userCredential.user.emailVerified == false){
            alert("Pls verify your account")
        }
        else{
            alert("welcome")
            localStorage.setItem("TIluxKeep", JSON.stringify(userCredential.user))
            window.location.href = "index.html"
        }
    } catch (error) {
        document.querySelector(".load").style.display = "none"
        const errorCode = error.code
        console.log(errorCode);
        
        if(errorCode == "auth/network-request-failed"){
            alert("pls connect to internet")
        }
        else if(errorCode == "auth/invalid-credential"){
            alert("Invalid credentials, pls try again")
        }
    }
})

