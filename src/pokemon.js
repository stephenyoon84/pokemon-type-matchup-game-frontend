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
  static allPokemons = []
  static getAllPokemons(){
    return fetch(this.BASE_URL)
    .then(r=>r.json())
    .then(r=>{this.allPokemons = r})
  }

  //returns array of pokemon of that type
  static filterPokemonByType(type) {
    return this.allPokemons.filter((pokemons) => pokemons.type1 === type || pokemons.type2 === type)
  }

  // return random pokemon obj
  static getRandomPokemon() {
    let randomNum = Math.round(Math.random() * (803 - 1) + 1);
    return Pokemon.allPokemons[randomNum]
  }

  static getTargetType(){
    return document.getElementById('targetPokemon-type').innerText.toLowerCase()
  }

  static getTargetWeakness(type){
    return Pokemon.typeObj[type]
  }

  static getWeaknessArray() {
    let targetType = Pokemon.getTargetType()
    let weaknessArray = Pokemon.getTargetWeakness(targetType)
    return weaknessArray
  }

  static getPokemon(array) {
    let randWeaknessType = array[Math.floor(Math.random() * array.length)]
    let arrayPokemonWeakness= Pokemon.filterPokemonByType(randWeaknessType)
    return arrayPokemonWeakness[Math.floor(Math.random() * arrayPokemonWeakness.length)]
  }

  static getAnswerPokemon() {
    let weaknessArray = Pokemon.getWeaknessArray()
    return Pokemon.getPokemon(weaknessArray)
  }

  static getNotAnswerPokemon() {
    let newObj = {...Pokemon.typeObj}
    let weaknessArray = Pokemon.getWeaknessArray().forEach(type => delete newObj[type])
    return Pokemon.getPokemon(Object.keys(newObj))
  }

  static renderCards(){
    let targetPokemon = document.getElementById('targetPokemon');
        targetPokemon.innerHTML = ""
    let answerDiv = document.getElementById('answerDiv');
        answerDiv.innerHTML = ""
    Pokemon.renderTarget(Pokemon.getRandomPokemon())
    Pokemon.renderOptions()
  }
  // render 4 random options.
  static renderOptions() {
    let answerDiv = document.getElementById('answerDiv')
    let randNum = Math.round(Math.random() * 3);
    for (let i=0; i<4;i++) {
      if (i === randNum){
        Pokemon.renderSingleOption(Pokemon.getAnswerPokemon(), true)
      } else {
        Pokemon.renderSingleOption(Pokemon.getNotAnswerPokemon())
      }
    }
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
  static renderSingleOption(pokemon, answer = false) {
    let answerDiv = document.getElementById('answerDiv')
    let img = document.createElement('img')
        img.src = pokemon.image_url
        img.classList.add('optionImg')
    let nameDiv = document.createElement('div')
        nameDiv.innerText = pokemon.name
    let type1Div = document.createElement('div')
        type1Div.innerText = pokemon.type1
    let type2Div = document.createElement('div')
        type2Div.innerText = pokemon.type2
    let answerOption = document.createElement('div')
        answerOption.classList.add('optionDiv')
        answerOption.dataset.answer = answer;
        answerOption.addEventListener('click', Pokemon.checkResult)

    answerOption.append(nameDiv, img, type1Div, type2Div)
    answerDiv.appendChild(answerOption)
  }

  static checkResult(e) {
    let check = e.currentTarget.dataset.answer
    check === 'true' ?  User.increaseScore() : User.decreaseLife()
  }

}
