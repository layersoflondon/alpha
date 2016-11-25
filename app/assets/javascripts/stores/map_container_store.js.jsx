(() => {
  /*
  Sidebar & map content store
  */
  class MapContainerStore {
    constructor() {
      this.lat  = 51.5353284;
      this.lng  = 0.1389512;
      this.zoom = 13;
      this.searching = false;
      this.places = [];
      this.overlays = [];
      this.visible_overlays = [];
      this.collections = [];
      this.markers = [];
      this.pins = [];
      this.notes = [];

      this.bindListeners({
        onFetchSearchResults: MapContainerActions.FETCH_SEARCH_RESULTS,
        onUpdateCoordinates: MapContainerActions.UPDATE_COORDINATES,
        onUpdateMarkers: MapContainerActions.UPDATE_MARKERS,
        onUpdatePins: MapContainerActions.UPDATE_PINS,
        onUpdatePlaces: MapContainerActions.UPDATE_PLACES,
        onUpdateOverlays: MapContainerActions.UPDATE_OVERLAYS,
        onUpdateNotes: MapContainerActions.UPDATE_NOTES,
        onUpdateCollections: MapContainerActions.UPDATE_COLLECTIONS,
        onToggleOverlayVisibility: MapContainerActions.TOGGLE_OVERLAY_VISIBILITY,
        onAddPin: MapContainerActions.ADD_PIN,
        onAddMarker: MapContainerActions.ADD_MARKER
      });
    }

    onFetchSearchResults() {
      this.searching = true;
      this.places = [];
      this.pins   = [];
      this.overlays = [];
      this.notes  = [];
    }

    onUpdateCoordinates(latlng) {
      if( latlng ) {
        this.lat = latlng.lat;
        this.lng = latlng.lng;
      }
    }

    onUpdateMarkers(markers) {
      this.markers = markers;
      this.searching = false;
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

    onUpdateNotes(notes) {
      this.notes = notes;
      this.searching = false;
    }

    onToggleOverlayVisibility(overlay_id) {
      var overlay_ids = this.visible_overlays;
      var current_index = overlay_ids.indexOf(overlay_id);

      if( current_index > -1 ) {
        overlay_ids.splice(current_index, 1);
      }else {
        overlay_ids.push(overlay_id);
      }

      this.visible_overlays = overlay_ids;
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
