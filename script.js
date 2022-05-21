const expand = document.getElementById("expand");

const numberOfWinners = document.getElementById("numberOfWinners");
const minNumber = document.getElementById("minNumber");
const maxNumber = document.getElementById("maxNumber");

const pick = document.getElementById("pick");
const reset = document.getElementById("reset");

const currentWinner = document.querySelector("main #result #winners #currentWinner #winner");
const winnersList = document.querySelector("#winnersList ol");

let people;
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
    people = Array.from(new Array(range)).map((value, index) => {
        return min + index;
    });
    console.log(people);
}

function pickAWinner() {
    if (winners.length >= Number(numberOfWinners.value)) {
        return;
    }

    let winner;
    do {
        winner = getRandomIntBetweenTwoInts(Number(minNumber.value), Number(maxNumber.value) + 1);
    } while (winners.includes(winner) && winners.length < Number(numberOfWinners.value))

    console.log(`Número: ${winner} sorteado!!!`);
    showWinner(winner);

    // Removes the winner index from people's array
    people.forEach((value, index)=> {
        if (value === winner) {
            people.splice(index, 1);
            console.log(people);
            return;
        }
    });
}

function getRandomIntBetweenTwoInts(minInt, maxInt) {
    const random = Math.floor(Math.random() * (maxInt - minInt)) + minInt;
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
}

function showHide() {
    const hints = document.getElementById("hints");
    hints.classList.toggle("expanded");
}