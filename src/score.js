class Score {
  static allScores
  static BASE_URL = "http://localhost:3000/scores/"

  constructor(userId, score) {
    this.user_id = userId
    this.user_score = score
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
    let finalScore = parseInt(document.getElementById('score_Display').innerText)
    // debugger
    let obj = {user_id: userId, user_score: finalScore}
    Score.addScore(obj)
  }

  static getOrederdScores(){
    return fetch(Score.BASE_URL).then(r => r.json()).then(d => d.sort(function(a, b){return parseInt(b.user_score) - parseInt(a.user_score)}))
  }

  static renderRank(arr){
    let targetContainer = document.getElementById('targetPokemon');
    targetContainer.innerHTML = "";
    let ol = document.createElement('ol');
    for (let i = 0; i < 10; i++){
      let li = document.createElement('li');
      li.innerText = `${User.getUserNameById(parseInt(arr[i].user_id))} - ${arr[i].user_score}`
      ol.appendChild(li)
    }
    targetContainer.appendChild(ol)
  }

}
