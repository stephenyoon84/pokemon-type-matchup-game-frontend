class User {
  static allUsers
  static BASE_URL = "http://localhost:3000/users/"

  constructor(user) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.scores = user.scores
  }

  static renderLogin(){
    console.log("let's create form")
    let formDiv = document.getElementById('targetPokemon');
    let form = document.createElement('form');
        form.id = "loginForm";
    let formH2 = document.createElement('h2');
        formH2.innerText = "Please input your username and email: "
    let nameInput = document.createElement('input');
        nameInput.placeholder = "Name";
        nameInput.id = "nameInput";
    let emailInput = document.createElement('input');
        emailInput.placeholder = "email";
        emailInput.id = "emailInput";
    let submit = document.createElement('button');
        submit.innerText = "Play";

    formDiv.append(formH2, form)
    form.addEventListener('submit', User.findOrCreateUser)
    form.append(nameInput, emailInput, submit);
  }

  static getUsers(){
    return fetch(User.BASE_URL).then(r => r.json()).then(d => {return User.allUsers = d})
  }

  static findUser(user) {
    return User.allUsers.find(u => u.name === user.name && u.email === user.email);
  }

  static addUser(user) {
    let option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(user)
    }
    fetch(User.BASE_URL, option)
    .then(r=>r.json())
    .then(user=> {
      let instance = new User(user)
      User.renderUser(instance)
    })
  }

  static renderLife(){
    let lifecontainer = document.getElementById('life-container')
    lifecontainer.innerHTML = `Life: <span id="life">5</span>`
  }

  static decreaseLife(){
    let life = document.getElementById('life');
    if (life.innerText === '0') {
      alert("game over") // render high score page
      // Score.addScore()
      Score.getFinalScore()
      Score.getOrederdScores().then(d => Score.renderRank(d))
      // let container = document.getElementById('container')
      // container.innerHTML = ""
    } else {
      life.innerText--
      Pokemon.renderCards()
      console.log('incorrect answer')
    }
  }

  static increaseScore(){
    let score = document.getElementById('score_Display');
    score.innerText = parseInt(score.innerText) + 100;
    console.log('correct answer')
    Pokemon.renderCards()
  }

  static findOrCreateUser(event){
    event.preventDefault()
    let name = document.getElementById('nameInput').value
    let email = document.getElementById('emailInput').value
    let obj = {name: name, email: email}
    if (name && email){
      if (User.findUser(obj)){
        User.renderUser(User.findUser(obj));
        Pokemon.renderCards();
        User.renderLife();
      }else{
        User.addUser(obj)
        Pokemon.renderCards();
        User.renderLife();
      }
    }else{
      alert("Please input");
    }
  }

  static renderUser(user) {
    let usernameDisplay = document.getElementById('username_Display')
        usernameDisplay.innerText = user.name
        usernameDisplay.dataset.id = user.id
  }

  static getUserNameById(idInput){
    return User.allUsers.find(u => u.id === idInput).name
  }
}
