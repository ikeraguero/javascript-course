
import 'core-js/stable';
import 'regenerator-runtime';
import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

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
    servingsController()
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
  if(!query) return;

  // Load search results
  await model.searchRecipe(query);

  // Render results
  resultsView.render(model.getSearchResultsPage())

  //Rendering Pagination
  paginationView.render(model.state.search)
} catch (err) {
  console.log(err); 
}
  
}

const paginationController = function(page) {
  // Rendering NEW results
  resultsView.render(model.getSearchResultsPage(page))

  // Rendering NEW pagination buttons
  paginationView.render(model.state.search)
}

const servingsController = function(newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings)

  //Update the recipe view
  recipeView.render(model.state.recipe);

}

const init = function() {
  recipeView.addHandlerServings(servingsController)
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addEventHandler(paginationController)
}
init()