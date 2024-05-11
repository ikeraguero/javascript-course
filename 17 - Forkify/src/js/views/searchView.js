class SearchView {
    _parentEl = document.querySelector('.search')
    inputField = document.querySelector('.search__field')

    getQuery() {
        const query = this._parentEl.querySelector('.search__field').value
        this._clearInput();
        return query
    }

    addHandlerSearch(handler) {
        this._parentEl.addEventListener('submit', function(e) {
            e.preventDefault();
            handler()
        })
    }

    _clearInput() {
        this.inputField.value = ''
    }
}

export default new SearchView;