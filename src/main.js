const PERFORMANCE_LIMIT = 1000000;

const expand = document.getElementById("expand");
const hints = document.getElementById("hints");

const minNumber = document.getElementById("minNumber");
const maxNumber = document.getElementById("maxNumber");
const numberOfWinners = document.getElementById("numberOfWinners");

const pick = document.getElementById("pick");
const reset = document.getElementById("reset");

const currentWinner = document.querySelector("main #result #winners #currentWinner #winner");
const winnersList = document.querySelector("#winnersList ol");

let availableNumbers = [];
let pickedNumbers = [];

expand.addEventListener("click", (event) => showHide());

[numberOfWinners, minNumber, maxNumber].forEach(value => {
    value.addEventListener("input", event => adjustValuesDecorator(adjustValues)());
});

pick.addEventListener("click", event => pickAWinner());
reset.addEventListener("click", event => resetAll());

function showHide() {
    const hints = document.getElementById("hints");
    hints.classList.toggle("expanded");
}

function adjustValuesDecorator(fn) {
    return function() {
        const max = getInputInt(maxNumber);
        let min = getInputInt(minNumber);
        let nWinners = getInputInt(numberOfWinners);

        fn(min, max, nWinners);
    }
}

function adjustValues(min, max, nWinners) {
    if (max > PERFORMANCE_LIMIT) maxNumber.value = PERFORMANCE_LIMIT;
    if (min > max) minNumber.value = min = max;
    const range = max - min + 1;
    if (nWinners > range) numberOfWinners.value = nWinners = range;
}

function getInputInt(input) {
    return Number(input.value);
}

function pickAWinner() {
    createCompetingNumbersList();
    if (pickedNumbers.length >= getInputInt(numberOfWinners)) return;
    let winnerIndex = getRandomIndex(availableNumbers.length);
    let winner = availableNumbers[winnerIndex];

    showWinner(winner);
    addWinner(winner);
    removeWinnersFromAvailableNumbers();
}

function createCompetingNumbersList() {
    const lowestNumber = getInputInt(minNumber);
    const count = getInputInt(maxNumber) - lowestNumber + 1;
    availableNumbers = Array.from(new Array(count)).map((value, index) => lowestNumber + index);
    removeWinnersFromAvailableNumbers();
}

function getRandomIndex(length) {
    return Math.floor(Math.random() * (length));
}

function showWinner(winner) {
    const newWinner = document.createElement("li");
    newWinner.innerHTML = currentWinner.innerHTML = `Nº ${winner}`;
    winnersList.append(newWinner);
}

function addWinner(winner) {
    pickedNumbers.push(winner);
}

function removeWinnersFromAvailableNumbers() {
    pickedNumbers.forEach(removeFromAvailableNumbersIfWinner);
}

function removeFromAvailableNumbersIfWinner(winnerValue) {
    if (availableNumbers.includes(winnerValue)) {
        const valueIndex = availableNumbers.indexOf(winnerValue);
        availableNumbers.splice(valueIndex, 1);
    }
}

function resetAll() {
    winnersList.innerHTML = currentWinner.innerHTML = "";
    pickedNumbers.length = 0;
}


const globalScope = {
    PERFORMANCE_LIMIT,
    expand,
    hints,

    minNumber,
    maxNumber,
    numberOfWinners,

    pick,
    reset,

    currentWinner,
    winnersList,

    availableNumbers,
    pickedNumbers
};

export {
    globalScope,

    showHide,
    adjustValues,
    getInputInt,
    getRandomIndex,
    resetAll,

    pickAWinner,
    createCompetingNumbersList,
    showWinner,
    addWinner,
    removeWinnersFromAvailableNumbers,
    removeFromAvailableNumbersIfWinner
}

export function getAvailableNumbers() {
    return availableNumbers;
}