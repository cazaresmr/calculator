let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
let operatorPressed = false;
const expressionScreen = document.querySelector(".expression");
const resultScreen = document.querySelector(".result");

function buttonClick(value) {
  isNaN(parseInt(value)) ? handleSymbol(value) : handleNumber(value);
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

function handleMath(operator) {
  const intBuffer = parseInt(buffer);
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
  switch (symbol) {
    case "C":
      resetCalculator();
      break;
    case "=":
      calculateResult();
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

function resetCalculator() {
  buffer = "0";
  runningTotal = 0;
  previousOperator = null;
  operatorPressed = false;
  resultScreen.innerText = "";
}

function calculateResult() {
  if (previousOperator === null || operatorPressed) return;

  flushOperation(parseInt(buffer.split(" ").pop()));
  buffer += ` =`;
  resultScreen.innerText = runningTotal.toString();
  previousOperator = null;
  operatorPressed = false;
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
