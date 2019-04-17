class Pokemon {

  static BASE_URL = "http://localhost:3000/pokemons/"
  static typeObj = {
     'grass': ["fire", "ice", 'poison', 'flying', 'bug']
   , 'rock': ["water", 'grass', 'fight', 'ground', 'steel']
   , 'ice': ["fire", 'fight', 'rock', 'steel']
   , 'dragon': ["ice", 'dragon', 'fairy']
   , 'dark': ["fight", 'bug', 'fairy']
   , 'psychic': ["bug", 'ghost', 'dark']
   , 'bug': ["fire", 'flying', 'rock']
   , 'flying': ["electric", 'ice', 'rock']
   , 'steel': ["fire", 'fight', 'ground']
   , 'fire': ["water", 'ground', 'rock']
   , 'fight': ["flying", 'psychic', 'fairy']
   , 'ground': ["water", 'grass', 'ice']
   , 'ghost': ["ghost", 'dark']
   , 'poison': ["ground", 'psychic']
   , 'water': ["electric", 'grass']
   , 'fairy': ["poison", 'steel']
   , 'electric': ["ground"]
   , 'normal': ["fight"]}

   //returns promise.
  static getPokemon(id){
    return fetch(this.BASE_URL+id)
    .then(r=>r.json())
  }

  static getAllPokemons(){
    return fetch(this.BASE_URL)
    .then(r=>r.json())
  }

  static filterPokemonByType(type) {
    return Pokemon.getAllPokemons()
    .then(pokemon=> {
      pokemon.filter((pokemons)=> pokemons.type1 === type || pokemons.type2 === type)
    }).then(pokemon=> {
      debugger
    })
  }

  // render random target pokemon.
  static getRandomPokemon() {
    let randomNum = Math.round(Math.random() * (803 - 1) + 1);
    return Pokemon.getPokemon(randomNum)
    .then(pokemon => Pokemon.renderTarget(pokemon))
  }

  static getNotAnswerType(type) {
    let arrayOfTypes = this.typeObj[type]
    let newObj = {...Pokemon.typeObj}
    arrayOfTypes.forEach(type => delete newObj[type])
    let wrongTypes =  Object.keys(newObj)
    return wrongTypes[Math.floor(Math.random() * wrongTypes.length)]
  }

  // render 4 random options.
  static renderOptions() {
    let answerDiv = document.getElementById('answerDiv')

    for (let i=0; i<4;i++) {

      let randomNum = Math.round(Math.random() * (803 - 1) + 1);

      Pokemon.getPokemon(randomNum).then(pokemon => {
        Pokemon.renderSingleOption(pokemon)
      })
    }


  }

  static test() {
    console.log("connected")
  }

  // helper method to render target pokemon.
  static renderTarget(pokemon){
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

  // helper method to render option.
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

  static renderCards(){
    let targetPokemon = document.getElementById('targetPokemon');
        targetPokemon.innerHTML = ""
    let answerDiv = document.getElementById('answerDiv');
        answerDiv.innerHTML = ""

    Pokemon.getRandomPokemon()
    Pokemon.renderOptions()

  }
}
