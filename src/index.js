document.addEventListener("DOMContentLoaded", () => {
  // PokemonController.renderCards
  renderCards();
})

function renderCards(){
  renderTarget()
  renderAnswersContainer()
}

function renderTarget(){
  let container = document.getElementById('container');
  let questionDiv = document.createElement('div');
      questionDiv.id = "targetPokemon"
      questionDiv.style.backgroundColor = 'yellow'
  let targetHeader = document.createElement('div');
      targetHeader.classList.add('parent');
  let nameH4 = document.createElement('h4');
      nameH4.id = "targetPokemon-name"
      nameH4.classList.add('child');
      nameH4.innerText = "Pikachu";
  let typeH4 = document.createElement('h4');
      typeH4.id = "targetPokemon-type"
      typeH4.classList.add('child');
      typeH4.innerText = "Electric"
  let img = document.createElement('img');
      img.id = "targetPokemon-img"
      img.src = "http://www.pngmart.com/files/2/Pikachu-PNG-HD.png"

  targetHeader.append(nameH4, typeH4);
  questionDiv.append(targetHeader, img)
  container.append(questionDiv)
}

function renderAnswersContainer(){
  let container = document.getElementById('container');
  let answerDiv = document.createElement('div')
      answerDiv.classList.add('answerDiv', 'parent')
  container.append(answerDiv)
  renderOptions()
}

function renderOptions() {
  let answerDiv = document.querySelector('div.answerDiv')
  for (let i = 0; i<4;i++) {
    let img = document.createElement('img')
        img.src = "http://www.pngmart.com/files/2/Pikachu-PNG-HD.png"
        img.classList.add('optionImg')
    let nameDiv = document.createElement('div')
        nameDiv.innerText = 'Pikachu'
    let typeDiv = document.createElement('div')
        typeDiv.innerText = "Electric"
    let answerOption = document.createElement('div')
        answerOption.classList.add('optionDiv')
        answerOption.dataset.optionId = i
    answerOption.append(nameDiv, typeDiv, img)
    answerDiv.appendChild(answerOption)
  }
}
