import {createUserWithEmailAndPassword,signInWithEmailAndPassword, sendEmailVerification,updateProfile, GoogleAuthProvider,signInWithPopup,GithubAuthProvider} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import {auth} from "./config.js"

const btn = document.getElementById("btn")
const googleBtn = document.getElementById("googleBtn")

btn.addEventListener("click", async()=>{
    document.querySelector(".load").style.display = "block"
    const email = document.getElementById("email").value.toLowerCase()
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
        
        if(errorCode == "auth/network-request-failed"){
            alert("pls connect to internet")
        }
        else if(errorCode == "auth/invalid-credential"){
            alert("Invalid credentials, pls try again")
        }
    }
})

googleBtn.addEventListener("click", async()=>{
    try {
        const provider = new GoogleAuthProvider(auth, email)

        provider.addScope("profile")
        provider.addScope("email")

        const userCredential = await signInWithPopup(auth, provider)
        localStorage.setItem("TIluxKeep", JSON.stringify(userCredential.user))
        if(userCredential.additionalUserInfo?.isNewUser){
            alert("You're Welcome")
        }
        else{
            alert("Welcome back")
        }
        setTimeout(() => {
            window.location.href = "index.html"
        }, 1000);
    } catch (error) {
        console.log(error);
    }
})

const provider = new GithubAuthProvider();

document.getElementById("gitHubBtn").addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken; 
            localStorage.setItem("TIluxKeep", JSON.stringify(user))
            if(result.additionalUserInfo?.isNewUser){
                alert("You're Welcome")
            }
            else{
                alert("Welcome back")
            }
            setTimeout(() => {
                window.location.href = "index.html"
            }, 1000);
        })
        .catch((error) => {
            const errorMessage = error.code
            if(errorMessage == "auth/account-exists-with-different-credential"){
                alert("An account already exists with the same email but different sign-in credentials.")
            }
            else if(errorMessage == "auth/popup-blocked"){
                alert("The popup was blocked by the browser.")
            }
            else if(errorMessage == "auth/popup-closed-by-user"){
                alert("The popup has been closed before authentication completed.")
            }
            else if(errorMessage == "auth/invalid-credential"){
                alert("The supplied auth credential is malformed or expired.")
            }
            else if(errorMessage == "auth/network-request-failed"){
                alert("A network error occurred.")
            }
        });
    });