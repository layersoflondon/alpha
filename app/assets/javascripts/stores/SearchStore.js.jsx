(() => {
  class SearchStore {
    constructor() {
      this.search_results = [];
      this.errorMessage   = null;
      this.searching      = false;

      this.bindListeners({
        onUpdateSearchResults: SearchActions.UPDATE_SEARCH_RESULTS,
        onFetchSearchResults: SearchActions.FETCH_SEARCH_RESULTS,
        onFetchSearchResultsFailed: SearchActions.FETCH_SEARCH_RESULTS_FAILED
      });
    }

    onUpdateSearchResults(search_results) {
      this.search_results = search_results;
    }

    onFetchSearchResults() {
      // while we're fetching new results, empty the current set (we'll render a spinner in the list)
      this.search_results = [];
    }

    onFetchSearchResultsFailed(errorMessage) {
      this.errorMessage = errorMessage;
    }
  }

  this.SearchStore = alt.createStore(SearchStore, 'SearchStore');
})();
