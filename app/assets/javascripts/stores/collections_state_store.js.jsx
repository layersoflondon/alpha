(() => {
  /*
  Fetch collections to display in the PinForm

  */
  class CollectionsStateStore {
    constructor() {
      this.collections = [];
      this.user_collections = [];

      this.bindListeners({
        onUpdateCollections: CollectionsStateActions.UPDATE_COLLECTIONS,
        onUpdateUserCollections: CollectionsStateActions.UPDATE_USER_COLLECTIONS,
        onUpdateUserCollection: CollectionsStateActions.UPDATE_USER_COLLECTION
      });
    }

    onUpdateCollections(collections) {
      let user_collections = _.filter(collections, (c) => {return !c.public}); // check for c.owner here to filter based on the current user being the owner of the collection
      this.collections = collections;
      this.user_collections = user_collections;
    }

    onUpdateUserCollections(collections) {
      this.user_collections = collections;
    }

    onUpdateUserCollection(collection) {
      let collections = this.user_collections.slice();
      collections.unshift(collection);
      collections = _.uniqBy(collections, (c)=>{return c.id});
      this.user_collections = collections;
    }
  }

  this.CollectionsStateStore = alt.createStore(CollectionsStateStore, 'CollectionsStateStore');
})();
