(() => {
  class MapPinActions {
    togglePinForm(visible) {
      return visible;
    }

    submitForm() {
      console.log("Form submitted...");
    }
  }

  this.MapPinActions = alt.createActions(MapPinActions);
})();
