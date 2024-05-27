let jsonObj;

async function fetchData() {
  const response = await fetch('https://api.sampleapis.com/recipes/recipes')
  const json = await response.json()
  jsonObj = json.splice(0,36)
 
  const shuffleJsonObj = jsonObj.slice()
  for(let i = shuffleJsonObj.length-1; i >= 0; i--) {
    let random = Math.floor(Math.random()*36);
    [shuffleJsonObj[i], shuffleJsonObj[random]] =  [shuffleJsonObj[random], shuffleJsonObj[i]];
    console.log(shuffleJsonObj)
  } 
  shuffleJsonObj.slice(0,8).forEach(item => template(item.photoUrl, item.title, item.ingredients, item.totalTime, item.carbohydrate, item.protein, item.source))
}

fetchData()


  function template(photoUrl, title, ingredients, time, carbs, protein, source, ownRecipe) {
    const template = document.getElementById('card-template').content.cloneNode(true)
    template.querySelector('.card-img-top').src = photoUrl
    template.querySelector('.card-title').innerText = title
    template.querySelector('.card-text1').innerText = ingredients.substring(0, 100) + '...'
    template.getElementById('card-btn').href = source
    document.getElementById('card-random').appendChild(template)
    }
  