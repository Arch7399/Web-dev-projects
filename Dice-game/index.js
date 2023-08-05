var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var winner = document.querySelector("h1")

if(randomNumber1 > randomNumber2){
    winner.textContent = "Player 1 Wins!!!"
} else if(randomNumber2 > randomNumber1){
    winner.textContent = "!!!Player 2 Wins"
} else {
    winner.textContent = "Draw :("
}

document.querySelector(".img1").setAttribute("src", `./images/dice${randomNumber1}.png`);
document.querySelector(".img2").setAttribute("src", `./images/dice${randomNumber2}.png`)