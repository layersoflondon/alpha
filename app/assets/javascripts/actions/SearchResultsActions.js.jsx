(() => {
  class SearchResultsActions {
    fetchSearchResults() {
      return (dispatch) => {
        dispatch();

        SearchResultsSource.fetch().then((new_state) => {
          this.emitUpdatedState(new_state);
        }).catch((error) => {
          console.log("Error!", error);
        });

      }
    }

    emitUpdatedState(state) {
      this.updateCoordinates(state.lat, state.lng);
      this.updatePins(state.pins);
      this.updatePlaces(state.places);
      this.updateOverlays(state.overlays);
      this.updateCollections(state.collections);
    }

    updateCoordinates(lat, lng) {
      if( lat && lng ) {
        return {lat: lat, lng: lng};
      }

      return false
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
