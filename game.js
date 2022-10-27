const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

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
        answer: 3
    },

    {
        question: 'How many data types are there in Javascript?',
            choice1: '3',
            choice2: '4',
            choice3: '7',
        answer: 3
    },

    {
        question: 'Which is the correct way to declare a string?',
        choice1: 'var= string;',
        choice2: "var=('string');",
        choice3: 'var=(string)',
        answer: 2
    },
    
    {
        question: 'What symbol do you use to concatenate',
        choice1: '-',
        choice2: '+',
        choice3: '/',
        answer: 2
    },

    {
        question: 'What tag do we use to link a Javascript file to the HTML file?',
        choice1: 'script',
        choice2: 'var',
        choice3: 'prompt',
        answer: 1
    }
];

const SCORE_POINTS = 25
const MAX_QUESTIONS = 4


startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion ['choice'+ number]

    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'                 
            
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion();
        
        }, 1000)

        })
    })

    incrementScore = num => {
        score +=num
        scoreText.innerText = score
    }
    
    startGame();