(() => {
  class MapPinStore {
    constructor() {
      this.pin_form_visible = false;

      this.bindListeners({
        onTogglePinForm: MapPinActions.TOGGLE_PIN_FORM,
        onSubmitForm: MapPinActions.SUBMIT_FORM
      });
    }

    onTogglePinForm(visible) {
      this.pin_form_visible = visible;
    }

    onSubmitForm() {
    }
  }

  this.MapPinStore = alt.createStore(MapPinStore, 'MapPinStore');
})();
