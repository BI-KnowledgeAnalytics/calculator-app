let display = document.getElementById('display');
let currentValue = '0';
let previousValue = '';
let operation = null;
let waitingForOperand = false;

function updateDisplay() {
    display.textContent = currentValue;
}

function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operation = null;
    waitingForOperand = false;
    updateDisplay();
}

function deleteLast() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

function appendNumber(num) {
    if (waitingForOperand) {
        currentValue = num;
        waitingForOperand = false;
    } else {
        if (currentValue === '0' && num !== '.') {
            currentValue = num;
        } else if (num === '.' && currentValue.includes('.')) {
            return;
        } else {
            currentValue += num;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operation !== null && !waitingForOperand) {
        calculate();
    }
    
    previousValue = currentValue;
    operation = op;
    waitingForOperand = true;
}

function calculate() {
    if (operation === null || waitingForOperand) {
        return;
    }
    
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result;
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                currentValue = 'Error';
                operation = null;
                updateDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentValue = String(result);
    operation = null;
    waitingForOperand = true;
    updateDisplay();
}
