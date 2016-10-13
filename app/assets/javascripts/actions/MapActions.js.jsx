(() => {
  class MapActions {
    fetchSearchResults() {
      return (dispatch) => {
        dispatch();

        var self = this;

        setTimeout(function() {
          self.emitUpdatedState([{id: 1, name: "This is a newly added pin", position: [51.525, -0.09], places: [{id: 1, name: "Place Marker 1"}, {id: 2, name: "Place Marker 2"}]}]);
        }, 2000);
      }
    }

    emitUpdatedState(state) {
      this.updatePins(state);

      var places = state.map(function(result){return result.places});
      places = places.concat.apply([], places);
      
      this.updatePlaces(places);
    }

    updatePins(pins) {
      return pins;
    }

    updatePlaces(places) {
      return places;
    }

    updateOverlays(overlays) {
      return overlays;
    }

    updateCollections(collections) {
      return collections;
    }
  }

  this.MapActions = alt.createActions(MapActions);
})();
