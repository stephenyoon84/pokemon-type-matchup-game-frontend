class Pokemon {

 static BASE_URL = "http://localhost:3000/pokemons/"

  static getPokemon(id){
    return fetch(Pokemon.BASE_URL+id)
    .then(r=>r.json())
  }

  static getRandomPokemon() {
    let randomNum = Math.round(Math.random() * (803 - 1) + 1);
    return Pokemon.getPokemon(randomNum)
    .then(pokemon => Pokemon.renderTarget(pokemon))
  }

  static renderTarget(pokemon){
    let container = document.getElementById('container');
    let questionDiv = document.getElementById('targetPokemon');
        questionDiv.dataset.id = pokemon.id
    let targetHeader = document.createElement('div');
        targetHeader.classList.add('parent');
    let nameH4 = document.createElement('h4');
        nameH4.id = "targetPokemon-name"
        nameH4.classList.add('child');
        nameH4.innerText = pokemon.name;
    let typeH4 = document.createElement('h4');
        typeH4.id = "targetPokemon-type"
        typeH4.classList.add('child');
        typeH4.innerText = pokemon.type1
    let img = document.createElement('img');
        img.id = "targetPokemon-img"
        img.src = pokemon.image_url

    targetHeader.append(nameH4, typeH4);
    questionDiv.append(targetHeader, img)
  }


  static renderAnswersContainer(){
    let container = document.getElementById('container');
    let answerDiv = document.getElementById('answerDiv')
        answerDiv.classList.add('answerDiv', 'parent')
    Pokemon.renderOptions()
  }

  static renderOptions() {
    let answerDiv = document.getElementById('answerDiv')
    for (let i = 0; i<4;i++) {
      let randomNum = Math.round(Math.random() * (803 - 1) + 1);
      Pokemon.getPokemon(randomNum).then(pokemon => {
        Pokemon.renderSingleOption(pokemon)
      })
    }
  }

  static renderSingleOption(pokemon) {
    let answerDiv = document.getElementById('answerDiv')
    let img = document.createElement('img')
        img.src = pokemon.image_url
        img.classList.add('optionImg')
    let nameDiv = document.createElement('div')
        nameDiv.innerText = pokemon.name
    let typeDiv = document.createElement('div')
        typeDiv.innerText = pokemon.type1
    let answerOption = document.createElement('div')
        answerOption.classList.add('optionDiv')
        answerOption.dataset.optionId = pokemon.id
    answerOption.append(nameDiv, typeDiv, img)
    answerDiv.appendChild(answerOption)
  }
}
