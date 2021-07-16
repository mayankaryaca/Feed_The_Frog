let musicOn = false

const initializeSelectors = () => {
    document.querySelector("#btn-start").addEventListener("click",startGame)
    document.querySelector("#btn-rules").addEventListener("click",viewRules)
    document.querySelector("#btn-scores").addEventListener("click",viewScores)
    document.querySelector("input").addEventListener("mouseenter",clearPlayer)
    document.querySelector("#btn-music").addEventListener("click", onMusicClick)
}

const clearPlayer = () => {
    document.getElementById("player").value = ""
    document.querySelector(".output").innerHTML = ""
}

const startGame = () => {
    let playerName = document.getElementById("player").value

    if (playerName === "") {
        document.querySelector(".output").innerHTML = `
            <p>You must provide the name to start the game!</p>
        `
    } else { 
        localStorage.setItem("playerName",playerName)
        location.replace("play.html")
    }
}
 
const viewRules = () => {
    location.replace("rules.html")
}

const viewScores = () => {
    location.replace("scores.html")
}

const playMusic = () => {
    const audio = document.querySelector("#music")
    audio.play()
}

const pauseMusic = () => {
    document.querySelector("#music").pause()
}

const onMusicClick = () => {
    const image = document.querySelector(".btn-music > img")
    if (musicOn) {
        playMusic() 
        musicOn = false
        image.src =  "assets/icon/sound.jpeg" 
    } else {
        pauseMusic()
        musicOn = true
        image.src =  "assets/icon/no-sound.jpeg" 
    }
 
}

initializeSelectors()