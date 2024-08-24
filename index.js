let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
let operatorPressed = false;
let resultDisplayed = false; // Track if the result was just displayed
const expressionScreen = document.querySelector(".expression");
const resultScreen = document.querySelector(".result");

function buttonClick(value) {
  if (resultDisplayed) {
    resetCalculator(); // Clear display if result was shown
  }

  if (isNaN(parseInt(value)) && value !== ".") {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }

  rerender();
}

function handleNumber(value) {
  if (buffer === "0" || operatorPressed) {
    buffer = operatorPressed ? buffer + value : value;
    operatorPressed = false;
  } else {
    buffer += value;
  }
}

function handleDecimal() {
  if (!buffer.includes(".")) {
    buffer += ".";
  }
}

function handleMath(operator) {
  const intBuffer = parseFloat(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else if (!operatorPressed) {
    flushOperation(intBuffer);
  }
  previousOperator = operator;
  buffer += ` ${operator} `;
  operatorPressed = true;
}

function flushOperation(intBuffer) {
  switch (previousOperator) {
    case "+":
      runningTotal += intBuffer;
      break;
    case "-":
      runningTotal -= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
    case "÷":
      runningTotal /= intBuffer;
      break;
  }
}

function handleSymbol(symbol) {
  if (resultDisplayed && symbol !== "C") {
    resetCalculator(); // Clear display if result was shown and not resetting
  }

  switch (symbol) {
    case "C":
      resetCalculator();
      break;
    case "=":
      calculateResult();
      break;
    case ".":
      handleDecimal();
      break;
    case "%":
      handlePercentage();
      break;
    case "±":
      toggleNegative();
      break;
    case "←":
      handleBackspace();
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function handlePercentage() {
  buffer = (parseFloat(buffer) / 100).toString();
}

function toggleNegative() {
  if (buffer[0] === "-") {
    buffer = buffer.slice(1);
  } else {
    buffer = "-" + buffer;
  }
}

function resetCalculator() {
  buffer = "0";
  runningTotal = 0;
  previousOperator = null;
  operatorPressed = false;
  resultDisplayed = false;
  resultScreen.innerText = "";
}

function calculateResult() {
  if (previousOperator === null || operatorPressed) return;

  flushOperation(parseFloat(buffer.split(" ").pop()));
  buffer += ` =`;
  resultScreen.innerText = runningTotal.toString();
  previousOperator = null;
  operatorPressed = false;
  resultDisplayed = true; // Set flag when result is displayed
}

function handleBackspace() {
  if (operatorPressed) {
    buffer = buffer.slice(0, -3); // Remove the operator and surrounding spaces
    operatorPressed = false;
  } else {
    buffer = buffer.length > 1 ? buffer.slice(0, -1) : "0";
  }
}

function rerender() {
  expressionScreen.innerText = buffer;
  if (!operatorPressed && buffer.includes("=")) {
    resultScreen.innerText = runningTotal.toString();
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", (event) => buttonClick(event.target.innerText));
}

init();
