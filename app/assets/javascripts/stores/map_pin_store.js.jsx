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

      this.collections = [];
      this.collection_id = null;
      this.collection_name = "";
      this.collection_description = "";
      this.collection_privacy = "open";

      this.location = '';
      this.pin_form_visible = false;
      this.main_form_confirmed = false;
      this.pin_form_lat_lng = {};
      this.pin_form_enabled = false;
      this.move_pin_form_enabled = false;
      this.pin_type = null;
      this.attribution = "";
      this.content = "";
      this.pin_content_entry_id = null;
      this.content_entry_id = null;
      this.collection_form_enabled = false;

      this.show_notification = false;
      this.notification = {};

      this.editing = false; //set to true when we're editing a note
      this.advanced = false;

      this.saving = false;
      this.errors = {};
    }

    constructor() {
      this.setDefaultState();

      this.bindListeners({
          onSetDefaultState: MapPinActions.SET_DEFAULT_STATE,
          onSetPinLocation: MapPinActions.SET_PIN_LOCATION,
          onEnablePinForm: MapPinActions.ENABLE_PIN_FORM,
          onTogglePinForm: MapPinActions.TOGGLE_PIN_FORM,
          onResetForm: MapPinActions.RESET_FORM,
          onSetFormAttribute: MapPinActions.SET_FORM_ATTRIBUTE,
          onSetAttachedFileField: MapPinActions.SET_ATTACHED_FILE_FIELD,
          onSetPinType: MapPinActions.SET_PIN_TYPE,
          onToggleAdvancedDates: MapPinActions.TOGGLE_ADVANCED_DATES,
          onEnableCollectionForm: MapPinActions.ENABLE_COLLECTION_FORM,
          onSetCollections: MapPinActions.SET_COLLECTIONS,
          onSetNotification: MapPinActions.SET_NOTIFICATION,
          onSubmitForm: MapPinActions.SUBMIT_FORM,
          onSetErrors: MapPinActions.SET_ERRORS,
          onEditNote: MapPinActions.EDIT_NOTE,
          onEditNoteLocation: MapPinActions.EDIT_NOTE_LOCATION,
          onConfirmMainForm: MapPinActions.CONFIRM_MAIN_FORM,
          onUnconfirmMainForm: MapPinActions.UNCONFIRM_MAIN_FORM
      });
    }

    onSetDefaultState() {
      this.setDefaultState();
    }

    onConfirmMainForm() {
      this.main_form_confirmed = true;
    }

    onUnconfirmMainForm() {
      this.main_form_confirmed = false;
    }

    onToggleAdvancedDates() {
      this.advanced = true;

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
        this.move_pin_form_enabled = false;
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

    onEnableCollectionForm(enabled) {
      this.collection_form_enabled = enabled;
    }

    onResetForm() {
      this.setDefaultState();

      return true;
    }

    onEditNote(note) {
      this._restoreStateFrom(note);
      this.pin_form_visible = true;

      return true;
    }

    onEditNoteLocation(note) {
      this._restoreStateFrom(note);
      this.pin_form_enabled = true;
      this.move_pin_form_enabled = true;

      return true;
    }

    onSetCollections(collections) {
      this.collections = collections;

      return true;
    }

    onSetNotification(notification) {
      this.show_notification = !_.isEqual(notification, {});
      this.notification = notification;
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

    _restoreStateFrom(note) {
      this.setDefaultState();

      this.editing = true;
      this.id = note.id;
      this.title = note.title;
      this.description = note.description;
      this.link_url = note.link_url;
      //this.attached_file = note.attached_file;
      this.file_name = note.content_entry.resource.file_name;
      this.pin_type  = note.content_entry.resource.content_type_id;
      this.video_url = note.content_entry.video_url;
      this.content_entry_id = note.content_entry.id;
      this.pin_content_entry_id = note.content_entry.pin_content_entry_id;

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

      window.x = note;
      if(note.collection && note.collection.id) {
        this.collection_id = note.collection.id;
        this.collection_name = note.collection.name;
        this.collection_description = note.collection.description;
        this.collections = note.collections;
      }

      let date_from = moment(note.date_from, ['Do MMM YYYY']);
      let date_to   = moment(note.date_to,   ['Do MMM YYYY']);

      if(date_from.isValid()) {
        this.date_from_day = date_from.format('D');
        this.date_from_month = date_from.month()+1;
        this.date_from_year = date_from.year();
      }

      if(date_to.isValid()) {
        this.advanced = true;
        this.date_to_day = date_to.format('D');
        this.date_to_month = date_to.month()+1;
        this.date_to_year = date_to.year();
      }

      //state.location_object.location.long_name
      this.location = note.location;
      this.location_object = {location: {long_name: note.location}};
      this.attribution = note.content_entry.attribution;
      window.note = note;

      this.pin_form_lat_lng = note.position;

      return true;
    }
  }

  this.MapPinStore = alt.createStore(MapPinStore, 'MapPinStore');
})();
