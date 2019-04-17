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

  static getAnswerPokemon() {
    let targetType = Pokemon.getTargetType()
    let weaknessArry = Pokemon.getTargetWeakness(targetType)
    let randWeaknessType = weaknessArry[Math.floor(Math.random() * weaknessArry.length)]
    let arrayPokemonWeakness= Pokemon.filterPokemonByType(randWeaknessType)
    let randAnswerPokemon = arrayPokemonWeakness[Math.floor(Math.random() * arrayPokemonWeakness.length)]
    console.log(randAnswerPokemon)
    return randAnswerPokemon
  }

  static getNotAnswerPokemon() {
    let targetType = Pokemon.getTargetType()
    let weaknessArry = Pokemon.getTargetWeakness(targetType)
    let newObj = {...Pokemon.typeObj}
    weaknessArry.forEach(type => delete newObj[type])
    let wrongTypes =  Object.keys(newObj)
    let randOkPokemonType = wrongTypes[Math.floor(Math.random() * wrongTypes.length)]
    let randOkPokemonArray = Pokemon.filterPokemonByType(randOkPokemonType)
    let randOkPokemon = randOkPokemonArray[Math.floor(Math.random() * randOkPokemonArray.length)]
    return randOkPokemon
  }

  //   return wrongTypes[Math.floor(Math.random() * wrongTypes.length)]
  // }

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
        console.log(randNum)
        Pokemon.renderSingleOption(Pokemon.getAnswerPokemon())
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
