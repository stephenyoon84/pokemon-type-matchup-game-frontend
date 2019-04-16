document.addEventListener("DOMContentLoaded", () => {
  // PokemonController.renderCards
  // renderUserSignin()
  renderCards();
  User.getUser(1)
  let target = document.getElementById("targetPokemon")
  target.addEventListener('click', renderCards)
})

function renderCards(){
  let targetPokemon = document.getElementById('targetPokemon');
  targetPokemon.innerHTML = ""
  let answerDiv = document.getElementById('answerDiv');
  answerDiv.innerHTML = ""

  Pokemon.getRandomPokemon()
  Pokemon.renderAnswersContainer()
}
