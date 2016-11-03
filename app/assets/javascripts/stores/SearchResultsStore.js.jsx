(() => {
  class SearchResultsStore {
    constructor() {
      this.lat  = 51.5353284;
      this.lng  = 0.1389512;
      this.zoom = 13;
      this.searching = false;
      this.places = [];
      this.overlays = [];
      this.visible_overlays = [];
      this.collections = [];
      this.pins = [];
      // example pin with a content entry
      // {id: 1, title: "Barking Park", location: "Barking", position: [51.544719, 0.085436], content_entries: [
      //   {id: 1, title: "Barking Park Lake", location: "Barking", resource: {type: "image", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg"}},
      // }

      this.bindListeners({
        onFetchSearchResults: SearchResultsActions.FETCH_SEARCH_RESULTS,
        onUpdateCoordinates: SearchResultsActions.UPDATE_COORDINATES,
        onUpdatePins: SearchResultsActions.UPDATE_PINS,
        onUpdatePlaces: SearchResultsActions.UPDATE_PLACES,
        onUpdateOverlays: SearchResultsActions.UPDATE_OVERLAYS,
        onUpdateCollections: SearchResultsActions.UPDATE_COLLECTIONS,
        onToggleOverlayVisibility: SearchResultsActions.TOGGLE_OVERLAY_VISIBILITY,
        onAddPin: SearchResultsActions.ADD_PIN
      });
    }

    onFetchSearchResults() {
      this.searching = true;
      this.places = [];
      this.pins   = [];
      this.overlays = []
    }

    onUpdateCoordinates(latlng) {
      if( latlng ) {
        this.lat = latlng.lat;
        this.lng = latlng.lng;
      }
    }

    onUpdatePins(pins) {
      this.pins = pins;
      this.searching = false;
    }

    onUpdatePlaces(places) {
      this.places    = places;
      this.searching = false;
    }

    onUpdateOverlays(overlays) {
      this.overlays = overlays;
    }

    onUpdateCollections(collections) {
      this.collections = collections;
    }

    onToggleOverlayVisibility(overlay_id) {
      var overlay_ids = this.visible_overlays;
      var current_index = overlay_ids.indexOf(overlay_id);

      if( current_index > -1 ) {
        overlay_ids.splice(current_index, 1);
      }else {
        overlay_ids.push(overlay_id);
      }

      this.visible_overlays = overlay_ids;
    }

    onAddPin(pin) {
      console.log("Added a new pin!", pin);
      var pins = this.pins.slice();
      pins.push(pin);
      this.pins = pins;
    }
  }

  this.SearchResultsStore = alt.createStore(SearchResultsStore, 'SearchResultsStore');
})();
