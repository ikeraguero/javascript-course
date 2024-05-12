import {API_URL, RES_PER_PAGE, KEY} from './config.js'
import {AJAX} from './helper.js'

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

const createRecipeObject = function(data) {
    const {recipe} = data.data;
    return {
      id: recipe.id,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
      imageUrl: recipe.image_url,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      ...(recipe.key && {key: recipe.key}) // short circuiting
    }
}

export const loadRecipe = async function(id) {
    try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`)
    state.recipe = createRecipeObject(data)
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

        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
        state.search.results = data.data.recipes.map(rec=> {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...(rec.key && {key: rec.key})
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

const persistBookmarks = function() {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

export const addBookmark = function(recipe) {
    // Add bookmark
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmark
    if(recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }

    // Add to localStorage
    persistBookmarks()
}

export const deleteBookmark = function(id) {
    const index = state.bookmarks.findIndex(el => el.id == id)
    state.bookmarks.splice(index, 1)

    //Mark current recipe as NOT bookmarked
    if(id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmarks();
}

const init = function() {
    const storage = localStorage.getItem('bookmarks');
    if(storage) state.bookmarks = JSON.parse(storage) // convert the string back to an object
}
init()

const clearBookmarks = function() {
    localStorage.clear('bookmarks');
}

export const uploadRecipe = async function(newRecipe) {
    try {

        const ingredients = Object.entries(newRecipe).filter(entry => {
            return entry[0].startsWith("ingredient") && entry[1] !== ''}).map(ing => {
            const ingArr = ing[1].split(',').map(el=> el.trim());
            if (ingArr.length !== 3) {
                throw new Error(
                    'Wrong ingredient format! Please use the correct format'
                    )
                }
                const [quantity, unit, description] = ingArr;
                console.log('Ingredient:', { quantity, unit, description }); // Log each ingredient                
                return {quantity: quantity ? +quantity : null, unit, description};
            })

            const recipe = {
                title: newRecipe.title,
                source_url: newRecipe.sourceUrl,
                image_url: newRecipe.image,
                publisher: newRecipe.publisher,
                cooking_time: +newRecipe.cookingTime,
                servings: +newRecipe.servings,
                ingredients,
            }
            const data = await AJAX(`${API_URL}?key=${KEY}`, recipe)
            state.recipe = createRecipeObject(data);
            console.log(data);
            
            addBookmark(state.recipe);
        } catch(err) {
            throw err;
        }
        
}

