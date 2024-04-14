import {API_URL} from './config.js'
import {getJSON } from './helper.js'

export const state = {
    recipe: {}
}

export const loadRecipe = async function(id) {
    try {
    const data = await getJSON(`${API_URL}/${id}`)
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
    console.error(err)
}
}