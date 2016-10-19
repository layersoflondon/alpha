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

    postPin(pin_data) {
      return (dispatch) => {
        dispatch();
        SearchResultsSource.postPin(pin_data).then((new_pin) => {
          console.log("Got new pin!", new_pin);
          this.addPin(new_pin);
        }).catch((error) => {
          console.log("Error adding pin. Response: ", error);
        })
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

    addPin(pin) {
      return pin;
    }
  }

  this.SearchResultsActions = alt.createActions(SearchResultsActions);
})();
