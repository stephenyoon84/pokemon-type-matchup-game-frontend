class User {
  static all = []
  static BASE_URL = "http://localhost:3000/users/"

  constructor(user) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.scores = user.scores
    User.all.push(this)
  }

  static renderLogin(){
    console.log("let's create form")
    let formDiv = document.getElementById('targetPokemon');
    let form = document.createElement('form');
    form.id = "loginForm";
    let formH2 = document.createElement('h2');
    formH2.innerText = "Please input your username and email: "
    formDiv.append(formH2, form)
    let nameInput = document.createElement('input');
    nameInput.placeholder = "Name";
    nameInput.id = "nameInput";
    let emailInput = document.createElement('input');
    emailInput.placeholder = "email";
    emailInput.id = "emailInput";
    let submit = document.createElement('button');
    submit.innerText = "Play";
    form.addEventListener('submit', User.findOrCreateUser)
    form.append(nameInput, emailInput, submit);
  }
  // static getTopTen() {
  //   // User.all.
  // }
  static allUsers

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

  static findOrCreateUser(event){
    event.preventDefault()
    console.log("Hi")
    let name = document.getElementById('nameInput').value
    let email = document.getElementById('emailInput').value
    let obj = {name: name, email: email}
    if (name && email){
      if (User.findUser(obj)){
        User.renderUser(User.findUser(obj));
        Pokemon.renderCards();
      }else{
        User.addUser(obj)
        Pokemon.renderCards();
      }
    }else{
      alert("Please input");
    }
  }

  // static getUser(id) {
  //   fetch(User.BASE_URL+id)
  //   .then(r=>r.json())
  //   .then(user=> User.renderUser(user))
  // }

  static renderUser(user) {
    let usernameDisplay = document.getElementById('username_Display')
        usernameDisplay.innerText = user.name
        usernameDisplay.dataset.id = user.id
  }
}