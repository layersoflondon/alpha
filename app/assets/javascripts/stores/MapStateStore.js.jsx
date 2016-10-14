(() => {
  class MapStateStore {
    constructor() {
      this.focussed_pin = null;
      this.bindListeners({
        onFocusPin: MapStateActions.FOCUS_PIN
      })
    }

    onFocusPin(pin) {
      this.focussed_pin = pin;
    }
  }

  this.MapStateStore = alt.createStore(MapStateStore, 'MapStateStore');
})();
