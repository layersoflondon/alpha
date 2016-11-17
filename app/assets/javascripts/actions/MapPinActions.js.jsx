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

    resetForm() {
      return true;
    }

    submitForm() {
      console.log("Form submitted...");
    }
  }

  this.MapPinActions = alt.createActions(MapPinActions);
})();
