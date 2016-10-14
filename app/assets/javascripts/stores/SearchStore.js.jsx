(() => {
  class SearchStore {
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
        {id: 1, name: "An overlay"}
      ],
      this.collections = [
        {id: 1, name: "A collection"}
      ];
      this.pins = [
        {id: 1, name: "Pin 1", position: [51.505, -0.09], places: [{id: 1, name: "Pin 1, Place 1"}]},
        {id: 2, name: "Pin 2", position: [51.515, -0.11], places: [{id: 1, name: "Pin 2, Place 1"}, {id: 2, name: "Pin 2, Place 2"}]},
        {id: 3, name: "Pin 3", position: [51.525, -0.13], places: [{id: 1, name: "Pin 3, Place 1"}, {id: 2, name: "Pin 3, Place 2"}, {id: 3, name: "Pin 3, Place 3"}, {id: 4, name: "Pin 3, Place 4"}]}
      ];

      this.bindListeners({
        onFetchSearchResults: SearchActions.FETCH_SEARCH_RESULTS,
        onUpdatePins: SearchActions.UPDATE_PINS,
        onUpdatePlaces: SearchActions.UPDATE_PLACES,
        onUpdateOverlays: SearchActions.UPDATE_OVERLAYS,
        onUpdateCollections: SearchActions.UPDATE_COLLECTIONS
      });
    }

    onFetchSearchResults() {
      this.searching = true;
      this.places = [];
      this.pins   = [];
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

  }

  this.SearchStore = alt.createStore(SearchStore, 'SearchStore');
})();
