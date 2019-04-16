class Pokemon {

  static BASE_URL = "http://localhost:3000/pokemons/"
  static typeObj = {
     'grass': ["fire", "ice", 'poison', 'flying', 'bug']
   , 'rock': ["water", 'grass', 'fighting', 'ground', 'steel']
   , 'ice': ["fire", 'fighting', 'rock', 'steel']
   , 'dragon': ["ice", 'dragon', 'fairy']
   , 'dark': ["fighting", 'bug', 'fairy']
   , 'psychic': ["bug", 'ghost', 'dark']
   , 'bug': ["fire", 'flying', 'rock']
   , 'flying': ["electric", 'ice', 'rock']
   , 'steel': ["fire", 'fighting', 'ground']
   , 'fire': ["water", 'ground', 'rock']
   , 'fighting': ["flying", 'psychic', 'fairy']
   , 'ground': ["water", 'grass', 'ice']
   , 'ghost': ["ghost", 'dark']
   , 'poison': ["ground", 'psychic']
   , 'water': ["electric", 'grass']
   , 'fairy': ["poison", 'steel']
   , 'electric': ["ground"]
   , 'normal': ["fighting"]}

  static getPokemon(id){
    return fetch(this.BASE_URL+id)
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
        targetHeader.classList.add('parent', 'targetHeader');
    let nameH4 = document.createElement('h4');
        nameH4.id = "targetPokemon-name"
        nameH4.classList.add('child');
        nameH4.innerText = pokemon.name.toUpperCase();
    let typeH4 = document.createElement('h4');
        typeH4.id = "targetPokemon-type"
        typeH4.classList.add('child');
        typeH4.innerText = pokemon.type1.toUpperCase();
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

  static getRandomPokemonByType(type) { // type = target.type
    let types = this.typeObj[type]
    var randType = types[Math.floor(Math.random() * types.length)];
    return fetch(this.BASE_URL)
    .then(r=>r.json())
    .then(pokemons=> {
      let filtered = pokemons.filter(pokemon=> pokemon.type1 === randType || pokemon.type2 === randType)
      let answerId = filtered[Math.floor(Math.random() * filtered.length)].id
      Pokemon.getPokemon(answerId).then(pokemon => {
        console.log(pokemon)
        Pokemon.renderSingleOption(pokemon)
      })

    })
  }

  static renderOptions() {
    let answerDiv = document.getElementById('answerDiv')
    let randNum = Math.floor(Math.random() * 4)
    console.log(randNum)
    // let target = document.querySelector(`#targetPokemon-type`).innerText.toLowerCase()
    for (let i = 0; i<4;i++) {
      console.log(i)
      if (i === randNum) {
        console.log(i)
        debugger
        // Pokemon.insertAnswer()
        Pokemon.getRandomPokemonByType("grass")
      } else {
        let randomNum = Math.round(Math.random() * (803 - 1) + 1);
        Pokemon.getPokemon(randomNum).then(pokemon => {
          Pokemon.renderSingleOption(pokemon)
        })
      }
    }
  }

  // static insertAnswer() {
  //   let randNum = Math.floor(Math.random() * 4)
  //   let correctAnswer = document.querySelector(`.optionDiv[data-option-id="${randNum}"]`)
  //   debugger
  // }

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
    answerOption.append(img, typeDiv, nameDiv)
    answerDiv.appendChild(answerOption)
  }
}
