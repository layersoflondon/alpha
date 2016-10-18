(() => {
  class SearchResultsActions {
    fetchSearchResults() {
      return (dispatch) => {
        dispatch();

        // var self = this;
        // setTimeout(function() {
        //   self.emitUpdatedState([{id: 1, name: "This is a newly added pin", position: [51.525, -0.09], places: [{id: 1, name: "Searched Pin, Place 1"}, {id: 2, name: "Searched Pin, Place 2"}]}]);
        // }, 2000);

        SearchResultsSource.fetch().then((new_state) => {
          console.log(new_state);
          this.emitUpdatedState(new_state);
        }).catch((error) => {
          console.log("Error!", error);
        });

      }
    }

    emitUpdatedState(state) {
      this.updatePins(state.pins);
      this.updatePlaces(state.places);
      this.updateOverlays(state.overlays);
      this.updateCollections(state.collections);
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

    toggleOverlayVisibility(overlay_id) {
      return overlay_id;
    }
  }

  this.SearchResultsActions = alt.createActions(SearchResultsActions);
})();
