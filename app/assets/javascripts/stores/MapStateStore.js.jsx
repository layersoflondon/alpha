(() => {
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
      console.log(place);
      this.map_position = place.position;
    }

    onZoomToBounds(bounds) {
      this.zoom_bounds = bounds;
    }
  }

  this.MapStateStore = alt.createStore(MapStateStore, 'MapStateStore');
})();
