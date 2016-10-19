(() => {
  class SearchResultsStore {
    constructor() {
      this.lat  = 51.5421901;
      this.lng  = 0.0830757;
      this.zoom = 13;
      this.searching = false;
      this.places = [
        {id: 1, name: "Barking Park", location: "Barking"},
        {id: 2, name: "Gascoigne Estate", location: "Barking"},
        {id: 3, name: "Valence House Museum", location: "Dagenham"}
      ];
      this.overlays = [
        {id: 1, name: "RAF Aerial View", date_range: "1451 - 2013", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg", bounds: [[51.544719, 0.085436], [51.534719, 0.055436]]},
        {id: 2, name: "RAF View", date_range: "1551 - 2010", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg", bounds: [[51.554719, 0.085436], [51.544719, 0.115436]]}
      ];
      this.visible_overlays = [];
      this.collections = [
        {id: 1, name: "Parks of Barking"}
      ];
      this.pins = [
        {id: 1, name: "Barking Park", location: "Barking", position: [51.544719, 0.085436], places: [
          {id: 1, name: "Barking Park Lake", location: "Barking", resource: {type: "image", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg"}},
          {id: 2, name: "Barking Park", location: "Barking", resource: {type: "other", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg"}},
          {id: 3, name: "Barking Park Sounds", location: "Barking", resource: {type: "audio", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg"}}
        ]},
        {id: 2, name: "Parsloes Park", location: "Dagenham", position: [51.5437522, 0.1328339], places: []},
        {id: 3, name: "The Leys", location: "Dagenham", position: [51.5345465, 0.1601853], places: []}
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
