export const state = {
    recipe: {}
}

export const loadRecipe = async function(id) {
    try {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
    console.log(res);
    const data = await res.json();
    console.log(data);

    if(!res.ok) throw new Error(`${data.message} (${res.status})`)

    const recipe = data.data.recipe;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
    }
    console.log(recipe);
} catch (err) {
    alert(err);
}
}