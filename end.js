var username = document.querySelector('#username')
var saveScoreBtn = document.querySelector('#saveScoreBtn')
var finalScore = document.querySelector('#finalScore')
var mostRecentScore = document.querySelector('#mostRecentScore')

var highScores = JSON.parse(localStorage.getItem('highScores')) || []

var MAX_HIGH_SCORES= 4

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    var score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })
    
    highScores.splice(4)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}