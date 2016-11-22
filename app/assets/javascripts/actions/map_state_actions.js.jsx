(() => {
  class MapStateActions {
    focusPin(pin) {
      return pin;
    }

    focusPlace(place) {
      return place;
    }

    zoomToBounds(bounds) {
      return bounds;
    }
  }

  this.MapStateActions = alt.createActions(MapStateActions);
})();
