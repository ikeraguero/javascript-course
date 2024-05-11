import View from "./View.js"
import icons from '../../img/icons.svg'

class PaginationView extends View{
    _parentElement = document.querySelector(".pagination");

    addEventHandler(handler) {
       this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');

            if(!btn) return;
            const goToPage = +btn.dataset.goto

            handler(goToPage)
            
        })
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(numPages); 
               
        
        //Page 1 and there are other pages
        if(curPage === 1 && numPages > 1) {
            return `<button class="btn--inline pagination__btn--next"  data-goto="${curPage+1}">
            <span>Page ${curPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
        }
        //Last page
        if(curPage === numPages && numPages > 1) {
            return `<button class="btn--inline pagination__btn--prev" data-goto="${curPage-1}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage-1}</span>
          </button>
          `
        }
        //Other pages
        if(curPage < numPages) {
            return `<button class="btn--inline pagination__btn--prev" data-goto="${curPage-1}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage-1}</span>
          </button>
          <button class="btn--inline pagination__btn--next" data-goto="${curPage+1}">
            <span>Page ${curPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `
        }
        //Page 1 without any other page
        return ''
    }

}

export default new PaginationView();