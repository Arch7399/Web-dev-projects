var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

function playSound(name) {
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);   
}

function gameOver() {
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");    
    $("h1").text("GameOver, Press any key to restart game.!");
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    level = 0;
}

function answerCheck(currLevel) {
    if(userClickedPattern[currLevel] === gamePattern[currLevel]){
        console.log("yay");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);    
          }
    } else {
        console.log("boo");
        gameOver();
    }
}

$(".btn").on("click", function(e){
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    answerCheck(userClickedPattern.length-1);
});

$(document).keypress(function() {
    if(!gameStarted) {
        $("h1").text("Level "+level);
        nextSequence();
        gameStarted = true;
    }
});

