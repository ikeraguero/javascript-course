import icons from '../../img/icons.svg'

export default class View {
    _data;
    render(data) {

        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        ;

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }
    renderError(message = this._message) {
        const markup = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderMessage() {
        const markup = `div class="recipe">
        <div class="message">
          <div>
            <svg>
              <use href="src/img/icons.svg#icon-smile"></use>
            </svg>
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>`

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderSpinner() {
        const html = `<div class="spinner">
    <svg>
        <use href="${icons}#icon-loader"></use>
    </svg>
        </div>`

    this._parentElement.innerHTML = ''    
    this._parentElement.insertAdjacentHTML("afterbegin", html)
    }
}