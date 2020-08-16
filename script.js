/*const buttonArr = [
  {
    code: 49,
    getId: document.getElementById('one'),
    val: 1,
    id: 'one'
  },
  {
    code: 50, getId: document.getElementById('two'), val: 2, id: 'two'},
  {
    code: 51, getId: document.getElementById('three'), val: 3, id: 'three'},
  {
    code: 52, getId: document.getElementById('four'), val: 4, id: 'four'},
  {
    code: 53, getId: document.getElementById('five'), shift: document.getElementById('percent'), val: 5, shiftVal: '%', id: 'five', altId: 'percent'},
  {
    code: 54, getId: document.getElementById('six'), val: 6, id: 'six'},
  {
    code: 55, getId: document.getElementById('seven'), val: 7, id: 'seven'},
  {
    code: 56, getId: document.getElementById('eight'), shift: document.getElementById('multiply'), val: 8, shiftVal: '&times;', id: 'eight', altId: 'multiply'},
  {
    code: 57, getId: document.getElementById('nine'), val: 9, id: 'nine'},
  {
    code: 48, getId: document.getElementById('zero'), val: 0, id: 'zero'},
  {
    code: 190, getId: document.getElementById('decimal'), val: '.', id: 'decimal'},
  {
    code: 8, getId: document.getElementById('bksp'), id: 'bksp'},
  {
    code: 27, getId: document.getElementById('clear'), id: 'clear'},
  {
    code: 120, getId: document.getElementById('plus-minus'), id: 'plus-minus'},
  {
    code: 191, getId: document.getElementById('divide'), val: '&divide;', id: 'divide'},
  {
    code: 189, getId: document.getElementById('subtract'), val: '&minus;', id: 'subtract'},
  {code: 187, getId: document.getElementById('equals'), shift: document.getElementById('add'), val: '=', shiftVal: '+', id: 'equals', altId: 'add'}
]
const keyPercent = buttonArr[4];
const keyMultiply = buttonArr[7];
const keyAdd = buttonArr[16];

window.addEventListener('keydown', (e) => {
  if (inputNums.innerHTML == 0 && !e.shiftKey && e.keyCode !== 190) {
    inputNums.innerHTML = '';
  }
  if(e.shiftKey) {
      if (e.keyCode === 53) {
        keyPercent.shift.classList.add('active');
        outputNums.innerHTML = keyPercent.shiftVal;
      } else if (e.keyCode === 56) {
        keyMultiply.shift.classList.add('active');
        outputNums.innerHTML = keyMultiply.shiftVal;
      } else if (e.keyCode === 187) {
        keyAdd.shift.classList.add('active');
        outputNums.innerHTML = keyAdd.shiftVal;
      }
    } else if (e.keyCode === 27) {
      inputNums.innerHTML = 0;
      outputNums.innerHTML = '';
    }
      else {
  for (let i = 0; i < buttonArr.length; i++) {
    if (buttonArr[i].code === e.keyCode) {
      buttonArr[i].getId.classList.add('active'); 
      if (i <= 9) {
      inputNums.innerHTML += buttonArr[i].val;
      } else if (i === 10) {
        if (inputNums.innerHTML.includes('.')) {
          
        } else {
          inputNums.innerHTML += buttonArr[i].val;
        }
      } else {
        outputNums.innerHTML = buttonArr[i].val;
      }
    }
  }
    }
});
window.addEventListener('keyup', (e) => {
  if(e.shiftKey) {
      if (e.keyCode === 53) {
        keyPercent.shift.classList.remove('active');
      } else if (e.keyCode === 56) {
        keyMultiply.shift.classList.remove('active');
      } else if (e.keyCode === 187) {
        keyAdd.shift.classList.remove('active');
      }
    } else {
  
  for (let j = 0; j < buttonArr.length; j++) {
    if (buttonArr[j].code === e.keyCode) {
      buttonArr[j].getId.classList.remove('active'); 
    }
  }
  }
  });
*/

const inputNums = document.getElementById("display");
const outputNums = document.getElementById("output-nums");
let inputCount = 0;
let outputArr = [];
let operatorArr = [
{val: '+', html: '+', '+': (a,b) => a + b}, 
{val: '-', html: '&#8722;', '-': (a, b) => a - b}, 
{val: '*', html: '&#215;', '*': (a, b) => a * b}, 
{val: '/', html: '/', '/': (a, b) => a / b}
]
let total = 0;
let equationArr = [];
let prevInput = [];

inputNums.innerHTML = 0;
const clearInput = () => {
  inputNums.innerHTML = 0;
  outputNums.innerHTML = '';
  outputArr = [];
  inputCount = 0;
  equationArr = [];
  total = 0;
  prevInput = [];
}


let clearCount = () => inputCount = 0;

const numInput = () => {
    if (prevInput.length < 2) {
    prevInput.push('num');
  } else {
    prevInput.shift();
    prevInput.push('num');
  }
  if (inputCount.toString().includes('.') && event.target.innerHTML == 0) {
    inputCount += event.target.innerHTML;
    inputNums.innerHTML = inputCount.toString();
  } else {
    if (inputNums.innerHTML.length < 16) {
      inputCount += event.target.innerHTML;
      inputNums.innerHTML = Number(inputCount).toString();
    } else {
      if (prevInput[0] !== 'num' && prevInput[0] !== 'decimal') {
        inputCount += event.target.innerHTML;
  inputNums.innerHTML = Number(inputCount).toString();
      }
    }
  }
}


const operatorFunc = () => {
  if (prevInput[0] === 'operator' && prevInput.length < 2) {
    outputArr.push()
  }
  if (prevInput[0] === 'num' || prevInput[0] === 'plusMinus' || prevInput[0] === 'percent') {
    outputArr.push(Number(inputCount));
    equationArr.push(Number(inputCount));
    clearCount();
    outputArr.push(event.target.innerHTML);
    for (let k = 0; k < operatorArr.length; k++) {
      if (operatorArr[k].html === event.target.innerHTML || operatorArr[k].html === '&#' + event.target.innerHTML.charCodeAt() + ';') {
        equationArr.push(operatorArr[k].val);
      }
    }
  } else if (prevInput[0] === 'operator') {
    outputArr.pop();
    equationArr.pop();
    outputArr.push(event.target.innerHTML);
    for (let l = 0; l < operatorArr.length; l++) {
      if (operatorArr[l].html === event.target.innerHTML || operatorArr[l].html === '&#' + event.target.innerHTML.charCodeAt() + ';') {
        equationArr.push(operatorArr[l].val);
      }
    } 
  } else if (prevInput[0] === 'equals') {
      outputArr = [total];
      equationArr = [total];
      if (prevInput[1] === 'operator') {
        outputArr.push(event.target.innerHTML)
        for (let n = 0; n < operatorArr.length; n++) {
          if (operatorArr[n].html === event.target.innerHTML || operatorArr[n].html === '&#' + event.target.innerHTML.charCodeAt() + ';') {
            equationArr.push(operatorArr[n].val);
          }
        } 
      }
  }
  for (let m = 0; m < operatorArr.length; m++) {
    if (operatorArr[m].hasOwnProperty(equationArr[1])) {
      
      total = operatorArr[m][equationArr[1]](equationArr[0], equationArr[2]);
    }
  }
  if (equationArr.length >= 4) {
    equationArr.splice(0, 3, Number(total));
    inputNums.innerHTML = Number(total);
  }
  outputNums.innerHTML = outputArr.join(' ');
}

const operatorInput = () => {
  if (prevInput.length < 2) {
    prevInput.push('operator');
  } else {
    prevInput.shift();
    prevInput.push('operator');
  }
  if (total > 9007199254740991) {
    total = 'too big';
    inputNums.innerHTML = total;
  } else {
    operatorFunc();
  }
}

const plusMinusInput = () => {
  if (prevInput.length < 2) {
    prevInput.push('plusMinus');
  } else {
    prevInput.shift();
    prevInput.push('plusMinus');
  }
  inputCount = (-inputCount).toString();
  inputNums.innerHTML = Number(inputCount);
}

const percentInput = () => {
  if (prevInput.length < 2) {
    prevInput.push('percent');
  } else {
    prevInput.shift();
    prevInput.push('percent');
  }
  
  if (prevInput[0] === 'num' || prevInput[0] === 'plusMinus') {
    outputArr.push(Number(inputCount));
    equationArr.push(Number(inputCount));
    clearCount();
    let lastInArr = outputArr[outputArr.length - 1];
    inputCount = (lastInArr / 100).toFixed(2);
    outputArr.pop(lastInArr);
    equationArr.pop(lastInArr);
    inputNums.innerHTML = inputCount;
  }
}

const decimalInput = () => {
  if (prevInput.length < 2) {
    prevInput.push('decimal');
  } else {
    prevInput.shift();
    prevInput.push('decimal');
  }
  if (inputNums.innerHTML.length < 16) {
    if (!inputCount.toString().includes('.')) {
      inputCount = inputCount + event.target.innerHTML;
    } else {
      inputCount = inputCount.toString();
    }

    inputNums.innerHTML = inputCount;
  }
}

const bkspInput = () => {
  inputCount = inputCount.toString();
  if (prevInput[0] === 'num') {
    if (inputCount.length <= 1) {
      inputCount = 0;
    } else {
      inputCount = inputCount.slice(0, -1);
    }
  } else if (prevInput[0] === 'operator') {}
    if (prevInput[1] === 'equals') {clearInput()};
  inputNums.innerHTML = inputCount;
}

const equalsInput = () => {
  if (prevInput.length < 2) {
    prevInput.push('equals');
  } else { 
    prevInput.shift();
    prevInput.push('equals');
  }
  operatorFunc();
  if (total > 9007199254740991) {
    total = 'too big'
    inputNums.innerHTML = total;
  } else {
    inputNums.innerHTML = total;
  }
  
}

const calculator = document.getElementById('calculator');
const equals = document.getElementById('equals');
const btn = document.querySelectorAll('.btn');
const darkTheme = document.getElementById('dark-theme');

let colorCount = 0;
const darkThemeToggle = () => {
  if (colorCount === 0) {
    calculator.classList.add('dark-body', 'dark-text');
    calculator.classList.remove('light-body', 'light-text');
    equals.classList.add('dark-equals');
    equals.classList.remove('light-equals');
    for (let p = 0; p < btn.length; p++) { btn[p].classList.add('dark-btn');
      btn[p].classList.remove('btn'); 
    }
    darkTheme.innerHTML = '<i class="fas fa-sun"></i>';
    darkTheme.style.color = 'rgba(214, 90, 49, 1)';
    colorCount = 1;
  } else {
    calculator.classList.add('light-body', 'light-text');
    calculator.classList.remove('dark-body', 'dark-text');
    equals.classList.add('light-equals');
    equals.classList.remove('dark-equals');
    for (let q = 0; q < btn.length; q++) { btn[q].classList.add('btn');
      btn[q].classList.remove('dark-btn'); 
    }
    darkTheme.innerHTML = '<i class="fas fa-moon"></i>';
    darkTheme.style.color = 'rgba(34, 40, 49, .8)';
    colorCount = 0;
  }
}

/*
  Reasoning for failing the following test:
  
  User Story #13: If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign). For example, if 5 + * 7 = is entered, the result should be 35 (i.e. 5 * 7); if 5 * - 5 = is entered, the result should be -25 (i.e. 5 x (-5)).
  
  Due to using a +/- operator that the initial project does not use, my calculator functions as expected. Altering the minus operator to also negate numbers would not make functional sense within the current layout of my calculator.
*/