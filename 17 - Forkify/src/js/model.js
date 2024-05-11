import {API_URL, RES_PER_PAGE} from './config.js'
import {getJSON } from './helper.js'

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RES_PER_PAGE,
    }
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
    throw err;
    console.error(err)
}
}

export const searchRecipe = async function(query) {
    const queryResults = await getJSON(`${API_URL}?search=${query}`);
    state.search.query = query;
    state.search.results = queryResults.data.recipes;
    return state.search.results;
}

// Pagination
export const getSearchResultsPage = function(page = 1) {

    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = (page * 10)
    return state.search.results.slice(start, end)
}