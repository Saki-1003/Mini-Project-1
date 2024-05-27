//add new recipe posted by user

async function submitRecipe() {
  postedTitle = document.getElementById('title-input').value
  postedIngredients = document.getElementById('ingredients-input').value
  postedContent = document.getElementById('content-input').value
  postedTime = document.getElementById('cook-time').value
  postedImage = document.getElementById('recipe-image').value

  let newRecipe = {
  title: postedTitle, 
  ingredients: postedIngredients,
  content: postedContent,
  totalTime: postedTime,
  photoUrl: postedImage, 
  }

  const response = await fetch('http://localhost:3000/usersRecipe',{
    method: 'POST',
    body: JSON.stringify(newRecipe),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      },
  })

  window.alert('Your recipe has been added in the Recipes page!')
  
 }