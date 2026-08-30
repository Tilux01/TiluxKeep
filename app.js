import {createUserWithEmailAndPassword,signInWithEmailAndPassword, sendEmailVerification,updateProfile, GoogleAuthProvider,signInWithPopup,GithubAuthProvider} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import {auth} from "./config.js"

const btn = document.getElementById("btn")
const googleBtn = document.getElementById("signWithGoogle")

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
        await sendEmailVerification(userCredential.user)
        setTimeout(() => {
            window.location.href = 'EmailVerify.html'
        }, 3000);
    }
    catch(error) {
        document.querySelector(".load").style.display = "none"
        const errorCode = error.code;
        const errorMessage = error.message
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
        }, 2000);
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