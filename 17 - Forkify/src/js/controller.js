
import 'core-js/stable';
import 'regenerator-runtime';
import * as model from './model.js'
import recipeView from './views/recipeView.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const showRecipe = async function() {
  try{
    const id = window.location.pathname.slice(1);
    console.log(id);
    
    if(!id) return;

    // Loading recipe - model
    await model.loadRecipe(id)

    //Rendering recipe - view
    recipeView.render(model.state.recipe);
    
  } catch(err) {
    alert(err)
  }
}

window.addEventListener("hashchange", showRecipe)
window.addEventListener("load", showRecipe)
