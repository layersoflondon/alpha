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
      this.updateMarkers(state.markers);
      this.updatePins(state.markers);
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

    updateMarkers(markers) {
      return markers;
    }

    updatePins(markers) {
      window.markers = markers;
      /*
      our resultset will return an array of marker objects with a position and an array of pins:

      markers: [
        {
          position: {lat: 1234, lng: 0123},
          pins: [Pin, Pin]
        },
        {
          position: {lat: 2345, lng: 0234},
          pins: [Pin]
        }
      ]

      we need a flattened array of pins - _.map to return the nested array [[Pin, Pin], [Pin]] and .flatten them out...
      */

      const pins = _.chain(markers).map(function(marker){return marker.pins}).flatten().value();

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
