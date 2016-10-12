(() => {
  class SearchActions {
    fetchSearchResults() {
      console.log("fetchSearchResults()");
    }
    updateSearchResults(results) {
      return results;
    }
  }

  this.SearchActions = alt.createActions(SearchActions);
})();
