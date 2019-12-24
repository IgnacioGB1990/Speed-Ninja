window.onload = function() {
  Game.init();
};

var startStopBtn = document.getElementById("pause-start-button");
var startBtn = document.getElementById("start-button");

// document.getElementById("pause-start-button").onclick = () => {
//   console.log("hello");
//   Game.gameOver();
// };

startStopBtn.addEventListener("click", function() {
  if (startStopBtn.classList.contains("pause")) {
    Game.gameOver();
  }
});

function setStopBtn() {
  clearInterval(this.interval);
}

startBtn.addEventListener("click", function() {
  if (startBtn.classList.contains("start2")) {
    Game.startOver();
    console.log("entruuuuu???");
    // startBtn.classList.remove("start2");
    // startBtn.classList.add("pause");
  }
});
