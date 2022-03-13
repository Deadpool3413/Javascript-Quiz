// ------------------ Variables ------------------
let shuffledQuestions, currentQuestionIndex;
let quizTime = 100;
// let scores = [];
// let score = 0;
let record = {};

// ------------------ Query/Node Selectors ------------------
const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');
const quizIntroContainer = document.getElementById('quiz-intro');
const timer = document.getElementById('timer');
const answerEl = document.getElementById('answer');
const score = document.getElementById('score');

const questionEl = document.querySelector('#question');
const answerButtonsEl = document.querySelectorAll('.answer-btn');

// ------------------ EVENT LISTENERS ------------------
startButton.addEventListener('click', startGame);

document
  .querySelectorAll('.answer-btn')
  .forEach((btn) => btn.addEventListener('click', () => selectAnswer(btn)));

// ------------------ Functions ------------------
function startGame() {
  startButton.classList.add('hide');
  quizIntroContainer.classList.add('hide');
  timer.innerText = 100;
  setTimer();
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setTimer() {
  const downloadTimer = setInterval(function () {
    quizTime--;
    timer.value = quizTime;
    if (currentQuestionIndex === 3 || quizTime <= 0) {
      clearInterval(downloadTimer);
    }
  }, 1000);
}

const setNextQuestion = () => {
  showQuestion(shuffledQuestions[currentQuestionIndex]);
};

const showQuestion = (question) => {
  questionEl.textContent = question.question;
  for (let index = 0; index < answerButtonsEl.length; index++) {
    const element = answerButtonsEl[index];
    if (element.classList.contains('wrong')) element.classList.remove('wrong');
    if (element.classList.contains('correct'))
      element.classList.remove('correct');

    element.value = question?.answer[index]?.correct;
    element.textContent = question?.answer[index]?.text;
  }
};

const gameOver = () => {
  alert('Quiz has ended');
  const username = window.prompt('Type your name here');
  record = { score: timer.value, name: username };
  localStorage.setItem(username, JSON.stringify(record));
  const latestScore = localStorage.getItem(username);
  console.log(latestScore, 'should be latest score');

  //   score.innerText = latestScore.score;
  score.value = latestScore.score;
  startGame();
};

function selectAnswer(btn) {
  if (btn.value === 'false') {
    btn.classList.add('wrong');
    quizTime -= 10;
  }
  if (btn.value === 'true') {
    btn.classList.add('correct');
  }

  if (currentQuestionIndex >= 3) {
    document
      .querySelectorAll('.answer-btn')
      .forEach((btn) => (btn.disabled = true));

    setTimeout(() => {
      quizTime -= quizTime;
      gameOver();
    }, 1000);

    return;
  }

  setTimeout(() => {
    currentQuestionIndex += 1;
    setNextQuestion();
  }, 1000);
}

const questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answer: [
      { text: '<script>', correct: true },
      { text: '<javascript>', correct: false },
      { text: '<scripting>', correct: false },
      { text: '<js>', correct: false },
    ],
  },
  {
    question: 'How do you create a function in JavaScript?',
    answer: [
      { text: 'function:myFunction()', correct: false },
      { text: 'function myFunction()', correct: true },
      { text: 'function = myFunction()', correct: false },
      { text: 'const function = myFunction()', correct: false },
    ],
  },
  {
    question:
      'A variable in JavaScript is declared with which of the following keyword?',
    answer: [
      { text: 'int', correct: false },
      { text: 'string', correct: false },
      { text: 'new', correct: false },
      { text: 'var', correct: true },
    ],
  },
  {
    question: 'What is 2 + 2?',
    answer: [
      { text: '22', correct: false },
      { text: '100', correct: false },
      { text: '-4', correct: false },
      { text: '4', correct: true },
    ],
  },
];