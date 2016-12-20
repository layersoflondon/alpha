(() => {
  /*
  Sidebar & map content store
  */
  class MapContainerStore {
    constructor() {
      this.lat  = 51.50201096474784;
      this.lng  = -0.12342453002929686;
      this.zoom = 13;
      this.searching = false;
      this.places = [];
      this.overlays = [];
      this.show_overlays = true;
      this.visible_overlays = [];
      this.overlay_options  = [];
      this.collections = [];
      this.markers = [];
      this.pins = [];
      this.notes = [];

      this.bindListeners({
        onFetchSearchResults: MapContainerActions.FETCH_SEARCH_RESULTS,
        onFetchNearbyResults: MapContainerActions.FETCH_NEARBY_RESULTS,

        onUpdateCoordinates: MapContainerActions.UPDATE_COORDINATES,
        onUpdateMarkers: MapContainerActions.UPDATE_MARKERS,
        onUpdatePins: MapContainerActions.UPDATE_PINS,
        onUpdatePlaces: MapContainerActions.UPDATE_PLACES,
        onUpdateOverlays: MapContainerActions.UPDATE_OVERLAYS,
        onUpdateNotes: MapContainerActions.UPDATE_NOTES,
        onUpdateCollections: MapContainerActions.UPDATE_COLLECTIONS,
        onToggleShowOverlays: MapContainerActions.TOGGLE_SHOW_OVERLAYS,
        onToggleOverlayVisibility: MapContainerActions.TOGGLE_OVERLAY_VISIBILITY,
        onSetOverlayOpacity: MapContainerActions.SET_OVERLAY_OPACITY,
        onAddPin: MapContainerActions.ADD_PIN,
        onAddMarker: MapContainerActions.ADD_MARKER
      });
    }

    onFetchSearchResults() {
      this.searching = true;

      this.overlays = [];
      this.places = [];
      this.notes  = [];
    }

    onFetchNearbyResults() {
      this.searching = true;
      this.pins = [];
    }

    onUpdateCoordinates(latlng) {
      if(latlng) {
        this.lat = latlng.lat;
        this.lng = latlng.lng;
      }else {
        return false;
      }
    }

    onUpdateMarkers(markers) {
      this.searching = false;
      this.markers = markers;
    }

    onUpdatePins(pins) {
      this.searching = false;
      this.pins = pins;
    }

    onUpdatePlaces(places) {
      this.searching = false;
      this.places    = places;
    }

    onToggleShowOverlays() {
      this.show_overlays = !this.show_overlays;
    }

    onUpdateOverlays(overlays) {
      this.overlays = overlays;
    }

    onUpdateCollections(collections) {
      this.collections = collections;
    }

    onUpdateNotes(notes) {
      this.searching = false;
      this.notes = notes;
    }

    onToggleOverlayVisibility(overlay_id) {
      let overlay_ids = this.visible_overlays.slice();
      let current_index = overlay_ids.indexOf(overlay_id);

      if( current_index > -1 ) {
        overlay_ids.splice(current_index, 1);
      }else {
        overlay_ids.push(overlay_id);
        let overlay = _.find(this.overlays, (overlay) => {return overlay.id == overlay_id});

        /*
         focus the overlay after a short timeout to allow the MapContainerAction's
         dispatcher enough time to complete before firing the MapStateAction's event
         */
        setTimeout(() => {
          let overlay_object = overlay;

          // for some overlay types, we need to figure out the proper centre point
          switch(overlay.resource.type) {
            case "polygon": // position the map center at the starting point of a polygon
              overlay_object = {position: {lat: overlay.resource.polygon[0][0], lng: overlay.resource.polygon[0][1]}};
              break;
            case "georeferencer_tileserver":
              overlay_object = {position: FilterStateStore.getState().centre_point}; // keep the map in its current position; we'll re-position it when we render the georeferenced tile group...
              break;
          }

          MapStateActions.focusPlace(overlay_object);
        }, 100);
      }

      this.visible_overlays = overlay_ids;
    }

    onSetOverlayOpacity(overlay_object) {
      let overlay_ids = this.visible_overlays.slice();
      let overlay_opts = this.overlay_options.slice();
      let current_index = overlay_ids.indexOf(overlay_object.overlay_id);
      let overlay_object_options = _.find(this.overlay_options, (o) => {return o.id == overlay_object.overlay_id});


      if(current_index > -1 && overlay_object_options) {
        let option_index = _.findIndex(overlay_opts, (o) => {return o.id == overlay_object.overlay_id});
        overlay_opts.splice(option_index, 1);
        overlay_opts.push({id: overlay_object.overlay_id, opacity: overlay_object.opacity});
      }else if(current_index > -1 && !overlay_object_options) {
        overlay_opts.push({id: overlay_object.overlay_id, opacity: overlay_object.opacity});
      }

      this.overlay_options = overlay_opts;
    }

    onAddPin(pin_data) {
      var pins = this.pins.slice();

      pins.push(marker_data);
      this.pins = pins;
    }

    onAddMarker(marker_data) {
      var markers = this.markers.slice();

      var current_marker = _.find(markers, function(m) {
        return m.position.lat == marker_data.position.lat && m.position.lng == marker_data.position.lng;
      });

      // if the map has a marker at this location already, we add it to that
      // marker's array of pins, otherwise, we add a new marker at the given position...

      if( typeof current_marker !== "undefined" ) {
        current_marker.pins.push(marker_data);
        this.markers = markers;
      }else {
        const marker = {
          position: marker_data.position,
          pins: [marker_data]
        };
        markers.push(marker);
        this.markers = markers;
      }

      return true;
    }
  }

  this.MapContainerStore = alt.createStore(MapContainerStore, 'MapContainerStore');
})();
