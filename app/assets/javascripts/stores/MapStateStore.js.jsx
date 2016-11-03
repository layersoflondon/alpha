(() => {
  /*
  Manage our map view state....

  Actions to handle:
    * Moving(panning) the position to focus on a given pin or place
    * Zoom & fit to bounds

  */
  class MapStateStore {
    constructor() {
      this.map_position = null;
      this.bindListeners({
        onFocusPin: MapStateActions.FOCUS_PIN,
        onFocusPlace: MapStateActions.FOCUS_PLACE,
        onZoomToBounds: MapStateActions.ZOOM_TO_BOUNDS
      })
    }

    onFocusPin(pin) {
      this.map_position = pin.position;
    }

    onFocusPlace(place) {
      this.map_position = place.position;
    }

    onZoomToBounds(bounds) {
      this.zoom_bounds = bounds;
    }
  }

  this.MapStateStore = alt.createStore(MapStateStore, 'MapStateStore');
})();
