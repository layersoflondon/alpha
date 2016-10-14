(() => {
  class MapViewStore {
    constructor() {
      this.focussed_pin = null;
      this.bindListeners({
        onFocusPin: MapViewActions.FOCUS_PIN
      })
    }

    onFocusPin(pin) {
      this.focussed_pin = pin;
    }
  }

  this.MapViewStore = alt.createStore(MapViewStore, 'MapViewStore');
})();
