class SearchView {
    #parentEl = document.querySelector('.search')
    inputField = document.querySelector('.search__field')

    getQuery() {
        const query = this.#parentEl.querySelector('.search__field').value
        this.clearInput();
        return query
    }

    addHandlerSearch(handler) {
        this.#parentEl.addEventListener('submit', function(e) {
            e.preventDefault();
            handler()
        })
    }

    clearInput() {
        this.inputField.value = ''
    }
}

export default new SearchView;