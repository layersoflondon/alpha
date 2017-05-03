(() => {
  /*
  Fetch collections to display in the PinForm

  */
  class CollectionsStateStore {
    constructor() {
      this.collections = [];

      this.bindListeners({
        onUpdateCollections: CollectionsStateActions.UPDATE_COLLECTIONS
      });
    }

    onUpdateCollections(collections) {
      this.collections = collections;
    }
  }

  this.CollectionsStateStore = alt.createStore(CollectionsStateStore, 'CollectionsStateStore');
})();
