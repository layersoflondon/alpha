(() => {
  class MapStateStore {
    constructor() {
      this.map_position = null;
      this.bindListeners({
        onFocusPin: MapStateActions.FOCUS_PIN
      })
    }

    onFocusPin(pin) {
      this.map_position = pin.position;
    }
  }

  this.MapStateStore = alt.createStore(MapStateStore, 'MapStateStore');
})();
