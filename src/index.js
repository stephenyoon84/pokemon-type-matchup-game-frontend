document.addEventListener("DOMContentLoaded", () => {
  // PokemonController.renderCards
  renderCards();
})

function renderCards(){
  Pokemon.getRandomPokemon()
  Pokemon.renderAnswersContainer()
}

// function renderAnswersContainer(){
//   let container = document.getElementById('container');
//   let answerDiv = document.createElement('div')
//       answerDiv.classList.add('answerDiv', 'parent')
//   container.append(answerDiv)
//   renderOptions()
// }
//
// function renderOptions() {
//   let answerDiv = document.querySelector('div.answerDiv')
//   for (let i = 0; i<4;i++) {
//     let img = document.createElement('img')
//         img.src = "http://www.pngmart.com/files/2/Pikachu-PNG-HD.png"
//         img.classList.add('optionImg')
//     let nameDiv = document.createElement('div')
//         nameDiv.innerText = 'Pikachu'
//     let typeDiv = document.createElement('div')
//         typeDiv.innerText = "Electric"
//     let answerOption = document.createElement('div')
//         answerOption.classList.add('optionDiv')
//         answerOption.dataset.optionId = i
//     answerOption.append(nameDiv, typeDiv, img)
//     answerDiv.appendChild(answerOption)
//   }
// }
