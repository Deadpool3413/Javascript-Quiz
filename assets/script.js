const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-buttons')
const quizIntroContainer = document.getElementById('quiz-intro')
const timer = document.getElementById('timer')

let shuffledQuestions, currentQuestionIndex
let quizTime = 100;
let scores = [];
let score = 0;
// scores.push(score);
let highScore = Math.max(...scores);

startButton.addEventListener('click', startGame);
answerButtonElement.addEventListener('click', selectAnswer);

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    quizIntroContainer.classList.add('hide')
    timer.innerText = 100;
    setTimer();
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setTimer() {
    var downloadTimer = setInterval(function(){

        if(quizTime <= 0){
            clearInterval(downloadTimer);
        }
        document.getElementById("timer").value = 1 - quizTime;
        quizTime -= 1;
    }, 1000);
}

function setNextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    const questionEl = document.querySelector('#question')
    const answerEl = document.querySelectorAll('.answer-btn')
    questionEl.textContent = question.question
    for (let index = 0; index < answerEl.length; index++) {
        const element = answerEl[index];
        element.textContent = question?.answer[index]?.text
    }
}

function selectAnswer() {
    // increase currentquestionindex by 1 in here, call setNextQuestion
    // question.index += question.index
    // question.index+=1
    question.index++
}

const questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answer: [
            { text: '<script>', correct: true },
            { text: '<javascript>', correct: false },
            { text: '<scripting>', correct: false },
            { text: '<js>', correct: false }
        ]
    },
    {
        question: 'How do you create a function in JavaScript?',
        answer: [
            { text: 'function:myFunction()', correct: false },
            { text: 'function = myFunction()', correct: false },
            { text: 'function myFunction()', correct: true },
            { text: 'const function = myFunction()', correct: false }
        ]
    },
    {
        question: 'A variable in JavaScript is declared with which of the following keyword?',
        answer: [
            { text: 'new', correct: true },
            { text: 'int', correct: false },
            { text: 'string', correct: false },
            { text: 'var', correct: false }
        ]
    },
    {
        question: 'What is 2 + 2?',
        answer: [
            { text: '4', correct: true },
            { text: '22', correct: false },
            { text: '100', correct: false },
            { text: '-4', correct: false }
        ]
    }
]

function selectAnswer (e) {
    if (questions[currentQuestionIndex].answer[0].correct){
        console.log(question.answer)
    }
}

// in answer bracket make an index for the question chosen by the user//
//code engineer//
