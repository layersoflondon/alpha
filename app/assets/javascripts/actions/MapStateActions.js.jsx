(() => {
  class MapStateActions {
    focusPin(pin) {
      return pin;
    }

    zoomToBounds(bounds) {
      return bounds;
    }
  }

  this.MapStateActions = alt.createActions(MapStateActions);
})();
