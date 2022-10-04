const expand = document.getElementById("expand");

const numberOfWinners = document.getElementById("numberOfWinners");
const minNumber = document.getElementById("minNumber");
const maxNumber = document.getElementById("maxNumber");

const pick = document.getElementById("pick");
const reset = document.getElementById("reset");

const currentWinner = document.querySelector("main #result #winners #currentWinner #winner");
const winnersList = document.querySelector("#winnersList ol");

let availableNumbers;
let pickedNumbers = [];

expand.addEventListener("click", (e) => {
    showHide();
});

numberOfWinners.addEventListener("input", (e) => {
    adjustValues();
})
minNumber.addEventListener("input", (e) => {
    adjustValues();
});
maxNumber.addEventListener("input", (e) => {
    adjustValues();
});
maxNumber.addEventListener("input", (e) => {
    adjustValues();
});

function showHide() {
    const hints = document.getElementById("hints");
    hints.classList.toggle("expanded");
}

function adjustValues() {
    const max = getInputInt(maxNumber);
    let min = getInputInt(minNumber);
    let nWinners = getInputInt(numberOfWinners);

    const performanceLimit = 1000000;
    if (max > performanceLimit) {
        maxNumber.value = performanceLimit;
    }
    
    if (min > max) {
        minNumber.value = min = max;
    }
    const range = max - min + 1;
    if (nWinners > range) {
		numberOfWinners.value = range;
    }
}

function getInputInt(input) {
    return Number(input.value);
}

function pickAWinner() {
    createCompetingNumbersList();
    if (pickedNumbers.length >= getInputInt(numberOfWinners)) {
        return;
    }
    let winnerIndex = getRandomIndex(availableNumbers.length);
    let winner = availableNumbers[winnerIndex];

    showWinner(winner);
    removeWinnersFromAvailableNumbers();
}

function createCompetingNumbersList() {
    const lowestNumber = getInputInt(minNumber);
    const count = getInputInt(maxNumber) - lowestNumber + 1;
    availableNumbers = Array.from(new Array(count)).map((value, index) => {
        return lowestNumber + index;
    });
    removeWinnersFromAvailableNumbers();
}

function getRandomIndex(length) {
    const random = Math.floor(Math.random() * (length));
    return random;
}

function showWinner(winner) {
    const newWinner = document.createElement("li");
    newWinner.innerHTML = currentWinner.innerHTML = `Nº ${winner}`;
    pickedNumbers.push(winner);
    winnersList.append(newWinner);
}

function removeWinnersFromAvailableNumbers() {
    pickedNumbers.forEach(removeIfIsWinner);
}

function removeIfIsWinner(winnerValue) {
    if (availableNumbers.includes(winnerValue)) {
        const valueIndex = availableNumbers.indexOf(winnerValue);
        availableNumbers.splice(valueIndex, 1);
    }
}

function resetAll() {
    winnersList.innerHTML = currentWinner.innerHTML = "";
    pickedNumbers = [];
}