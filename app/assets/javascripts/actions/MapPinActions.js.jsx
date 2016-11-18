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
      return (dispatch) => {
        dispatch();
        Pin.post(pin_data).then((new_pin) => {
          console.log("Got new pin!", new_pin);
          this.addPin(new_pin);
        }).catch((error) => {
          console.log("Error adding pin. Response: ", error);
        })
      }
    }
  }

  this.MapPinActions = alt.createActions(MapPinActions);
})();
