const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

const buttons = document.querySelectorAll(".buttons button");

const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const equalsButton = document.getElementById("equals");

let currentNumber = "";
let previousNumber = "";
let operator = "";


buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        const value = button.textContent;

        // Numbers
        if (
            value >= "0" &&
            value <= "9"
        ) {
            addNumber(value);
        }

        // Decimal
        else if (value === ".") {
            addDecimal();
        }

        // Operators
        else if (
            value === "+" ||
            value === "−" ||
            value === "×" ||
            value === "÷"
        ) {
            chooseOperator(value);
        }

    });

});


function addNumber(number) {

    if (currentNumber === "0") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }

    updateDisplay();
}


function addDecimal() {

    if (currentNumber.includes(".")) {
        return;
    }

    if (currentNumber === "") {
        currentNumber = "0";
    }

    currentNumber += ".";

    updateDisplay();
}


function chooseOperator(selectedOperator) {

    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber !== "" && previousNumber !== "") {
        calculate();
    }

    previousNumber = currentNumber;

    currentNumber = "";

    operator = selectedOperator;

    updateDisplay();
}


function calculate() {

    const firstNumber = parseFloat(previousNumber);
    const secondNumber = parseFloat(currentNumber);

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        return;
    }

    let result;

    if (operator === "+") {
        result = firstNumber + secondNumber;
    }

    else if (operator === "−") {
        result = firstNumber - secondNumber;
    }

    else if (operator === "×") {
        result = firstNumber * secondNumber;
    }

    else if (operator === "÷") {

        if (secondNumber === 0) {
            currentNumber = "Error";
            previousNumber = "";
            operator = "";

            updateDisplay();

            return;
        }

        result = firstNumber / secondNumber;
    }

    currentNumber = result.toString();

    previousNumber = "";

    operator = "";

    updateDisplay();
}


function updateDisplay() {

    currentDisplay.textContent =
        currentNumber || "0";

    previousDisplay.textContent =
        previousNumber + " " + operator;
}


clearButton.addEventListener("click", function() {

    currentNumber = "";
    previousNumber = "";
    operator = "";

    updateDisplay();

});


deleteButton.addEventListener("click", function() {

    currentNumber =
        currentNumber.slice(0, -1);

    updateDisplay();

});


equalsButton.addEventListener("click", function() {

    if (
        previousNumber !== "" &&
        currentNumber !== "" &&
        operator !== ""
    ) {
        calculate();
    }

});