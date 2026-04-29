const listOfDrawnNumbers = [];
const limitNumber = 10;
let secretNumber = generateRandomNumber();
let attempts = 1;

function displayTextOnScreen(tag, texto) {
  const field = document.querySelector(tag);
  field.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

function displayInitialMessage() {
  displayTextOnScreen("h1", "Jogo do número secreto");
  displayTextOnScreen("p", "Escolha um número entre 1 e 10");
}

displayInitialMessage();

document.querySelector("#kick").addEventListener("click", (event) => {
    event.preventDefault(); 
    const kick = document.querySelector("input").value;

  if (kick == secretNumber) {
    displayTextOnScreen("h1", "Acertou!");
    const wordTry = attempts > 1 ? "tentativas" : "tentativa";
    const messageAttempts = `Você descobriu o número secreto com ${attempts} ${wordTry}!`;
    displayTextOnScreen("p", messageAttempts);
    document.getElementById("restart").removeAttribute("disabled");
  } else {
    if (kick > secretNumber) {
      displayTextOnScreen("p", "O número secreto é menor");
    } else {
      displayTextOnScreen("p", "O número secreto é maior");
    }
    attempts++;
    clearField();
  }
});

function generateRandomNumber() {
  const selectedNumber = parseInt(Math.random() * limitNumber + 1);
  const numberOfItemsInTheList = listOfDrawnNumbers.length;

  if (numberOfItemsInTheList == limitNumber) {
    listOfDrawnNumbers = [];
  }
  if (listOfDrawnNumbers.includes(selectedNumber)) {
    return generateRandomNumber();
  } else {
    listOfDrawnNumbers.push(selectedNumber);
    console.log(listOfDrawnNumbers);
    return selectedNumber;
  }
}

function clearField() {
  const kick = document.querySelector("input");
  kick.value = "";
}

function restartGame() {
  secretNumber = generateRandomNumber();
  clearField();
  attempts = 1;
  displayInitialMessage();
  document.getElementById("restart").setAttribute("disabled", true);
}
