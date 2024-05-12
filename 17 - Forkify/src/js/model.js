import {API_URL, RES_PER_PAGE} from './config.js'
import {getJSON } from './helper.js'

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page:1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: []
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
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
    }
    const isBookmarked = state.bookmarks.some(bks => {
        return bks.id === id;   
    });

    if(isBookmarked) state.recipe.bookmarked = true;
    else {
        state.recipe.bookmarked = false
    }

    

} catch (err) {
    throw err;
    console.error(err)
}
}

export const loadSearchResults = async function(query) {
    try {
        state.search.query = query;

        const data = await getJSON(`${API_URL}?search=${query}`);
        state.search.results = data.data.recipes.map(rec=> {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        })
        state.search.page = 1;
    } catch (err) {
        console.err(`${err}`);
        throw err;
    }
}
 
// Pagination
export const getSearchResultsPage = function(page = 1) {

    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = (page * 10)
    return state.search.results.slice(start, end)
}

export const updateServings = function(newServings =1) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;        
    })

    state.recipe.servings = newServings;
    
}

export const addBookmark = function(recipe) {
    // Add bookmark
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmark
    if(recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }

}

export const deleteBookmark = function(id) {
    const index = state.bookmarks.findIndex(el => el.id == id)
    state.bookmarks.splice(index, 1)

    //Mark current recipe as NOT bookmarked
    if(id === state.recipe.id) state.recipe.bookmarked = false;

}