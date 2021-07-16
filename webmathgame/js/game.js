let level = 1
let trigger 
let timerVar
let gameContinueCheck
let itemColGameEnd = 0
let currentFrogRow = 3
let answerArray = new Array()
let questionArray = new Array()
let currentAnswerLocation = 4
let answerSetUp = new Array()
let boolGameOver = false
let musicOn = false

class Score {
  constructor(name, level){
    this.gName = name
    this.gLevel = level
  }
}

const generateRandomAnswer = () => {
  const number = parseInt(Math.floor((Math.random() * 5) + 0))
 
  return number
}

const savePlayerData = (level_num) => {
  let highscoreArray = new Array()
  let playerName = localStorage.getItem("playerName")
  const scoreItem = new Score(playerName,level_num)
  if("highscore" in localStorage) {
    highscoreArray = JSON.parse(localStorage.getItem('highscore'))  
    let indexOfLevel = highscoreArray.findIndex(elem =>  elem.gLevel <= scoreItem.gLevel)
    if (indexOfLevel !== -1) {
      highscoreArray.splice(indexOfLevel, 0, scoreItem)
    } else {
        highscoreArray.push(scoreItem)
    }
  } else { 
      highscoreArray.push(scoreItem)
  }  
  if (highscoreArray.length > 5) {
    highscoreArray.length = 5
  }
  localStorage.setItem('highscore', JSON.stringify(highscoreArray))
}

const generateQuestion= () => {
        let question = ""
            const first = parseInt(Math.floor((Math.random() * 15) + 1))
            const second = parseInt(Math.floor((Math.random() * 10) + 1))
            question = `${first} x ${second} = ?`
            questionArray.push(question)
            answerArray.push(first*second)
    return question
};

const initalSetup = () => {
  for(i = 0; i<5 ; i++){
    generateQuestion();
  };

  document.querySelector(".game").innerHTML = `
  <div id="frog">
  <img class="img-frog" src="assets/img/frog_new.png">
  <p class="frog-answer-box">${answerArray[currentAnswerLocation]}</p>
  </div>
  `
  document.querySelector("#frog").style.gridColumn = '20'
  document.querySelector("#frog").style.gridRow = '3'
  for(let i = 0; i< 5; i++){
    document.querySelector(".game").innerHTML += `
  <div class="location-col-1" id="fly-${i+1}">
  <img   class="img-fly" src="assets/img/fly.png">
  <p class="fly-question-box" id="fly-quesiton-${i+1}">${questionArray[i]}</p>
  </div>
  `
  document.querySelector(`#fly-${i+1}`).style.gridColumn = '1'
  document.querySelector(`#fly-${i+1}`).style.gridRow = `${i+1}`
  }
}

const setFrogAnswer = () => {
  document.querySelector(".frog-answer-box").innerText = answerArray[currentAnswerLocation]
}

const gameOver = () => {
      boolGameOver = true
      timeleft = 0
      gameStatus("Game over!")
      clearInterval(timerVar)
      document.onkeydown = ""
      if(level === 6){
        savePlayerData(5)
      }else{
        savePlayerData(level)
      }
      level = 1
}

const changeFlyLocation = (col) => {
    let selectedFly = Math.floor(Math.random() * 5) + 1;
    let fly = document.querySelector(`#fly-${selectedFly}`)
    if(fly != null && boolGameOver === false){
      let currentFlyCol = document.querySelector(`#fly-${selectedFly}`).style.gridColumn
      let newFlyCol = parseInt(currentFlyCol) + col 
      if(newFlyCol >= 20){
        document.querySelector(`#fly-${selectedFly}`).style.gridColumn = `20`
        itemColGameEnd = newFlyCol
        gameOver()
      }
      if(newFlyCol < 20 ){
        document.querySelector(`#fly-${selectedFly}`).style.gridColumn = `${newFlyCol}`
        document.querySelector(`#fly-${selectedFly}`).style.gridRowStart = `${selectedFly}`
      }
    }
}

const changeFrogLocation = (row) => {
  document.querySelector("#frog").style.gridRow = row
}

const animateFly = () => {
    let col = Math.floor(Math.random() * 4) + 1
    changeFlyLocation(col)
}

const startGame = () => {
  questionArray = []
  answerArray = []
  initalSetup();
  setKeyDown()
  boolGameOver = false
  clearInterval(trigger)
  trigger = setInterval(animateFly,800)
  document.querySelector("#btn-music").addEventListener("click", onMusicClick)
} 

const setKeyDown = () => {
  document.onkeydown = function (event) {
    switch (event.keyCode) {
      case 38:
         // "Up key is pressed"
         if(currentFrogRow <= 1){
           return
         }else{
          currentFrogRow -= 1
          changeFrogLocation(currentFrogRow)
         }
         break
      case 40:
         // "Down key is pressed"
         if(currentFrogRow >= 5) {
           return
         }else{
          currentFrogRow += 1
          changeFrogLocation(currentFrogRow)
         }
         break
      case 32:
        // "Space bar pressed"
        let boolAnswer = checkAnswer()
        setFrogAnswer()
        checkIfLevelCleared(boolAnswer)
        break
   }
  }
}
const changeQuestion = (loc) => {
  questionArray = [];
  answerArray = [];
  for(i = 1 ; i<6 ; i++){
    const first = parseInt(Math.floor((Math.random() * 15) + 1))
    const second = parseInt(Math.floor((Math.random() * 10) + 1))
    
    const newQuestion = `${first} x ${second} = ?`
    const newAnswer = first*second

    questionArray.push(newQuestion);
    answerArray.push(newAnswer);
    document.querySelector(`#fly-quesiton-${i}`).innerHTML = newQuestion;
  } 
}

const checkAnswer = () => {
    let boolCorrect = false
    let frogRow = document.querySelector("#frog").style.gridRow
    let currentFlyLocation = frogRow.charAt(0)
    let answerForFly = answerArray[currentFlyLocation - 1]

    if(answerForFly === answerArray[currentAnswerLocation]){
      currentAnswerLocation += 1;
      setFrogAnswer();
      boolCorrect = true;
    }else{
      changeQuestion(currentFlyLocation);
      boolCorrect = false;
    }
  return boolCorrect
}

const timer = () => {
  clearInterval(timerVar);
  let timeleft = 60
  timerVar = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(timerVar)
  }else{
    timeleft -= 1
  }
  document.querySelector("#remaining").innerText = timeleft
}, 1000);
}

const removeFlyOnCorrectAnswer = (fly_id) => {
  document.querySelector(`#fly-${fly_id}`).innerHTML = ""
  document.querySelector(`#fly-${fly_id}`).gridColumn = ""
  document.querySelector(`#fly-${fly_id}`).id = ""
}

const checkIfLevelCleared = (correctAnswer) => {
    if( level < 5 && correctAnswer){
      currentAnswerLocation = generateRandomAnswer();
      startGame()
      setFrogAnswer()
      level += 1
      document.querySelector("#level").innerText = level
      if(level === 5) {
        level = 6
      }
    } else if( level > 5 && correctAnswer){
      boolGameOver = true
      clearInterval(timerVar)
      document.querySelector(".frog-answer-box").innerText = "I am full!"
      gameStatus("You win!")
      timeleft = 0
      savePlayerData(5);
      document.onkeydown = ""
    }
}

const gameStatus = (status) => {
  document.querySelector(".game-over-container").classList.remove("hidden")
  document.querySelector(".game-over").innerText = status
  document.querySelector("#play-again").addEventListener("click", () => {
    currentAnswerLocation = 2;
    timer()
    startGame()
    document.querySelector("#level").innerText = 1
    document.querySelector("#remaining").innerText = 60
    document.querySelector(".game-over-container").classList.add("hidden")
  })
  document.querySelector("#high-scores").addEventListener("click", () => {
    location.replace("scores.html")
  })
  document.querySelector("#home").addEventListener("click", () => {
    location.replace("index.html")
  })
  if(level === 6){
    document.querySelector("#level-game-over").innerText = 5
    level = 1
  }else{
    document.querySelector("#level-game-over").innerText = level
  }
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

// =======  START GAME  =======
timer()
startGame()


