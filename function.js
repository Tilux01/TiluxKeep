import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push,set, get} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://sqi-training-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const db = getDatabase(app)


let noteArray = []
let deletedArray = []
let archivedArray = []
const cardObj = {}
let imgBase64 = ""
const userCredential = JSON.parse(localStorage.getItem("TIluxKeep"))
console.log(userCredential);

if (userCredential == null || userCredential == "") {
    window.location.href = "signup.html"
}
// Display Name
const email = document.getElementById("displayEmail")
const dName = document.getElementById("displayName")
email.innerHTML = userCredential.email
dName.innerHTML = userCredential.displayName

// User details
const userEmail = userCredential.displayName
console.log();

const overhead = ref(db,userEmail)

get(overhead).then((snapshot)=>{
        if(snapshot.exists()){
            const snap = snapshot.val()
            console.log(snap.noteArray);
            
            if(snap.noteArray != undefined){
                noteArray = snap.noteArray
            }
            if(snap.deletedArray != undefined){
                deletedArray = snap.deletedArray
                alert("yes")
            }
            if(snap.archivedArray != undefined){
                archivedArray = snap.archivedArray
            }
            if(snap.profileImg != undefined){
                const profileImg = document.getElementById("profileImg").src = snap.profileImg
                imgBase64 = snap.profileImg
            }
            console.log(noteArray);
            console.log(archivedArray);
            console.log(deletedArray);
        }
        else{
            alert("Welcome to Tilux keep, we are excited to have you have you here, please feel free to make use of Keep and make use of the functionalities");
        }
        mapDisplay()
    }).catch((error)=>{
        errorCode = error.code
        console.log(errorCode);
        
    })


// burgerMenu Toggle Function
let togggleCount = 0
const burgerMenu = document.getElementById("toggle")
const sideBarText = document.querySelectorAll("#sideBar ul li p")
const sideBar = document.querySelector("#sideBar")
const content = document.getElementById("content")
const display = document.getElementById("display")
const allCards = document.querySelectorAll("#card")

burgerMenu.addEventListener("click", ()=>{
    togggleCount++;
    if(window.innerWidth > 1021){
        if(togggleCount%2 != 0){
            sideBarText.forEach((text)=>{
                text.style.display = "none"
            })
            allCards.forEach((card)=>{
                card.style.width = "270px"
            })
        }
        else{
            sideBarText.forEach((text)=>{
                text.style.display = "initial"
            })
            allCards.forEach((card)=>{
                card.style.width = "235px"
            })
        }
    }
    else{
        if(togggleCount%2 != 0){
            content.style.display = "none"
            sideBar.style.display = "flex"
            sideBar.style.width = "100%"
            const dd = document.querySelector("section div:nth-child(1) ul")
            dd.style.width = "80%"
            dd.style.gap = "2rem"
            // dd.style.alignItems = "center"
        }
        else{
            const dd = document.querySelector("section div:nth-child(1) ul")
            dd.style.width = "auto"
            dd.style.gap = "1rem"
            content.style.display = "initial"
            sideBar.style.display = "none"
            sideBar.style.width = "200px"
        }
    }
})


// sideBarChange

const sideList = document.querySelectorAll("section div:nth-child(1) ul li")

sideList.forEach((list)=>{
    list.addEventListener("click", (e)=>{
        sideList.forEach((i)=>{
            i.style.background = "transparent"
        })
        list.style.background = "linear-gradient(135deg, rgba(255, 0, 0, 0.288), rgba(0, 0, 255, 0.233))"
    })
})
// Refresh Function
const reloadButton = document.getElementById("reload")
reloadButton.addEventListener("click", ()=>{
    // alert("yes")
    window.location.reload()
})
// Log out
const logOutBtn = document.getElementById("logOut")
logOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("TIluxKeep")
    window.location.href = "login.html"
})

// ListType Function

const listType = document.getElementById("listType")
let counter = 0
listType.addEventListener("click", ()=>{
    counter++;
    const display = document.getElementById("display")
    if (counter%2 != 0){
        display.style.display = "flex"
        display.style.flexWrap = "wrap"
        display.style.justifyContent = "center"
        // display.style.alignItems = "center"
        display.style.gap = "0.5rem"
        allCards.forEach((card)=>{
            card.style.width = "40%"
        })
    }
    else{
        display.style.display = ""
        display.style.flexDirection = ""
        display.style.justifyContent = ""
        display.style.flexWrap = ""
        display.style.gap = ""
        allCards.forEach((card)=>{
            card.style.width = "235px"
        })
    }
})

// profile Button

const profileButton = document.getElementById("profile")
const userProfile = document.getElementById("userProfile")
let profileCounter = 0

profileButton.addEventListener("click", ()=>{
    profileCounter++;
    if(profileCounter%2 != 0){
        userProfile.style.display = "flex"
        document.querySelector(".main").style.filter = "blur(10px)"
    }
    else{
        userProfile.style.display = "none"
        document.querySelector(".main").style.filter = "blur(0px)"
    }
})

//search



const searchInput = document.getElementById("searchInput")
searchInput.addEventListener("input", ()=>{
    let values = searchInput.value.toLocaleLowerCase()
    let allCardText = document.querySelectorAll(".card p")
    allCardText.forEach((text)=>{
        text.style.background = ""
        if(values && text.innerHTML.toLocaleLowerCase().includes(values)){
            text.style.background = 'linear-gradient(135deg, rgba(255, 0, 0, 0.288), rgba(0, 0, 255, 0.233))'
        }
    })
})
const secondSearch = document.getElementById("secondSearch")
secondSearch.addEventListener("input", ()=>{
    let values = secondSearch.value.toLocaleLowerCase()
    let allCardText = document.querySelectorAll(".card p")
    allCardText.forEach((text)=>{
        text.style.background = ""
        if(values && text.innerHTML.toLocaleLowerCase().includes(values)){
            text.style.background = 'linear-gradient(135deg, rgba(255, 0, 0, 0.288), rgba(0, 0, 255, 0.233))'
        }
    })
})
const searchBtn = document.getElementById("searchBtn")
let searchBtnCounter = 0
searchBtn.addEventListener("click", ()=>{
    screenWidth = window.innerWidth
    if(screenWidth <= 600){
        searchBtnCounter++;
        if(searchBtnCounter%2 != 0){
            secondSearch.style.display = "flex"
        }
        else{
            secondSearch.style.display = "none"
        }
    }
})


// profilePictureUpload

const profileUpload = document.getElementById("profileUpload")
const profileImg = document.getElementById("profileImg")
profileUpload.addEventListener("change", ()=>{
    const file = profileUpload.files[0]
    let reader = new FileReader()
    reader.addEventListener("load", (e)=>{
        const imgBase = e.target.result
        imgBase64 = imgBase
        profileImg.src = imgBase64
        const pushed = set(ref(db, userEmail),{
            noteArray,
            archivedArray,
            deletedArray,
            profileImg: imgBase64
        })
    })
    reader.readAsDataURL(file)
})

// card Array

    // Hide Input
document.addEventListener("click", (e)=>{
    const addTag = document.getElementById("title")
    const addTag2 = document.querySelector(".noteBody")
    const addTag3 = document.querySelector(".inputDiv label")
    const addTag4 = document.querySelector("section .content .display .card")
    if(addTag.contains(e.target) || addTag2.contains(e.target) || addTag3.contains(e.target) ){
        addTag.placeholder = "Title Here ......"
        addTag2.style.display = "flex"
    }
    
    else{
        addTag.placeholder = "Write Note...."
        addTag2.style.display = "none"
    }
})

    // Img Input save
const firstInputImg = document.getElementById("firstInputImg")
let collectCardImg = ""
firstInputImg.addEventListener("change", ()=>{
    const filePath = firstInputImg.files[0]
    const reader = new FileReader
    reader.addEventListener("load", (e)=>{
        const imgPreview = e.target.result
        collectCardImg = imgPreview
        document.querySelector("section .content .inputDiv span img").src = imgPreview
        document.querySelector("section .content .inputDiv span img").style.filter = "invert(0)"
    })
    reader.readAsDataURL(filePath)
    
})

const addNoteButton = document.getElementById("addNote")
const title = document.getElementById("title")
const note = document.getElementById("note")
addNoteButton.addEventListener("click", ()=>{
    if (!title.value || title.value.match(/^[\s]+$/)) {
        alert("Pls Input Note Title")
    }
    else if(!note.value || note.value.match(/^[\s]+$/)){
        alert("Pls write Note to add")
    }
    else{

        const cardObj = {
            star:"images/star.png",
            color: "transparent",
            img: collectCardImg,
            content: note.value,
            title: title.value
        }
        noteArray.push(cardObj)
        console.log(deletedArray);
        const pushed = set(ref(db, userEmail),{
            noteArray,
            archivedArray,
            deletedArray,
            profileImg: imgBase64
        })
        mapDisplay()
    }
})

window.mapDisplay = () =>{
    display.innerHTML = ""
    noteArray.map((output,index)=>{
        display.innerHTML += `
            <div id="card${index}" class="card" style="background:${output.color};">
                <img src="${output.star}" alt="" onclick="star('${index}')" id="starCard${index}">
                <h1 id="titleText${index}" contenteditable="true" onclick="preview(${index})">${output.title}</h1>
                <p id="noteText${index}" contenteditable="true" onclick="preview(${index})">${output.content}</p>
                <img src="${output.img}" alt="" class="cardPicture" id="cardPicture${index}">
                <div class="bottomButton" id="bottomButton">
                    <img title="Color" src="images/pallete.png" alt="" onclick="colorDisplay('${index}')">
                    <img title="Reminder" src="images/bell.png" alt="">
                    <label title="Image" for="upload${index}"><img src="images/image.png" alt="" for="upload${index}" title="Image"></label>
                    <input type="file" accept="image/*" id="upload${index}" style="display: none;"onchange="changeImg('${index}')">
                    <img title="Archive" src="images/download-file.png" alt="" onclick="archivedCard('${index}')">
                    <img title="Edit" src="images/pen.png" alt="" onclick="preview(${index})">
                    <img title="Delete" src="images/delete.png" alt="" onclick="deleteCard('${index}')">
                    <button onclick = "closeEdit('${index}')">Close</button>
                </div>
                <div  class="colorParent">
                    <div onclick="selectColor('${index}', 'transparent')"></div>
                    <div onclick="selectColor('${index}', '#6a4c93')"></div>
                    <div onclick="selectColor('${index}', '#8ac926')"></div>
                    <div onclick="selectColor('${index}', '#ff595e')"></div>
                    <div onclick="selectColor('${index}', '#f35b04')"></div>
                    <div onclick="selectColor('${index}', '#2176ff')"></div>
                </div>
            </div>
            `
        
    })
    title.value = ""
    note.value = ""
    document.querySelector("section .content .inputDiv span img").src = "images/image.png"
    document.querySelector("section .content .inputDiv span img").style.filter = "invert(1)"
    collectCardImg =""
}

    // star
window.star = (index) =>{
    const starCard = document.getElementById("starCard"+index)
    let cardParent = document.querySelector(`#card${index}`)
    if (starCard.src.includes("images/star.png")){
        starCard.src = "images/star (1).png"
        const color = noteArray[index].color
        const img = noteArray[index].img
        const title = noteArray[index].title
        const content = noteArray[index].content
        const star = "images/star (1).png"
        const cardObj = {
            color,
            img,
            content,
            title,
            star
        }
        noteArray.splice(index,1,cardObj)
        const pushed = set(ref(db, userEmail),{
            noteArray,
            archivedArray,
            deletedArray,
            profileImg: imgBase64
        })
    }
    else{
        starCard.src = "images/star.png"
        const color = noteArray[index].color
        const img = noteArray[index].img
        const title = noteArray[index].title
        const content = noteArray[index].content
        const star = "images/star.png"
        const cardObj = {
            color,
            img,
            content,
            title,
            star
        }
        noteArray.splice(index,1,cardObj)
        const pushed = set(ref(db, userEmail),{
            noteArray,
            archivedArray,
            deletedArray,
            profileImg: imgBase64
        })
    }
}


    // Color Display
let colorCounter = 0
window.colorDisplay = (index) =>{
    document.querySelectorAll(`.card .colorParent`).forEach((card)=>{card.style.display = "none"})
    let cardParent = document.querySelector(`#card${index} .colorParent`)
    colorCounter++;
    if(colorCounter%2 != 0){
        cardParent.style.display = "flex"
    }
    else{
        cardParent.style.display = "none"
    }
}
    // color Select
window.selectColor = (index, colorD) =>{
    let cardParent = document.querySelector(`#card${index}`)
    cardParent.style.background = colorD
    const img = noteArray[index].img
    const title = noteArray[index].title
    const content = noteArray[index].content
    const star = noteArray[index].star
    const cardObj = {
        color: colorD,
        img,
        content,
        title,
        star
    }
    noteArray.splice(index,1,cardObj)
    const pushed = set(ref(db, userEmail),{
        noteArray,
        archivedArray,
        deletedArray,
        profileImg: imgBase64
    })
}


    // Preview
window.preview = (index) =>{
const previewCard = document.getElementById("#card"+index)
const style = document.getElementById("style")
closeEdit(index)
    style.innerHTML = `
        section .content .display .card,
        section .content .inputDiv{
            filter:blur(15px);
        }
        section .content .inputDiv{
            display:none;
        }
        section .content .display #card${index}{
            position: absolute;
        box-shadow: -2px -2px 10px rgba(0, 0, 255, 0.171), 2px 2px 10px rgba(255, 0, 0, 0.171);
            width: 50%;
            top: 20%;
            left: 25%;
            filter:blur(0px);
            z-index: 2;
            /* height: 300px; */
        }
        section .content .display #card${index} p{
            height: 300px;
            overflow-y: scroll;
        }
        section .content .display #card${index} button{
            box-shadow: 0px 0px 10px rgba(0, 0, 255, 0.295);
            width: 100px;
            cursor: pointer;
            font-weight: 600;
            padding: 0px 0px;
            background: linear-gradient(135deg, blue, red);
            border-radius: 20px;
            outline: 0;
            border: 0;
            display: initial;
        }
        section .content .display #card${index} p::-webkit-scrollbar{
            width: 2px;
            background-color: white;
        }
        section .content .display #card${index} p::-webkit-scrollbar-thumb{
            background: linear-gradient(135deg, blue, red);
        }
        section .content .display #card${index} .cardPicture{
            display: none;
        }
        @media screen and (max-width:600px) {
            section .content .display #card${index}{
            width: 90%;
            left: 5%;
            }
        }
    `
} 

// Close Preview

window.closeEdit = (index) =>{
    const title = document.getElementById("titleText"+index)
    const note = document.getElementById("noteText"+index)
    const style = document.getElementById("style")
    const image = noteArray[index].img
    const color = noteArray[index].color
    
    style.innerHTML = ""
    const cardObj = {
        color,
        img: image,
        content: note.textContent,
        title: title.textContent
    }
    noteArray.splice(index,1,cardObj)
    const pushed = set(ref(db, userEmail),{
        noteArray,
        archivedArray,
        deletedArray,
        profileImg: imgBase64
    })
}

        // cardImg change
window.changeImg = (index) =>{
    const color = noteArray[index].color
    const star = noteArray[index].star
    const upload = document.querySelector("#upload"+index)    
    const file = upload.files[0]
    let reader = new FileReader()
    reader.addEventListener("load", (e)=>{
        const imgBase64 = e.target.result
        collectCardImg = {
            color,
            img:imgBase64,
            content:noteArray[index].content,
            title:noteArray[index].title,
            star
        }
        noteArray.splice(index,1,collectCardImg)
        const pushed = set(ref(db, userEmail),{
            noteArray,
            archivedArray,
            deletedArray,
            profileImg: imgBase64
        })
        mapDisplay()
    })
    reader.readAsDataURL(file)
}


window.deleteCard = (index) =>{
    deletedArray.push(noteArray[index])
    noteArray.splice(index,1)
    const pushed = set(ref(db, userEmail),{
        noteArray,
        archivedArray,
        deletedArray,
        profileImg: imgBase64
    })
    mapDisplay()
}

window.archivedCard = (index) =>{
    archivedArray.push(noteArray[index])
    noteArray.splice(index,1)
    const pushed = set(ref(db, userEmail),{
        noteArray,
        archivedArray,
        deletedArray,
        profileImg: imgBase64
    })
    mapDisplay()
}


// SECTIONS
const autoHideInp = document.querySelector(".inputDiv")
const autoShow = document.getElementById("beneathAutohide")
    // Notes Section
const noteSectionBtn = document.getElementById("noteSection")
noteSectionBtn.addEventListener("click", ()=>{
    autoHideInp.style.display = "flex"
    autoShow.innerHTML = ""
    mapDisplay()
})

    // Archive Section
const archive = document.getElementById("archive")
archive.addEventListener("click", ()=>{
    autoHideInp.style.display = "none"
    autoShow.innerHTML = "Archive"
    archiveMapping()
})
window.archiveMapping = () =>{
    display.innerHTML = ""
    archivedArray.map((output,index)=>{
        display.innerHTML += `
            <div id="card${index}" class="card" style="background:${output.color};">
                <h1 contenteditable="true" id="archiveTitleText${index}" onclick="archivePreview('${index}')">${output.title}</h1>
                <p contenteditable="true" id="archiveNoteText${index}" onclick="archivePreview('${index}')">${output.content}</p>
                <img src="${output.img}" alt="" class="cardPicture" id="cardPicture${index}">
                <div class="bottomButton" id="bottomButton">
                    <img title="Color" src="images/pallete.png" alt="" onclick="colorDisplay('${index}')">
                    <img title="Reminder" src="images/bell.png" alt="">
                    <label title="Image" for="upload${index}"><img src="images/image.png" alt="" for="upload${index}" title="Image"></label>
                    <input type="file" accept="image/*" id="upload${index}" style="display: none;"onchange="archiveChangeImg('${index}')">
                    <img title="Unarchive" src="images/inbox.png" alt="" onclick="unarchiveCard('${index}')">
                    <img title="Edit Card" src="images/pen.png" alt="" onclick="archivePreview(${index})">
                    <img title="Delete" src="images/delete.png" alt="" onclick="archiveDeleteCard('${index}')">
                    <button onclick = "archiveCloseEdit('${index}')">Close</button>
                </div>
                <div  class="colorParent">
                    <div onclick="archiveSelectColor('${index}', 'transparent')"></div>
                    <div onclick="archiveSelectColor('${index}', '#6a4c93')"></div>
                    <div onclick="archiveSelectColor('${index}', '#8ac926')"></div>
                    <div onclick="archiveSelectColor('${index}', '#ff595e')"></div>
                    <div onclick="archiveSelectColor('${index}', '#f35b04')"></div>
                    <div onclick="archiveSelectColor('${index}', '#2176ff')"></div>
                </div>
            </div>
        `
        
    })
    title.value = ""
    note.value = ""
    document.querySelector("section .content .inputDiv span img").src = "images/image.png"
    document.querySelector("section .content .inputDiv span img").style.filter = "invert(1)"
    collectCardImg =""
}

    // archive select color
    window.archiveSelectColor = (index, colorD) =>{
        let cardParent = document.querySelector(`#card${index}`)
        cardParent.style.background = colorD
        const img = archivedArray[index].img
        const title = archivedArray[index].title
        const content = archivedArray[index].content
        const star = archivedArray[index].star
        const cardObj = {
            color: colorD,
            img,
            content,
            title,
            star
        }
        archivedArray.splice(index,1,cardObj)
        const pushed = set(ref(db, userEmail),{
            noteArray,
            archivedArray,
            deletedArray,
            profileImg: imgBase64
        })
    }
    

window.archivePreview = (index) =>{
    const previewCard = document.getElementById("#card"+index)
    const style = document.getElementById("style")
    archiveCloseEdit(index)
    style.innerHTML = `
        section .content .display .card,
        section .content .inputDiv,
        #beneathAutohide{
            filter:blur(15px);
        }
        section .content .inputDiv{
            display:none;
        }
        section .content .display #card${index}{
            position: absolute;
        box-shadow: -2px -2px 10px rgba(0, 0, 255, 0.171), 2px 2px 10px rgba(255, 0, 0, 0.171);
            width: 50%;
            top: 20%;
            left: 25%;
            filter:blur(0px);
            z-index: 2;
            /* height: 300px; */
        }
        section .content .display #card${index} p{
            height: 300px;
            overflow-y: scroll;
        }
        section .content .display #card${index} button{
            box-shadow: 0px 0px 10px rgba(0, 0, 255, 0.295);
            width: 100px;
            cursor: pointer;
            font-weight: 600;
            padding: 0px 0px;
            background: linear-gradient(135deg, blue, red);
            border-radius: 20px;
            outline: 0;
            border: 0;
            display: initial;
        }
        section .content .display #card${index} p::-webkit-scrollbar{
            width: 2px;
            background-color: white;
        }
        section .content .display #card${index} p::-webkit-scrollbar-thumb{
            background: linear-gradient(135deg, blue, red);
        }
        section .content .display #card${index} .cardPicture{
            display: none;
        }
        @media screen and (max-width:600px) {
            section .content .display #card${index}{
            width: 90%;
            left: 5%;
            }
        }
    `
} 

// Close Preview

window.archiveCloseEdit = (index) =>{
    const title = document.getElementById(`archiveTitleText${index}`)
    const note = document.getElementById("archiveNoteText"+index)
    const style = document.getElementById("style")
    const image = archivedArray[index].img
    const color = archivedArray[index].color
    const star = archivedArray[index].star
    style.innerHTML = ""
    const cardObj = {
        color,
        img: image,
        content: note.textContent,
        title: title.textContent,
        star
    }
    archivedArray.splice(index,1,cardObj)
    const pushed = set(ref(db, userEmail),{
        noteArray,
        archivedArray,
        deletedArray,
        profileImg: imgBase64
    })
}
window.archiveChangeImg = (index) =>{
    const upload = document.querySelector("#upload"+index)   
    const color = archivedArray[index].color
    const star = archivedArray[index].star
    const file = upload.files[0]
    let reader = new FileReader()
    reader.addEventListener("load", (e)=>{
        const imgBase64 = e.target.result
        collectCardImg = {
            color,
            img:imgBase64,
            content:archivedArray[index].content,
            title:archivedArray[index].title,
            star
        }
        archivedArray.splice(index,1,collectCardImg)
        const pushed = set(ref(db, userEmail),{
            noteArray,
            archivedArray,
            deletedArray,
            profileImg: imgBase64
        })
        archiveMapping()
    })
    reader.readAsDataURL(file)
}


window.archiveDeleteCard = (index) =>{
    deletedArray.push(archivedArray[index])
    archivedArray.splice(index,1)
    const pushed = set(ref(db, userEmail),{
        noteArray,
        archivedArray,
        deletedArray,
        profileImg: imgBase64
    })
    archiveMapping()
}

window.unarchiveCard = (index) =>{
    noteArray.push(archivedArray[index])
    archivedArray.splice(index,1)
    const pushed = set(ref(db, userEmail),{
        noteArray,
        archivedArray,
        deletedArray,
        profileImg: imgBase64
    })
    archiveMapping()
}


    // Favorite Section
const favorite = document.getElementById("favorite")
favorite.addEventListener("click", ()=>{
    autoHideInp.style.display = "none"
    autoShow.innerHTML = "Favorite"
    display.innerHTML = ""
    starMap()

})
window.starMap = () =>{
    noteArray.map((output,index)=>{
        display.innerHTML += `
            <div id="card${index}" class="card" style="background:${output.color};">
                <img src="${output.star}" alt="" onclick="favoriteStar('${index}')" id="starCard${index}">
                <h1 id="archiveTitleText${index}">${output.title}</h1>
                <p id="archiveNoteText${index}">${output.content}</p>
                <img src="${output.img}" alt="" class="cardPicture">
            </div>
        `
        const star = document.getElementById("starCard"+index)
        const card = document.getElementById("card"+index)
        if(star.src.includes("images/star.png")){
            card.style.display = "none"
        }
    })
}
window.favoriteStar = (index) =>{
    const starCard = document.getElementById("starCard"+index)
    let cardParent = document.querySelector(`#card${index}`)
    if (starCard.src.includes("images/star.png")){
        starCard.src = "images/star (1).png"
        const color = noteArray[index].color
        const img = noteArray[index].img
        const title = noteArray[index].title
        const content = noteArray[index].content
        const star = "images/star (1).png"
        const cardObj = {
            color,
            img,
            content,
            title,
            star
        }
        noteArray.splice(index,1,cardObj)
        const pushed = set(ref(db, userEmail),{
            noteArray,
            archivedArray,
            deletedArray,
            profileImg: imgBase64
        })
        starMap()
    }
    else{
        starCard.src = "images/star.png"
        const color = noteArray[index].color
        const img = noteArray[index].img
        const title = noteArray[index].title
        const content = noteArray[index].content
        const star = "images/star.png"
        const cardObj = {
            color,
            img,
            content,
            title,
            star
        }
        noteArray.splice(index,1,cardObj)
        const pushed = set(ref(db, userEmail),{
            noteArray,
            archivedArray,
            deletedArray,
            profileImg: imgBase64
        })
        starMap()
    }
}


    // Trash Section
const trash = document.getElementById("trash")
trash.addEventListener("click", ()=>{
    autoHideInp.style.display = "none"
    autoShow.innerHTML = "Trash"
    trashMapping()
})
window.trashMapping = () =>{
    display.innerHTML = ""
    deletedArray.map((output,index)=>{
        display.innerHTML += `
            <div id="card" class="card" style="background:${output.color};>
                <img src="images/mark.png" alt="">
                <h1>${output.title}</h1>
                <p>${output.content}</p>
                <img src="${output.img}" alt="" class="cardPicture" id="cardPicture">
                <div class="bottomButton" id="bottomButton">
                    <img style="filter: invert(1);background:white;" src=""images/recover.png onclick="recoverCard('${index}')">
                    <img src="images/delete.png" alt="" onclick="trashDeleteCard('${index}')">
                </div>
            </div>
        `
    })
    title.value = ""
    note.value = ""
    document.querySelector("section .content .inputDiv span img").src = "images/image.png"
    document.querySelector("section .content .inputDiv span img").style.filter = "invert(1)"
    collectCardImg =""
}  
window.trashDeleteCard = (index) =>{
    deletedArray.splice(index,1)
    const pushed = set(ref(db, userEmail),{
        noteArray,
        archivedArray,
        deletedArray,
        profileImg: imgBase64
    })
    trashMapping()
}

window.recoverCard = (index) =>{
    noteArray.push(deletedArray[index])
    deletedArray.splice(index,1)
    const pushed = set(ref(db, userEmail),{
        noteArray,
        archivedArray,
        deletedArray,
        profileImg: imgBase64
    })
    trashMapping()

}
