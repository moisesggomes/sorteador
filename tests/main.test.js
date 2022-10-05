import { test, expect } from "vitest"
import { showHide, adjustValues, getInputInt, getRandomIndex, resetAll } from "../src/main.js"

test("Toggles the class 'expanded' for HTML element", () => {
    showHide();
    expect(document.querySelector("#hints").classList.length).toBe(1);
    
    showHide();
    expect(document.querySelector("#hints").classList.length).toBe(0);
});

test("Get integer from input", () => {
    const input = document.createElement("input");
    input.value = "23";
    expect(getInputInt(input)).toBe(23);
});

test("Respect limits for minimum number, maximum number and number of winners", () => {
    const values = {
        min: 10,
        max: 9,
        nWinners: 15
    };
    expect(adjustValues(values.min, values.max, values.nWinners)).toEqual({ min: 9, max: 9, nWinners: 1 });
})