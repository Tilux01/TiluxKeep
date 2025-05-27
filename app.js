import {createUserWithEmailAndPassword,signInWithEmailAndPassword, sendEmailVerification,updateProfile, GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import {auth} from "./config.js"

const btn = document.getElementById("btn")

btn.addEventListener("click", ()=>{
    document.querySelector(".load").style.display = "block"
    const username = document.getElementById("uname").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    if(username.match(/^[^A-Za-z_-]+$/)){
        alert("Only letters, hyphen and underscore are allowed for username")
    }
    else{
        signUser()
    }
})

const signUser = async() =>{
    document.querySelector(".load").style.display = "block"
    const username = document.getElementById("uname").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(userCredential.user, {
            displayName: username
        })
        console.log(userCredential);
        await sendEmailVerification(userCredential.user)
        // const TiluxKeep = {
        //     username,email,password
        // }
        // window.localStorage.setItem('emailForSignIn', TiluxKeep);
        setTimeout(() => {
            window.location.href = 'EmailVerify.html'
        }, 3000);
    }
    catch(error) {
        document.querySelector(".load").style.display = "none"
        const errorCode = error.code;
        const errorMessage = error.message
        alert(errorMessage)
        console.log(errorCode);
        if (error.code == "auth/password-does-not-meet-requirements"){
            alert("Pls use a strong password")
        }
        else if (errorCode == "auth/invalid-email"){
            alert("Pls use a valid email")
        }
        else if(error.code == "auth/email-already-in-use"){
            alert("Email is already in use, pls login or use different email")
        }
    };
}