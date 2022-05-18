const numberOfWinners = document.getElementById("numberOfWinners");
const minNumber = document.getElementById("minNumber");
const maxNumber = document.getElementById("maxNumber");
const pick = document.getElementById("pick");

let winners;

minNumber.addEventListener("input", (e) => {
    if (Number(minNumber.value) > Number(maxNumber.value)) {
        setMaxValue();
    }
});
maxNumber.addEventListener("input", (e) => {
    if (Number(maxNumber.value) > Number(numberOfWinners.value)) {
        setMaxValue();
    }
});
maxNumber.addEventListener("input", (e) => {
    setMaxValue();
});

function setMaxValue() {
    let min = Number(minNumber.value);
    let max = Number(maxNumber.value);
    const nWinners = Number(numberOfWinners.value);

    minNumber.setAttribute("max", maxNumber.value);
    if (min > max) {
        minNumber.value = min = maxNumber.value - 1;
        if (Number(minNumber.value < 0)) {
            minNumber.value = min = 0;
        }
    }
    if (max > nWinners) {
        maxNumber.value = max = numberOfWinners.value;
    }

    const range = max - min + 1;
    if (isNaN(range) || range == 0) {
        // alert("Desculpa, mas não consegui realizar o sorteio :(");
        return;
    }
    winners = Array.from(new Array(range)).map((value, index) => {
        return min + index;
    });
    console.log(winners);
}

function pickAWinner() {
    
}