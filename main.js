let jsonObj;

async function fetchData(url, ownRecipe) {
  const response = await fetch(url)
  const json = await response.json()
  jsonObj = json.splice(0,36)
  jsonObj.forEach(item => template(item.photoUrl, item.title, item.ingredients, item.totalTime, item.carbohydrate, item.protein, item.source, ownRecipe))
}


  function template(photoUrl, title, ingredients, time, carbs, protein, source, ownRecipe) {
    const template = document.getElementById('card-template').content.cloneNode(true)
    template.querySelector('.card-img-top').src = photoUrl
    template.querySelector('.card-title').innerText = title
    template.querySelector('.card-text1').innerText = ingredients.substring(0, 150) + '...'
    template.querySelector('.card-time').innerText = "Total cook time:  " + time + " min"
    template.querySelector('.card-carb').innerText = "Carbs:  " + carbs 
    template.querySelector('.card-pro').innerText = "Protein:  " + protein 
    template.getElementById('card-btn').href = source
    if(ownRecipe) {
      document.getElementById('card-list2').appendChild(template) 
    } else {
      document.getElementById('card-list').appendChild(template)
    }
  }

  fetchData('https://api.sampleapis.com/recipes/recipes', false)
  fetchData('http://localhost:3000/usersRecipe', true)

//sort by trends
  function sorByTrends() {
    let optValue = document.getElementById('categoryOptions').value  
    document.getElementById('card-list').innerHTML = ""
    let result;
    switch(optValue) {
      case 'Quick-dishes':
        let quickTop10Menu = [...jsonObj].sort((item1, item2) => item1.totalTime - item2.totalTime).slice(0, 10);
        result = quickTop10Menu.forEach(item => template(item.photoUrl, item.title, item.ingredients, item.totalTime, item.carbohydrate, item.protein, item.source));
        break;          
      case 'Low-carbs':
        let lowCarbsMenu = [...jsonObj].sort((item1, item2) => parseInt(item1.carbohydrate) - parseInt(item2.carbohydrate)).slice(0, 10);
        result = lowCarbsMenu.forEach(item => template(item.photoUrl, item.title, item.ingredients, item.totalTime, item.carbohydrate, item.protein, item.source));
        break;
      case 'High-protein':
        let proteinWithAValue = jsonObj.filter(item => item.protein !== "");
        let highProteinTop10Menu = proteinWithAValue.sort((item1, item2) => parseInt(item1.protein) - parseInt(item2.protein)).reverse().slice(0, 10);
        result = highProteinTop10Menu.forEach(item => template(item.photoUrl, item.title, item.ingredients, item.totalTime, item.carbohydrate, item.protein, item.source));
        break;
      default:
        result = jsonObj.forEach(item => template(item.photoUrl, item.title, item.ingredients, item.totalTime, item.carbohydrate, item.protein, item.source));
    }     
  }

//find by keyword
function findByKeyword() {
  let keyword = document.getElementById('find-recipe').value
  let filteredByKey = jsonObj.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()))
  document.getElementById('card-list').innerHTML = ""
  filteredByKey.forEach(item => template(item.photoUrl, item.title, item.ingredients, item.totalTime, item.carbohydrate, item.protein, item.source));
}



