'use strict';

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function selectById(selector, parent = document) {
    return parent.getElementById(selector);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function create(element, parent = document) {
    return parent.createElement(element);
}

function print(...args) {
    console.log(args.join(', '));
}

let points = 0;
const scoreDisplay = selectById('score');
const userAnswer = selectById('userAnswer');
const question = selectById('question');
const submit = selectById('submit');
scoreDisplay.innerText = `score: ${points}`;
const opArr = ['+', '-', '*'];

function generateQuestion() {
    const numsArr = Array.from({ length: 10 }, (_, index) => index + 1);
    let randNum1 = Math.floor(Math.random() * numsArr.length);
    let randNum2 = Math.floor(Math.random() * numsArr.length);
    let randOp = Math.floor(Math.random() * opArr.length);
    question.innerText = `${randNum1} ${opArr[randOp]} ${randNum2}`;
    return { randNum1, randNum2, randOp };
}

let { randNum1, randNum2, randOp } = generateQuestion();

onEvent('click', submit, (event) => {
    event.preventDefault();
    let answer = parseFloat(userAnswer.value);
    let result;

    switch (opArr[randOp]) {
        case "+":
            result = randNum1 + randNum2;
            break;
        case "-":
            result = randNum1 - randNum2;
            break;
        default:
            result = randNum1 * randNum2;
            break;
    }

    if (result === answer) {
        points++;
    } else if (points > 0){
        points--;
    }

    userAnswer.value = '';
    scoreDisplay.innerText = `score: ${points}`;

    // Generate a new question after checking the answer
    ({ randNum1, randNum2, randOp } = generateQuestion());
});


