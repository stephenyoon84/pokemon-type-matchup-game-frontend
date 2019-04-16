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

  static getTopTen() {
    // User.all.
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

  static getUser(id) {
    fetch(User.BASE_URL+id)
    .then(r=>r.json())
    .then(user=> User.renderUser(user))

  }
  static renderUser(user) {
    let usernameDisplay = document.getElementById('username_Display')
        usernameDisplay.innerText = user.name
        usernameDisplay.dataset.id = user.id
  }


}
