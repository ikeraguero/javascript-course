const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const getRecipe = async function() {
  try{
    const res = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886")
    console.log(res);

    const data = await res.json();
    console.log(data);

    if(!res.ok) throw new Error(`${data.message} (${res.status})`)

    let recipe = data.data.recipe;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
    }
    console.log(recipe);
    
    
    
  } catch(err) {
    alert(err)
  }
}

getRecipe()
