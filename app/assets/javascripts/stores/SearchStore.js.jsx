(() => {
  class SearchStore {
    constructor() {
      this.search_results = [];

      this.bindListeners({
        onUpdateSearchResults: SearchActions.UPDATE_SEARCH_RESULTS
      });
    }

    onUpdateSearchResults(search_results) {
      this.search_results = search_results;
    }
  }

  this.SearchStore = alt.createStore(SearchStore, 'SearchStore');
})();
