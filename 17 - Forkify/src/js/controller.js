
import 'core-js/stable';
import 'regenerator-runtime';
import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

///////////////////////////////////////

if(module.hot) {
  module.hot.accept();
}

const controlRecipe = async function() {
  try{
    const id = window.location.hash.slice(1);
    console.log(id);
    
    if(!id) return;
    recipeView.renderSpinner();
    // Loading recipe - model
    await model.loadRecipe(id)

    //Rendering recipe - view
    recipeView.render(model.state.recipe);
  } catch(err) {
    console.log(err);
    recipeView.renderError()
  }
}

const controlSearchResults = async function() {
try {
  resultsView.renderSpinner()
  // Getting query
  const query = searchView.getQuery()

  // Load search results
  const results = await model.searchRecipe(query);
  // Clearing search bar
  console.log(results);
  
  resultsView.render(results)
} catch (err) {
  console.log(err); 
}
  
}

const init = function() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults)
}
init()