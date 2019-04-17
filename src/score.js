class Score {
  static allScores
  static BASE_URL = "http://localhost:3000/scores/"

  constructor(userId, score) {
    this.user_id = parseInt(userId)
    this.score = score
  }

  static addScore(score) {
    let option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(score)
    }
    fetch(Score.BASE_URL, option)
    .then(r=>r.json())
  }

  static getFinalScore() {
    let userId = document.getElementById('username_Display').dataset.id
    let finalScore = document.getElementById('score_Display').innerText
    let obj = {user_id: userId, score: finalScore}
    Score.addScore(obj)
  }

}
