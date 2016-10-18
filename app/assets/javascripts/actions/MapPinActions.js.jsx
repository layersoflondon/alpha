(() => {
  class MapPinActions {
    setPinLocation(latlng) {
      return latlng;
    }

    enablePinForm(enable) {
      return enable;
    }

    togglePinForm(visible) {
      return visible;
    }

    setPinLocation(latlng) {
      return latlng;
    }

    submitForm() {
      console.log("Form submitted...");
    }
  }

  this.MapPinActions = alt.createActions(MapPinActions);
})();
