const buttonColors = ["blue", "green", "red", "yellow"];
const soundList = ["sounds/blue.mp3", "sounds/green.mp3", "sounds/red.mp3", "sounds/yellow.mp3", "sounds/wrong.mp3"];

let pattern = [];
let gameLevel = 1;

let userTiles = [];
let userEntries = 0;

let randomNumber;
let chosenButton;
let userClick;
let sound;
let soundId;


function whiteButtonToStart() {
  pattern = [];
  userTiles = [];
  gameLevel = 1;
  $("#start").click(startGame);
}


function startGame() {
  $("#start").off("click");
  nextSequence();
}


function nextSequence() {

  $("#level-title").text(`Level ${gameLevel}`);

  randomNumber = Math.floor(Math.random() * 4);
  chosenButton = buttonColors[randomNumber];
  pattern.push(chosenButton);

  $(`#${chosenButton}`).fadeOut().fadeIn();
  playSound(chosenButton);


  userEntries = 0;
  userTiles = [];
  userPlay();

}



function userPlay() {
  $(".btn").click(function(event) {
    userClick = event.target.id;
    console.log(userClick);
    playSound(userClick);
    buttonAnimation(userClick);
    userTiles.push(userClick);

    userEntries++;

    resultChecker();

  });
}



function resultChecker() {

  if (userTiles[userEntries - 1] === pattern[userEntries - 1]) {
    if (userTiles.length === pattern.length) {
      $(".btn").off("click");
      gameLevel++;
      setTimeout(function() {nextSequence()}, 1000);
    }
  } else {
    $(".btn").off("click");
    playSound("wrong");
  }

}


function playSound(color) {

  if (color === "blue") {
    soundId = 0;
  } else if (color === "green") {
    soundId = 1;
  } else if (color === "red") {
    soundId = 2;
  } else if (color === "yellow") {
    soundId = 3;
  } else if (color === "wrong"){
    soundId = 4;
    buttonAnimation("wrong");
  }

  sound = soundList[soundId];
  let audio = new Audio(sound);
  audio.play();
}



function buttonAnimation(color) {

  if (color === "wrong") {
    $("body").addClass("game-over");
    $("#level-title").text(`Level ${gameLevel}! Game Over, Press the 'White' Button to Restart`);
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 500);
    whiteButtonToStart();
  } else {
    $(`#${color}`).addClass("pressed");
    setTimeout(function() {
        $(`#${color}`).removeClass("pressed");
    }, 200);
  }

}



whiteButtonToStart();
