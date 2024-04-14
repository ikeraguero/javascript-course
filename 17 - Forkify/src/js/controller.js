
import 'core-js/stable';
import 'regenerator-runtime';
import * as model from './model.js'
import recipeView from './views/recipeView.js';



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const showRecipe = async function() {
  try{
    const id = window.location.pathname.slice(1);
    console.log(id);
    
    if(!id) return;
    recipeView.renderSpinner();
    // Loading recipe - model
    await model.loadRecipe(id)

    //Rendering recipe - view
    recipeView.render(model.state.recipe);
    
  } catch(err) {
    alert(err)
  }
}

const init = function() {
  recipeView.addHandlerRender(showRecipe);
}
init()