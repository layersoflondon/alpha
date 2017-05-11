class PinForm extends React.Component {
  stateChanged(state) {
    let current_state = MapPinStore.getState();

    if(current_state.pin_form_visible && current_state.pin_form_enabled) {
      const disabled_state = _.merge(MapPinStore.getState(), {form_submit_disabled: true});
      this.setState(disabled_state);

      Places.reverseGeocode(current_state.pin_form_lat_lng).then((nearby) => {
        if(nearby.length) {
          current_state.location = nearby[0].location.long_name;
          current_state.location_object = nearby[0];
        }

        current_state.form_submit_disabled = false;
        this.setState(current_state);
      }).catch((error) => {
        console.log("Fetching locations error", error);
      });
    }
  }

  confirmMainForm(event) {
    event.preventDefault();

    let form = $(event.target).closest('form').parsley();

    if(form.validate()) {
      MapPinActions.confirmMainForm();
    }
  }

  showMainForm(event) {
    event.preventDefault();
    MapPinActions.unconfirmMainForm();
  }

  savePinData(event) {
    event.preventDefault();

    const saving_state = _.merge(MapPinStore.getState(), {saving: true});
    this.setState(saving_state);

    let editing = this.state.editing;

    Pin.post(this.state).then((note) => {
      if(note.collection && !note.collection.public) {
        CollectionsStateActions.updateUserCollection(note.collection);
      }

      MapPinActions.resetForm();

      let year_from = moment(note.date_from, "DDD MMM YYYY", 'en').year();

      FilterStateActions.updateDefaultYearFrom(year_from);

      if(editing) {
        MapContainerActions.updateMarker(note);
      }else {
        MapContainerActions.addMarker(note);
      }

      // fixme: there's a bug where when we add a note into a new private collection, the collection appears in the public collections dropdown
      // we work around this by reloading the page and the proper state is given to the collections control component
      if(note.collection && !note.collection.public) {
        location.href = router.root;
      }
    }).catch((response) => {
      const errors = response.responseJSON ? response.responseJSON.errors : {};
      MapPinActions.setErrors({errorCode: response.status, errorMessages: errors});
    });
  }

  hidePinForm() {
    MapPinActions.togglePinForm(false);
  }

  mainForm () {
    var style = {display: (this.state.pin_form_visible ? 'block' : 'none')};
    var fields;

    if(this.state.pin_type) {
      switch(LoL.contentTypes[this.state.pin_type].name) {
        case "text":
          fields = <PinTextFields />;
          break;
        case "image":
          fields = <PinImageFields />;
          break;
        case "video":
          fields = <PinVideoFields />;
          break;
        case "dataset":
          fields = <PinDatasetFields />;
          break;
        case "audio":
          fields = <PinAudioFields />;
          break;
      }
    }

    return (
      <div className="m-add-pin" style={style}>
        <form onSubmit={this.confirmMainForm.bind(this)} data-parsley-validate={true}>
          <h3>Add Note</h3>
          <div className="form-content">
            <a href="#" className="close" onClick={this.hidePinForm.bind(this)} style={{float: "right", margin: "-30px -28px 0 0"}}>&times;</a>
            <PinCommonFields />
            <PinTypePicker />
            {fields}
            <CollectionControl all_collections={this.props.all_collections} user_collections={this.props.user_collections} />
          </div>
          <div className="form-actions">
            <div className="form-group">
              <input type="submit" value="Save and continue" className="main-button" disabled={this.state.form_submit_disabled} />
            </div>
          </div>
        </form>
      </div>
    );
  }

  attributionForm() {
    var style = {display: (this.state.pin_form_visible ? 'block' : 'none')};

    var errorMessage = <div />;

    if(typeof this.state.errors.errorMessages !== "undefined") {
      const errors = _.chain(this.state.errors.errorMessages).values().flatten().value();

      errorMessage = (
        <div>
          <h4>We couldn't save your pin!</h4>
          <ul>
            {errors.map((error, i) => {return <li key={i}>{error}</li>;})}
          </ul>
        </div>
      );
    }

    const spinner = <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>;
    let button;

    if(this.state.saving) {
      button = <button disabled={this.state.saving} className="main-button">Saving {spinner}</button>
    }else {
      button = <button disabled={this.state.form_submit_disabled} className="main-button">Save my note</button>
    }

    return(
      <div className="m-add-pin" style={style}>
        <form onSubmit={this.savePinData.bind(this)}>
          <h3>Using someone else's stuff?</h3>
          <div className="form-content">
            <a href="#" className="close" onClick={this.hidePinForm.bind(this)} style={{float: "right", margin: "-30px -28px 0 0"}}>&times;</a>

            <PinAttributionFields show_form={this.state.attribution !== ""}/>

          </div>
          <div className="form-actions">
            <div className="form-group">
              <a href="#" onClick={this.showMainForm.bind(this)} className="back-button">Edit note details again</a>
              {button}
            </div>

            {errorMessage}
          </div>
        </form>
      </div>
    );
  }

  movePinForm() {
    var style = {display: (this.state.pin_form_visible ? 'block' : 'none')};

    var errorMessage = <div />;

    if(typeof this.state.errors.errorMessages !== "undefined") {
      const errors = _.chain(this.state.errors.errorMessages).values().flatten().value();

      errorMessage = (
        <div>
          <h4>We couldn't save your pin!</h4>
          <ul>
            {errors.map((error, i) => {return <li key={i}>{error}</li>;})}
          </ul>
        </div>
      );
    }

    const spinner = <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>;
    let button;

    if(this.state.saving) {
      button = <button disabled={this.state.saving} className="main-button">Saving {spinner}</button>
    }else {
      button = <button disabled={this.state.form_submit_disabled} className="main-button">Save my note</button>
    }

    return(
      <div className="m-add-pin" style={style}>
        <form onSubmit={this.savePinData.bind(this)}>
          <h3>You're about to change this note's location...</h3>
          <div className="form-content">
            <a href="#" className="close" onClick={this.hidePinForm.bind(this)} style={{float: "right", margin: "-30px -28px 0 0"}}>&times;</a>

            Are you sure?

          </div>
          <div className="form-actions">
            <div className="form-group">
              <a href="#" onClick={this.showMainForm.bind(this)} className="back-button">Edit pin details again</a>
              {button}
            </div>

            {errorMessage}
          </div>
        </form>
      </div>
    );
  }

  loginMessage() {
    var style = {display: (this.state.pin_form_visible ? 'block' : 'none')};

    return (
      <div className="m-add-pin" style={style}>
        <form>
          <h3>Adding some new content?</h3>

          <div className="form-content">
            <a href="#" className="close" onClick={this.hidePinForm.bind(this)} style={{float: "right", margin: "-30px -28px 0 0"}}>&times;</a>

            <h2>You'll need to be logged in first.</h2>
            <p>You can sign in to your account <a href="/users/sign_in?adding_pin=true">here</a>.</p>
            <p>Not registered yet? Create a <a href="/users/sign_up?adding_pin=true">new account</a> to get started!</p>
          </div>
        </form>
      </div>
    );
  }

  render() {
    const user_id = $("head meta[name='user-id']").attr('content');

    if(!user_id) {
      return this.loginMessage();
    }else if( this.state.move_pin_form_enabled) {
      return this.movePinForm();
    }else if (this.state.main_form_confirmed) {
      return this.attributionForm();
    } else {
      return this.mainForm();
    }
  }
}

PinForm.PropTypes = {
  form_submit_disabled: React.PropTypes.bool,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  link_url: React.PropTypes.string,
  attachment: React.PropTypes.string,
  video_url: React.PropTypes.string,
  date_from_day: React.PropTypes.integer,
  date_from_month: React.PropTypes.integer,
  date_from_year: React.PropTypes.integer,
  date_to_day: React.PropTypes.integer,
  date_to_month: React.PropTypes.integer,
  date_to_year: React.PropTypes.integer,
  collections: React.PropTypes.array,
  collection_id: React.PropTypes.integer,
  collection_name: React.PropTypes.string,
  collection_description: React.PropTypes.string,
  collection_privacy: React.PropTypes.string,
  location: React.PropTypes.string,
  location_object: React.PropTypes.object,
};

PinForm = Layers.bindComponentToMapPinStore(PinForm);
