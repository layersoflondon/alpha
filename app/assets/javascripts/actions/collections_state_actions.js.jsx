(() => {
  class CollectionsStateActions {
    searchCollections(query) {
      return (dispatch) => {
        dispatch();

        Collection.searchCollections({query: query}).then((new_state) => {
          return this.updateCollections(new_state);
        }).catch((error) => {
          console.log("Got an error when fetching collections", error);
          return this.updateCollections([]);
        });
      };
    }

    updateCollections(collections) {
      return collections;
    }
  }

  this.CollectionsStateActions = alt.createActions(CollectionsStateActions);
})();
