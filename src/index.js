document.addEventListener("DOMContentLoaded", init)

function init() {
  let target = document.getElementById("main_Title") // change to submit for form
      target.addEventListener('click', refreshPage)
  Pokemon.getAllPokemons()
  User.getUsers()
  User.renderLogin()
}

function refreshPage() {
  location.reload()
}
