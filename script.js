const expand = document.getElementById("expand");

const numberOfWinners = document.getElementById("numberOfWinners");
const minNumber = document.getElementById("minNumber");
const maxNumber = document.getElementById("maxNumber");

const pick = document.getElementById("pick");
const reset = document.getElementById("reset");

const currentWinner = document.querySelector("main #result #winners #currentWinner #winner");
const winnersList = document.querySelector("#winnersList ol");

let availableNumbers;
let winners = [];
setMaxValue();

expand.addEventListener("click", (e) => {
    showHide();
});

numberOfWinners.addEventListener("input", (e) => {
    setMaxValue();
})
minNumber.addEventListener("input", (e) => {
    setMaxValue();
});
maxNumber.addEventListener("input", (e) => {
    setMaxValue();
});
maxNumber.addEventListener("input", (e) => {
    setMaxValue();
});



function setMaxValue() {
    let min = Number(minNumber.value);
    const max = Number(maxNumber.value);
    let nWinners = Number(numberOfWinners.value);

    minNumber.setAttribute("max", maxNumber.value);
    if (min > max) {
        minNumber.value = min = maxNumber.value - 1;
        if (Number(minNumber.value < 0)) {
            minNumber.value = min = 0;
        }
    }
    if (nWinners >= max) {
        numberOfWinners.value = nWinners = maxNumber.value;
    }

    const range = max - min + 1;
    if (isNaN(range) || range <= 2 && Number(numberOfWinners.value) > range) {
		numberOfWinners.value = range;
        return;
    }
    // Generates the array for the current rules
    availableNumbers = Array.from(new Array(range)).map((value, index) => {
        return min + index;
    });
    removeWinnersFromAvailableNumbers();
    console.log(availableNumbers);
}

function pickAWinner() {
    if (winners.length >= Number(numberOfWinners.value)) {
        return;
    }

    let winnerIndex = getRandomIndex(availableNumbers.length);
    let winner = availableNumbers[winnerIndex];

    console.log(`Número: ${winner} sorteado!!!`);
    showWinner(winner);

    removeWinnersFromAvailableNumbers();
}

function removeWinnersFromAvailableNumbers() {
    winners.forEach((winnerValue) => {
        if (availableNumbers.includes(winnerValue)) {
            const availableIndex = availableNumbers.indexOf(winnerValue);
            availableNumbers.splice(availableIndex, 1);
        }
    });
    console.clear();
    console.log("Winners: " + winners);
    console.log("Available: " + availableNumbers);
}

function getRandomIndex(length) {
    const random = Math.floor(Math.random() * (length));
    return random;
}

function showWinner(winner) {
    const newWinner = document.createElement("li");
    newWinner.innerHTML = `Nº ${winner}`;
    currentWinner.innerText = newWinner.innerText;

    winners.push(winner);
    winnersList.append(newWinner);
}

function resetAll() {
    winnersList.innerHTML = currentWinner.innerHTML = "";
    winners = [];
    setMaxValue();
}

function showHide() {
    const hints = document.getElementById("hints");
    hints.classList.toggle("expanded");
}