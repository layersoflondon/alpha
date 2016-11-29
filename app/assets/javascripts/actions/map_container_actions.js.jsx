(() => {
  class MapContainerActions {
    fetchSearchResults() {
      return (dispatch) => {
        dispatch();

        const filter_state = FilterStateStore.getState();

        Pin.fetch(filter_state).then((new_state) => {
          return this.emitUpdatedState(new_state);
        }).catch((error) => {
          console.log("Error!", error);
        });
      }
    }

    fetchNearbyResults(latLng) {
      return (dispatch) => {
        dispatch();

        Places.getNearbyLocations(latLng).then((results) => {
          return this.updatePins(results);
        }).catch((error) => {
          console.log("There was an error fetching the near by places...", error);
        });
      }
    }

    emitUpdatedState(state) {
      this.updateMarkers(state.markers); // update markers on the map
      this.updateNotes(state.markers);   // update notes (pin results) from LoL data
      this.updatePlaces(state.places);
      this.updateOverlays(state.overlays);
      this.updateCollections(state.collections);

      // call this after other state changes that effect the map content (marker pins)
      // calling first will cause all to double dispatch (a state change to tell leafelet to move the map)
      // whilst simuataneously re-rendering the markers.
      this.updateCoordinates(state.lat, state.lng);

      return false;
    }

    updateCoordinates(lat, lng) {
      return {lat: lat, lng: lng};
    }

    updateMarkers(markers) {
      return markers;
    }

    updatePins(results) {
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

      const pins = _.chain(results).map(function(result){return result.pins}).flatten().value();
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

    updateNotes(markers) {
      const notes = _.chain(markers).map(
        function(marker){
          return marker.pins;
        }
      ).flatten().value();

      return notes;
    }

    toggleOverlayVisibility(overlay_id) {
      return overlay_id;
    }

    submitForm(pin_data) {
      console.log("MapContainerActions submitForm()");
    }

    addPin(pin_data) {
      return pin_data;
    }

    addMarker(marker_data) {
      return marker_data;
    }
  }

  this.MapContainerActions = alt.createActions(MapContainerActions);
})();
