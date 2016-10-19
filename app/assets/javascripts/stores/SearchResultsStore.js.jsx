(() => {
  class SearchResultsStore {
    constructor() {
      this.lat  = 51.505;
      this.lng  = -0.09;
      this.zoom = 13;
      this.searching = false;
      this.places = [
        {id: 1, name: "Place 1"},
        {id: 2, name: "Place 2"},
        {id: 3, name: "Place 3"},
        {id: 4, name: "Place 4"}
      ];
      this.overlays = [
        {id: 1, name: "Overlay 1", date_range: "1451 - 2013", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg", bounds: [[51.5268, -0.1000], [51.5168, -0.0780]]},
        {id: 2, name: "Overlay 2", date_range: "1551 - 201", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg", bounds: [[51.5400, -0.1100], [51.5300, -0.0880]]}
      ];
      this.visible_overlays = [];
      this.collections = [
        {id: 1, name: "A collection"}
      ];
      this.pins = [
        {id: 1, name: "Pin 1", position: [51.505, -0.09], places: [{id: 1, name: "Pin 1, Place 1"}]},
        {id: 2, name: "Pin 2", position: [51.515, -0.11], places: [{id: 1, name: "Pin 2, Place 1"}, {id: 2, name: "Pin 2, Place 2"}]},
        {id: 3, name: "Pin 3", position: [51.525, -0.13], places: [{id: 1, name: "Pin 3, Place 1"}, {id: 2, name: "Pin 3, Place 2"}, {id: 3, name: "Pin 3, Place 3"}, {id: 4, name: "Pin 3, Place 4"}]}
      ];

      this.bindListeners({
        onFetchSearchResults: SearchResultsActions.FETCH_SEARCH_RESULTS,
        onUpdateCoordinates: SearchResultsActions.UPDATE_COORDINATES,
        onUpdatePins: SearchResultsActions.UPDATE_PINS,
        onUpdatePlaces: SearchResultsActions.UPDATE_PLACES,
        onUpdateOverlays: SearchResultsActions.UPDATE_OVERLAYS,
        onUpdateCollections: SearchResultsActions.UPDATE_COLLECTIONS,
        onToggleOverlayVisibility: SearchResultsActions.TOGGLE_OVERLAY_VISIBILITY
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
  }

  this.SearchResultsStore = alt.createStore(SearchResultsStore, 'SearchResultsStore');
})();
