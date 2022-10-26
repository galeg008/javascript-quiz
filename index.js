var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the main use of Javascript?',
            choice1: 'to give the web page style',
            choice2: 'to give the web page structure',
            choice3: 'to make web pages interactive with elements that engage a user',
        answer: 3,
    },

    {
        question: 'How many data types are there in Javascript?',
            choice1: '3',
            choice2: '4',
            choice3: '7',
        answer: 3,
    },

    {
        question: 'Which is the correct way to declare a string?',
        choice1: 'var= string;',
        choice2: "var=('string');",
        choice3: 'var=(string)',
        answer: 2,
    },
    
    {
        question: 'What symbol do you use to concatenate',
        choice1: '-',
        choice2: '+',
        choice3: '/',
        answer: 2,
    },

    {
        question: 'What tag do we use to link a Javascript file to the HTML file?',
        choice1: 'script',
        choice2: 'var',
        choice3: 'prompt',
        answer: 1,
    }
]

var SCORE_POINTS = 25
var MAX_QUESTIONS = 4

// // select a html element and attach a varaible 
// var startScreen = document.get
// startScreen.setAttribute('class', 'hide')
// questionsElement.removeAttribute('class')
// score = setInterval(clock, 1000)

getQuestion()
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
   // currentQuestion = availableQuestions(questionsIndex)
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.innerText = currentQuestion ['choice'+ number]

    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'                 
            
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        
        }, 1000)

        })
    })

    incrementScore = num => {
        score +=num
        scoreText.innerText = score
    }
    
    startGame()