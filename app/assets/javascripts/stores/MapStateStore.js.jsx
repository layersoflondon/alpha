(() => {
  class MapStateStore {
    constructor() {
      this.map_position = null;
      this.bindListeners({
        onFocusPin: MapStateActions.FOCUS_PIN,
        onZoomToBounds: MapStateActions.ZOOM_TO_BOUNDS
      })
    }

    onFocusPin(pin) {
      this.map_position = pin.position;
    }

    onZoomToBounds(bounds) {
      this.zoom_bounds = bounds;
    }
  }

  this.MapStateStore = alt.createStore(MapStateStore, 'MapStateStore');
})();
