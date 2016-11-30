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

    fetchNearbyResults(lat_lng, map_bounds) {
      return (dispatch) => {
        dispatch();

        let sw = new google.maps.LatLng(map_bounds.southWest.lat, map_bounds.southWest.lng);
        let ne = new google.maps.LatLng(map_bounds.northEast.lat, map_bounds.northEast.lng);
        let bounds = new google.maps.LatLngBounds(sw, ne);

        const search_params = {
          location: lat_lng,
          radius: FilterStateStore.getState().search_radius,
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
      this.updateCollections(state.collections);

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

    updateNotes(markers) {
      const notes = _.chain(markers).map(
        (marker) => {
          return marker.pins;
        }
      ).flatten().value();

      return notes;
    }

    toggleOverlayVisibility(overlay_id) {
      return overlay_id;
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
