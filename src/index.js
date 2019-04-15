document.addEventListener("DOMContentLoaded", () => {
  // PokemonController.renderCards
  renderCards();
})

function renderCards(){
  let container = document.getElementById('container');
  let questionDiv = document.createElement('div');
  questionDiv.style.backgroundColor = 'yellow'
  let targetHeader = document.createElement('div');
  targetHeader.classList.add('parent');
  let nameDiv = document.createElement('div');
  nameDiv.id = "targetPokemon-name"
  nameDiv.classList.add('child');
  nameDiv.innerText = "Pikachu";
  let typeDiv = document.createElement('div');
  typeDiv.id = "targetPokemon-type"
  typeDiv.classList.add('child');
  typeDiv.innerText = "Electric"
  targetHeader.append(nameDiv, typeDiv);
  let img = document.createElement('img');
  img.id = "targetPokemon-img"
  img.src = "http://www.pngmart.com/files/2/Pikachu-PNG-HD.png"
  questionDiv.append(targetHeader, img)
  container.append(questionDiv)
}
