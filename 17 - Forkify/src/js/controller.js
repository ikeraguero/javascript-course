
import 'core-js/stable';
import 'regenerator-runtime';
import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView..js';

///////////////////////////////////////

if(module.hot) {
  module.hot.accept();
}

const controlRecipe = async function() {
  try{
    const id = window.location.hash.slice(1);
    
    if(!id) return;
    recipeView.renderSpinner();

      // Update search results
    resultsView.update(model.getSearchResultsPage())
    bookmarksView.update(model.state.bookmarks)

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
  if(!query) return;

  // Load search results
  await model.loadSearchResults(query);

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
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

}

const controlAddBookmark = function() {
  // Add or remove bookmark
  if(!model.state.recipe.bookmarked)
  model.addBookmark(model.state.recipe);
  else if(model.state.recipe.bookmarked)
  model.deleteBookmark(model.state.recipe.id)

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks)
}

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerBoomkark(controlAddBookmark)
  recipeView.addHandlerServings(servingsController)
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addEventHandler(paginationController)
}
init()