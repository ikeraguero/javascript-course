import View from "./View.js"
import icons from '../../img/icons.svg'
import previewView from "./previewView.js";
class ResultsView extends View {
    _parentElement = document.querySelector(".results");
    _errorMessage = 'No recipes found for your query! Please try again!';
    _message = this._errorMessage;

    _generateMarkup() {
      return this._data.map(result => previewView.render(result, false)).join("");
      
  }
}
export default new ResultsView();