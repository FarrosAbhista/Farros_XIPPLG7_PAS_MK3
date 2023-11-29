/// Deklarasi variabel
const moves = document.getElementById("moves-count");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let firstCard = null;
let secondCard = null;
let firstCardValue = null;

/// Gambar kartu
const items = [
  { name: "apel", image: "apple.png" },
  { name: "alpukat", image: "avocado.png" },
  { name: "pisang", image: "banana.png" },
  { name: "ceri", image: "cherry.png" },
  { name: "anggur", image: "grapes.png" },
  { name: "apel_hijau", image: "greenapple.png" },
  { name: "lemon", image: "lemon.png" },
  { name: "mangga", image: "mango.png" },
  { name: "jeruk", image: "orange.png" },
  { name: "nanas", image: "pineapple.png" },
  { name: "stroberi", image: "strawberry.png" },
  { name: "semangka", image: "watermelon.png" },
];

let movesCount = 0;
let winCount = 0;

/// menambah move dengan logika jika 2 kartu dibuka (sama atau tidak) akan bertambah 1 move
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span style="color: #0C356A;">Gerakan:</span>${movesCount}`;
};

/// 4x4 grid dan mengacak urutan kartu
const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

/// matriks kartu dan logika game
const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">
        <img src="apa.png" class="image-before"/>
        </div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched") && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else if (!secondCard) {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = null;
            secondCard = null;
            winCount += 1;
            if (winCount == Math.floor(cardValues.length / 2)) {
              stopGame();
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = null;
            secondCard = null;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        } else {
          // Kartu ketiga atau lebih, abaikan klik
          card.classList.remove("flipped");
        }
      }
    });
  });
};

/// Event listener untuk memulai permainan
startButton.addEventListener("click", () => {
  movesCount = 0;
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  moves.innerHTML = `<span style="color: #0C356A;">Gerakan:</span> ${movesCount}`;
  initializer();
});

/// event listener button kembali untuk menghentikan permainan
stopButton.addEventListener("click", () => {
  controls.classList.remove("hide");
  stopButton.classList.add("hide");
  startButton.classList.remove("hide");
});

/// ketika menang/semua kartu telah tertebak
function stopGame() {
  controls.classList.remove("hide");
  stopButton.classList.add("hide");
  startButton.classList.remove("hide");
  result.innerHTML = `<h2 style="color: #0C356A;">Selesai!</h2>
              <h4 style="color: #0C356A;">Total Gerakan: ${movesCount}</h4>`;
}

/// awal permainan semuanya netral
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  firstCard = null;
  secondCard = null;
  firstCardValue = null;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
