const display = document.getElementById("display");
const historyList = document.getElementById("historyList");
const themeSwitch = document.getElementById("themeSwitch");

let history = [];

/* Calculator Functions */
function appendValue(val) { display.value += val; }
function clearDisplay() { display.value = ""; }
function deleteLast() { display.value = display.value.slice(0, -1); }

function calculate() {
    const expression = display.value.trim();

    // If no input, do nothing
    if (expression === "") return;

    try {
        const result = eval(expression);

        // If result is undefined or NaN, do nothing
        if (result === undefined || isNaN(result)) return;

        display.value = result;
        addHistory(`${expression} = ${result}`);
    } catch {
        display.value = "Error";
    }
}


/* History */
function addHistory(entry) {
    history.unshift(entry);
    renderHistory();
}
function renderHistory() {
    historyList.innerHTML = "";
    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        li.onclick = () => display.value = item.split("=")[1].trim();
        historyList.appendChild(li);
    });
}

/* Keyboard Support */
document.addEventListener("keydown", (e) => {
    if (/[0-9+\-*/.%]/.test(e.key)) appendValue(e.key);
    if (e.key === "Enter") calculate();
    if (e.key === "Backspace") deleteLast();
    if (e.key === "Escape") clearDisplay();
});

/* Theme Toggle */
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeSwitch.checked = true;
}

themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});
