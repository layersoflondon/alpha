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

      this.editing = false; //set to true when we're editing a note
      this.advanced = false;

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
          onEditNote: MapPinActions.EDIT_NOTE,
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

    onEditNote(note) {
      this.setDefaultState();

      this.editing = true;

      this.title = note.title;
      this.description = note.description;
      this.link_url = note.link_url;
      //this.attached_file = note.attached_file;
      this.file_name = note.content_entry.resource.file_name;
      this.pin_type  = note.content_entry.resource.content_type_id;
      this.video_url = note.content_entry.video_url;

      switch(note.content_entry.resource.type) {
        case "text":
          this.content = note.content_entry.resource.plain;
          break;
        case "image":
          break;
        case "video":
          this.video_url = note.content_entry.resource.href;
          break;
        case "audio":
          break;
        case "dataset":
          break;
      }

      let date_from = moment(note.date_from, ['Do MMM YYYY']);
      let date_to   = moment(note.date_to,   ['Do MMM YYYY']);

      if(date_from.isValid()) {
        this.date_from_day = date_from.format('D');
        this.date_from_month = date_from.month()+1;
        this.date_from_year = date_from.year();
      }

      if(date_to.isValid()) {
        MapPinActions.toggleAdvancedDates();
        this.state.advanced = true;

        this.date_to_day = date_to.format('D');
        this.date_to_month = date_to.month()+1;
        this.date_to_year = date_to.year();
      }

      this.location = note.location;
      this.attribution = note.content_entry.attribution;

      this.pin_form_visible = true;
      this.pin_form_lat_lng = note.position;

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
