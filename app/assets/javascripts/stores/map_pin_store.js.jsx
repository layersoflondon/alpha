(() => {
  /*
  MapPinStore - the attributes we POST to the pins controller when creating a new pin
  */
  class MapPinStore {
    setDefaultState() {
      this.form_submit_disabled = false;
      this.title = '';
      this.description = '';
      this.link_url = '';
      this.attachment = '';
      this.video_url = '';
      this.date_from_day = '';
      this.date_from_month = '';
      this.date_from_year = '';
      this.date_to_day = '';
      this.date_to_month = '';
      this.date_to_year = '';
      this.collections = '';
      this.location = '';
      this.pin_form_visible = false;
      this.pin_form_lat_lng = {};
      this.pin_form_enabled = false;
      this.pin_type = null;
      this.attribution = "";
    }


    constructor() {
      this.setDefaultState();

      this.bindListeners({
          onSetPinLocation: MapPinActions.SET_PIN_LOCATION,
          onEnablePinForm: MapPinActions.ENABLE_PIN_FORM,
          onTogglePinForm: MapPinActions.TOGGLE_PIN_FORM,
          onResetForm: MapPinActions.RESET_FORM,
          onSetFormAttribute: MapPinActions.SET_FORM_ATTRIBUTE,
          onSetPinType: MapPinActions.SET_PIN_TYPE,

      });
    }

    onSetPinType(type) {
      this.pin_type = type;
    }

    onSetPinLocation(latlng) {
      this.pin_form_lat_lng = latlng;
    }

    onSetFormAttribute(attr) {
      // Attr will be an object with one key/value
      // e.g. {foo: "bar"}
      // we call toPairs to get an array if k,v
      pair = _.toPairs(attr)[0];
      //set an attribute on this object equal to the k, with v as the value
      this[pair[0]] = pair[1];
    }

    onEnablePinForm(enabled) {
      if( !enabled ){
        this.pin_form_visible = false;
      }
      this.pin_form_enabled = enabled;
    }

    onTogglePinForm(visible) {
      this.pin_form_enabled = visible;
      this.pin_form_visible = visible;
    }

    onResetForm() {
      this.setDefaultState();

      return true;
    }
  }

  this.MapPinStore = alt.createStore(MapPinStore, 'MapPinStore');
})();
