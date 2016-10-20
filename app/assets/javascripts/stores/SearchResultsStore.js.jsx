(() => {
  class SearchResultsStore {
    constructor() {
      this.lat  = 51.5353284;
      this.lng  = 0.1389512;
      this.zoom = 13;
      this.searching = false;
      this.places = [
        {id: 1, title: "Barking Park", location: "Barking", position: [51.544719, 0.085436]},
        {id: 2, title: "Gascoigne Estate", location: "Barking", position: [51.5296813, 0.0805853]},
        {id: 3, title: "Valence House Museum", location: "Dagenham", position: [51.5582921, 0.1319923]}
      ];
      this.overlays = [
        {id: 1, name: "RAF Aerial View", date_range: "1451 - 2013", url: "/raf1.png", bounds: [[51.544719, 0.085436], [51.534719, 0.055436]]},
        {id: 2, name: "RAF View", date_range: "1551 - 2010", url: "/raf2.png", bounds: [[51.554719, 0.085436], [51.544719, 0.115436]]}
      ];
      this.visible_overlays = [];
      this.collections = [
        {id: 1, name: "Parks of Barking"}
      ];
      this.pins = [
        {id: 1, title: "Barking Park", location: "Barking", position: [51.544719, 0.085436], content_entries: [
          {id: 1, title: "Barking Park Lake", location: "Barking", resource: {type: "image", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg"}},
          {id: 2, title: "Barking Park", location: "Barking", resource: {type: "other", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg"}},
          {id: 3, title: "Barking Park Sounds", location: "Barking", resource: {type: "audio", url: "/raf1.png"}}
        ]},
        {id: 2, title: "Parsloes Park", location: "Dagenham", position: [51.5437522, 0.1328339], content_entries: []},
        {id: 3, title: "The Leys", location: "Dagenham", position: [51.5345465, 0.1601853], content_entries: []},
        {id: 4, title: "Broad Street", location: "Dagenham", position: [51.535044513278166, 0.15101909637451172], content_entries: []},
        {id: 5, title: "Goresbrook Park", location: "Dagenham", position: [51.5353284, 0.1389512], content_entries: []},
        {id: 6, title: "Old Dagenham Park", location: "Dagenham", position: [51.5365733, 0.1551632], content_entries: []},
        {id: 7, title: "Mayesbrook Park", location: "Dagenham", position: [51.5449355, 0.1089764], content_entries: []}
      ];

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
