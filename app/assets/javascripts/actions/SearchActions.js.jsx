(() => {
  class SearchActions {
    fetchSearchResults() {
      return (dispatch) => {
        dispatch();
        SearchResultsSource.fetch().then(
          (locations) => {
            this.updateSearchResults(locations)
          }
        ).catch(
          (errorMessage) => {
            this.updatingSearchResultsFailed(errorMessage)
          }
        )
      }
    }

    updateSearchResults(results) {
      return results;
    }

    fetchSearchResultsFailed(message) {
      alert("Updating search results failed!");
    }
  }

  this.SearchActions = alt.createActions(SearchActions);
})();
