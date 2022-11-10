import {
    test,
    expect,
    describe,
    beforeEach
} from "vitest";

import {
    globalScope,
    showHide,
    getInputInt,
    adjustValues,
    resetAll,
    showWinner,
    addWinner,
    removeFromAvailableNumbersIfWinner,
    removeWinnersFromAvailableNumbers,
    createCompetingNumbersList,
    getAvailableNumbers
} from "../src/main.js";

describe("Toggles the class 'expanded' for HTML element", () => {
    const className = "expanded";
    globalScope.hints.classList.remove(className);

    test("Adds class", () => {
        showHide();
        expect(hints.classList.contains(className)).toBe(true);
    });
    
    test("Removes class", () => {
        showHide();
        expect(hints.classList.contains(className)).toBe(false);
    })
});

test("Get integer from input", () => {
    const input = document.createElement("input");
    input.value = "23";
    expect(getInputInt(input)).toBe(23);
});

describe("Respect limits for minimum number, maximum number and number of winners", () => {
    const {
        PERFORMANCE_LIMIT,
        minNumber,
        maxNumber,
        numberOfWinners
    } = globalScope;

    beforeEach(() => {
        minNumber.value = 1;
        maxNumber.value = 5;
    });

    test("Respects the PERFORMANCE_LIMIT", () => {
        adjustValues(0, PERFORMANCE_LIMIT + 1, 0);
        expect(getInputInt(maxNumber)).toBe(PERFORMANCE_LIMIT);
    });

    test("minNumber respects maxNumber boundary", () => {
        adjustValues(11, 5, 0);
        expect(getInputInt(minNumber)).toBe(5);
    });

    test("numberOfWinners is set correctly", () => {
        let min = 3;
        let max = 5;
        let nWinners = 100;
        adjustValues(min, max, nWinners);
        expect(getInputInt(numberOfWinners)).toBe(max - min + 1);
    });
});

test("resetAll function work as intended", () => {
    const { pickedNumbers } = globalScope;

    pickedNumbers.push(1);
    pickedNumbers.push(2);
    pickedNumbers.push(3);
    resetAll();

    expect(pickedNumbers.length).toBe(0);
});

test("Shows new picked number", () => {
    resetAll();

    const [{ currentWinner, winnersList }, winner1, winner2] = [globalScope, 5, 67];

    showWinner(winner1);
    expect(currentWinner.innerHTML).toBe(`Nº ${winner1}`);
    expect(winnersList.children.length).toBe(1);
    expect(winnersList.children[winnersList.children.length - 1].innerHTML).toBe(`Nº ${winner1}`);

    showWinner(winner2)
    expect(currentWinner.innerHTML).toBe(`Nº ${winner2}`);
    expect(winnersList.children.length).toBe(2);
    expect(winnersList.children[winnersList.children.length - 1].innerHTML).toBe(`Nº ${winner2}`);
});

test("Adds new picked number to pickedNumbers array", () => {
    resetAll();

    const { pickedNumbers } = globalScope;
    const number = 10;
    addWinner(number);

    expect(pickedNumbers.includes(number)).toBe(true);
});

test("Removes new picked number from availableNumbers array", () => {
    resetAll();
    const { availableNumbers } = globalScope;
    availableNumbers.length = 0;
    for (let i = 0; i < 5; i++) availableNumbers[i] = i + 1;

    expect(availableNumbers.includes(4)).toBe(true);
    removeFromAvailableNumbersIfWinner(4);
    expect(availableNumbers.includes(4)).toBe(false);
});

test("Updates availableNumbers array according to picked numbers", () => {
    resetAll();
    const { availableNumbers, pickedNumbers } = globalScope;
    availableNumbers.length = pickedNumbers.length = 0;
    for (let i = 0; i < 10; i++) availableNumbers[i] = i + 1;
    pickedNumbers[0] = 4;
    pickedNumbers[1] = 7;

    removeWinnersFromAvailableNumbers();

    expect(availableNumbers.includes(1)).toBe(true);
    expect(availableNumbers.includes(10)).toBe(true);
    expect(availableNumbers.includes(4)).toBe(false);
    expect(availableNumbers.includes(7)).toBe(false);
});

test("Creates availableNumbers array", () => {
    resetAll();
    const [ lowestNumber, highestNumber ] = [ 101, 200 ];
    const { minNumber, maxNumber } = globalScope;
    minNumber.value = lowestNumber;
    maxNumber.value = highestNumber;

    createCompetingNumbersList();
    const availableNumbers = getAvailableNumbers();

    expect(availableNumbers.length).toBe(highestNumber - lowestNumber + 1);
    expect(availableNumbers[0]).toBe(lowestNumber);
    expect(availableNumbers[availableNumbers.length - 1]).toBe(highestNumber);
});
