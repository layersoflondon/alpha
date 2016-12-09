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
      this.attached_file = '';
      this.file_name = '';
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
      this.main_form_confirmed = false;
      this.pin_form_lat_lng = {};
      this.pin_form_enabled = false;
      this.pin_type = null;
      this.attribution = "";
      this.content = "";

      this.saving = false;
      this.errors = {};
    }

    constructor() {
      this.setDefaultState();

      this.bindListeners({
          onSetPinLocation: MapPinActions.SET_PIN_LOCATION,
          onEnablePinForm: MapPinActions.ENABLE_PIN_FORM,
          onTogglePinForm: MapPinActions.TOGGLE_PIN_FORM,
          onResetForm: MapPinActions.RESET_FORM,
          onSetFormAttribute: MapPinActions.SET_FORM_ATTRIBUTE,
          onSetAttachedFileField: MapPinActions.SET_ATTACHED_FILE_FIELD,
          onSetPinType: MapPinActions.SET_PIN_TYPE,
          onToggleAdvancedDates: MapPinActions.TOGGLE_ADVANCED_DATES,
          onSubmitForm: MapPinActions.SUBMIT_FORM,
          onSetErrors: MapPinActions.SET_ERRORS,
          onConfirmMainForm: MapPinActions.CONFIRM_MAIN_FORM,
          onUnconfirmMainForm: MapPinActions.UNCONFIRM_MAIN_FORM
      });
    }

    onConfirmMainForm() {
      this.main_form_confirmed = true;
    }

    onUnconfirmMainForm() {
      this.main_form_confirmed = false;
    }

    onToggleAdvancedDates() {
      this.date_to_day = "";
      this.date_to_month = "";
      this.date_to_year = "";
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

    onSetAttachedFileField(file_object) {
      this.attached_file = file_object.file;
      this.file_name = file_object.file_name;
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

      if(!visible) {
        this.setDefaultState();
      }
    }

    onResetForm() {
      this.setDefaultState();

      return true;
    }

    onSubmitForm(pin_data) {
      this.setDefaultState();

      return true;
    }

    onSetErrors(errors) {
      this.errors = errors;

      return true;
    }
  }

  this.MapPinStore = alt.createStore(MapPinStore, 'MapPinStore');
})();
