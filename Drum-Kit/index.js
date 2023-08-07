var numberOfTunes = document.querySelectorAll(".drum").length;
var tune = new Audio("./sounds/tom-1.mp3");

for (var i=0; i<numberOfTunes; i++){
document.querySelectorAll(".drum")[i].addEventListener("click", function (e) {
    soundMaker(e.target.innerHTML);
    animator(e.target.innerHTML);
});
}

document.addEventListener("keydown", function(event) {
    soundMaker(event.key);
    animator(event.key);
});

function soundMaker(keys) {
    switch (keys) {
        case "w":
            var sound = new Audio("./sounds/snare.mp3");
            sound.play();
            break;

        case "a":
            var sound = new Audio("./sounds/kick-bass.mp3");
            sound.play();
            break;

        case "s":
            var sound = new Audio("./sounds/tom-1.mp3");
            sound.play();
            break;

        case "d":
            var sound = new Audio("./sounds/tom-2.mp3");
            sound.play();
            break;

        case "j":
            var sound = new Audio("./sounds/crash.mp3");
            sound.play();
            break;
    
        case "k":
            var sound = new Audio("./sounds/tom-3.mp3");
            sound.play();
            break;

        case "l":
            var sound = new Audio("./sounds/tom-4.mp3");
            sound.play();
            break;

        default:
            break;
    }
}

function animator(key) {
    var button = document.querySelector("."+key);
    button.classList.add("pressed");
    setTimeout(() => {
        button.classList.remove("pressed");
    }, 100);
}

