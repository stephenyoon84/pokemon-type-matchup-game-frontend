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
    let obj = {user_id: userId, user_score: finalScore}
    Score.addScore(obj)
    Score.allScores.push(obj)
  }

  static resetScore(){
    let finalScore = document.getElementById('score_Display')
    finalScore.innerText = "0"
  }

  static getAllScores(){
    fetch(Score.BASE_URL).then(r => r.json()).then(d => Score.allScores = d)
  }

  static getOrderedScores(){
    return Score.allScores.sort(function(a, b){return parseInt(b.user_score) - parseInt(a.user_score)})
  }

  static renderRank(arr){
    let targetContainer = document.getElementById('targetPokemon');
        targetContainer.innerHTML = "";
    let ol = document.createElement('ol');
    console.log(arr)
    for (let i = 0; i < 10; i++){
      let li = document.createElement('li');
      li.innerText = `${User.getUserById(parseInt(arr[i].user_id)).name} - ${arr[i].user_score}`
      ol.appendChild(li)
    }
    targetContainer.appendChild(ol)
  }

  static renderBestScore(){

    let userId = parseInt(document.getElementById('username_Display').dataset.id);
    let finalScore = parseInt(document.getElementById('score_Display').innerText)
    let obj = {user_id: userId, user_score: finalScore}
    let user = User.getUserById(userId);
    let userScores = user ? user.scores : [{user_score: finalScore}];
        userScores.push(obj)
    let bestScore = Math.max.apply(Math, userScores.map(e => e.user_score));
    let targetDiv = document.getElementById('answerDiv');
        targetDiv.innerHTML = "";
    let h4 = document.createElement('h4');
        h4.innerText = `Your best score is ${bestScore}`;
    targetDiv.appendChild(h4);
  }

}
