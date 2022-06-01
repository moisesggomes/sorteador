const style = getComputedStyle(document.body);

const navyBlue = style.getPropertyValue("--navy-blue");
const blueGrotto = style.getPropertyValue("--blue-grotto");
const babyBlue = style.getPropertyValue("--baby-blue");

const colors = [navyBlue, blueGrotto, babyBlue];

const title = document.getElementById("title");

title.addEventListener("click", (e) => {
    const text = title.innerText;

    const newText = createSpanElements(text);
    title.innerHTML = newText;

    for (let child of title.children) {
        if (child.innerText == " ") {
            continue;
        }
        child.style.color = getRandomColor();
    }
});

function createSpanElements(string) {
    let newText = "";

    for (let letter of string) {
        newText += `<span>${letter}</span>`;
    }

    return newText;
}

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * (colors.length - 0) + 0);
    return colors[randomIndex];
}