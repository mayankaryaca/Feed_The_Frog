class Score {
    constructor(name, level){
      this.gName = name
      this.gLevel = level
    }
}

const recoveryScore = () => {
  let highscoreArray = new Array()
  if ("highscore" in localStorage) {
    highscoreArray = JSON.parse(localStorage.getItem("highscore"))
    document.querySelector(".score").innerHTML = `<ul>`
    for (i = 0; i < highscoreArray.length; i++) {
      document.querySelector(".score").innerHTML += `
        <li>${i+1}.  ${highscoreArray[i].gName} - Level ${highscoreArray[i].gLevel}</li>`
    }
    document.querySelector(".score").innerHTML += `</ul>`  
  }
  else {
    document.querySelector(".score").innerHTML = `<p>
    No Score saved yet</p>`
  }
}

recoveryScore()

document.querySelector("#home").addEventListener("click", () => {
  location.replace("index.html")
})
