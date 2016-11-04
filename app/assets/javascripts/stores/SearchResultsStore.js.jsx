(() => {
  /*
  Sidebar & map content store
  */
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
      this.markers = [];
      this.pins = [];

      this.bindListeners({
        onFetchSearchResults: SearchResultsActions.FETCH_SEARCH_RESULTS,
        onUpdateCoordinates: SearchResultsActions.UPDATE_COORDINATES,
        onUpdateMarkers: SearchResultsActions.UPDATE_MARKERS,
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

    onUpdateMarkers(markers) {
      this.markers = markers;
      this.searching = false;
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
