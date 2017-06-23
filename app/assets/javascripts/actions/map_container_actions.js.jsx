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

    fetchNearbyResults() {
      return (dispatch) => {
        dispatch();

        const map_state = MapContainerStore.getState();
        const filter_state = FilterStateStore.getState();

        // centre point of london
        const location = {lat: 51.50201096474784, lng: -0.12342453002929686}; // FilterStateStore.getState().centre_point;
        const radius   = 35000;//FilterStateStore.getState().search_radius

        const search_params = {
          location: location,
          radius: radius,
          name: FilterStateStore.getState().search_query
        };

        Places.getNearbyLocations(search_params).then((results) => {
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
      this.updateCollections(state.all_collections);

      // call this after other state changes that effect the map content (marker pins)
      // calling first will cause all to double dispatch (a state change to tell leafelet to move the map)
      // whilst simuataneously re-rendering the markers.
      this.updateCoordinates(state.lat, state.lng);

      return false;
    }

    updateCoordinates(lat, lng) {
      if(lat && lng) {
        return {lat: lat, lng: lng};
      }

      return false;
    }

    updateMarkers(markers, update_coords=false) {
      return {markers: markers, update_coords: update_coords};
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

      const pins = _.chain(results).map(
        (result) => {
          return result.pins;
        }
      ).flatten().value();

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

    updateCollection(collection) {
      return collection;
    }

    updateNotes(markers) {
      const notes = _.chain(markers).map(
        (marker) => {
          return marker.pins;
        }
      ).flatten().value();

      return notes;
    }

    toggleShowOverlays() {
      return true;
    }

    toggleOverlayVisibility(overlay_id) {
      return overlay_id;
    }

    toggleShowCollections() {
      return true;
    }

    goToCollection(collection_id) {
      return collection_id;
    }

    setOverlayOpacity(overlay_id, opacity) {
      return {overlay_id: overlay_id, opacity: opacity};
    }

    addPin(pin_data) {
      return pin_data;
    }

    addMarker(marker_data) {
      return marker_data;
    }

    updateMarker(marker_data) {
      return marker_data;
    }
  }

  this.MapContainerActions = alt.createActions(MapContainerActions);
})();
