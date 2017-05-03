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

    unconfirmMainForm() {
      return true;
    }

    resetForm() {
      return true;
    }

    toggleAdvancedDates() {
      return true;
    }

    setAttachedFileField(file) {
      return file;
    }

    editNote(note) {
      return note;
    }

    editNoteLocation(note) {
      return note;
    }

    setCollections(collections) {
      return collections;
    }

    submitForm(pin_data) {
      return pin_data;
    }

    setErrors(errors) {
      return errors;
    }
  }

  this.MapPinActions = alt.createActions(MapPinActions);
})();
