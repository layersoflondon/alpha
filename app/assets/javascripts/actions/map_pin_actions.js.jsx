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

    setFormAttribute(state) {
      return state;
    }

    setPinType(type) {
      return type;
    }

    confirmMainForm() {
      return true;
    }

    resetForm() {
      return true;
    }

    toggleAdvancedDates() {
      return true;
    }

    submitForm(pin_data) {
      return pin_data;
    }
  }

  this.MapPinActions = alt.createActions(MapPinActions);
})();
