var diffEls = document.querySelectorAll(".diff__btn");
var diffEl = document.querySelector(".diff__btn.active").innerHTML;
var n = diffEl;
var colorsEl = document.querySelector(".colors");
var colorsBlocks;
var rgbEl = document.querySelector(".rgb");
var statusEl = document.querySelector(".status");
var colors = [];
createBlocks(n);
resetGame();
setNumberOfTiles();

function checkColors (event){
  // your code here
  var bg = event.target.style.backgroundColor;
  if (bg != colors[pickedColor]) {
    event.target.style.visibility = "hidden";
  } else {
    colorsBlocks.forEach((element) => {
      element.style.backgroundColor = bg;
    });
    const tOut = setTimeout(() =>{
      Swal.fire({
        position: "center",
        icon: "success",
        title: " You won ! Thank you for playing",
        showConfirmButton: true,
        timer: 2500,
      })},
      500
    );
    const tOut2 = setTimeout(resetGame, 1000);
  }
};

function resetGame() {
  createBlocks(n);
  document.body.style.color = "black";
  colors = [];
  pickColors();
  pickedColor = random(n);
  rgbEl.innerHTML = colors[pickedColor];
  setColors();
  statusEl.innerHTML =
    "Try to guess the right color based on the RGB value by clicking on the blocks.";
}

function setColors() {
  for (var i = 0; i < colorsBlocks.length; i++) {
    colorsBlocks[i].style.backgroundColor = colors[i];
  }
}

function pickColors() {
  for (var i = 0; i < n; i++) {
    colors.push(randomColor());
  }
}

function randomColor() {
  return "rgb(" + random(255) + ", " + random(255) + ", " + random(255) + ")";
}

function random(r) {
  return Math.floor(Math.random() * r);
}

function setNumberOfTiles() {
  // your code here
  diffEls.forEach((element) => {
    element.addEventListener("click", activeClass);
  });
}

function activeClass(e) {
  diffEls.forEach((ele) => {
    if (ele.classList.contains("active")) {
      ele.classList.remove("active");
    }
  });
  e.target.classList.add("active");
  n = e.target.textContent;
  resetGame();
}

function createBlocks(num) {
  colorsEl.innerHTML = "";

  // here is an example of a loop that is used to create the blocks of color depending on you choice ie 6 or 9, however you need to add event listeners
  for (var i = 0; i < num; i++) {
    var block = document.createElement("div");
    block.classList.add("colors__block");
    colorsEl.appendChild(block);
  }
  colorsBlocks = document.querySelectorAll(".colors__block");
  for (var i = 0; i < colorsBlocks.length; i++) {
    colorsBlocks[i].addEventListener("click", checkColors);
  }
}
