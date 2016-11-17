class PinForm extends React.Component {

  stateChanged(state) {

    var current_state = MapPinStore.getState();

    if(current_state.pin_form_visible && current_state.pin_form_enabled) {
      const disabled_state = _.merge(MapPinStore.getState(), {form_submit_disabled: true});
      this.setState(disabled_state);

      SearchResultsSource.getNearbyLocations(current_state.pin_form_lat_lng).then((nearby) => {
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
    this.setState({main_form_confirmed: true});
  }

  showMainForm(event) {
    event.preventDefault();
    this.setState({main_form_confirmed: false});
  }


  savePinData(event) {
    event.preventDefault();

    var attachment = "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg";
    if(this.state.attachment.length) {
      attachment = this.state.attachment;
    }

    console.log("POSTING PIN", this.state);

    const pin = {
      title: this.state.title,
      location: this.state.location,
      date_from: (new Date()).toString(),
      lat: this.state.pin_form_lat_lng.lat,
      lng: this.state.pin_form_lat_lng.lng,
      user_id: 1,

      content_entry: {
        title: this.state.description,
        resource: {type: "image", url: attachment}
      }
    };

    SearchResultsActions.postPin(pin);

    // clear the attachment field - FIXME figure out how to do this as a controled component
    $(event.target).find('.form-group-upload input[type=file]').get(0).value = '';

    const current_state = MapPinStore.getState();
    const visible = current_state.pin_form_visible;

    MapPinActions.resetForm();
    MapPinActions.togglePinForm(!visible);
  }

  hidePinForm() {
    const current_state = MapPinStore.getState();
    MapPinActions.togglePinForm(!current_state.pin_form_visible);
  }

  mainForm () {
    var style = {display: (this.state.pin_form_visible ? 'block' : 'none')};
    var fields;
    switch(this.state.pin_type) {
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

    return (
      <div className="m-add-pin" style={style}>
        <form onSubmit={this.confirmMainForm.bind(this)}>
          <h3>Add Pin</h3>
          <div className="form-content">
            <a href="#" onClick={this.hidePinForm.bind(this)} style={{float: "right", margin: "-30px -28px 0 0"}}>&times;</a>
            <PinCommonFields />
            <PinTypePicker />
            {fields}
            <div className="form-group">
              <input type="submit" value="Save and continue" disabled={this.state.form_submit_disabled} />
            </div>
          </div>
        </form>
      </div>
    );
  }

  attributionForm() {
    var style = {display: (this.state.pin_form_visible ? 'block' : 'none')};
    return(
      <div className="m-add-pin" style={style}>
        <form onSubmit={this.savePinData.bind(this)}>
            <h3>Using someone else's stuff?</h3>
          <div className="form-content">
            <PinAttributionFields show_form={this.state.attribution !== ""}/>
            <div className="form-group">
              <a href="#" onClick={this.showMainForm.bind(this)}>Edit pin details again</a>
              <input type="submit" value="Save my pin" disabled={this.state.form_submit_disabled} />
            </div>
          </div>
        </form>

      </div>


    )
  }

  render() {
    if (this.state.main_form_confirmed) {
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
  location: React.PropTypes.string,
  location_object: React.PropTypes.object
};

PinForm = Layers.bindComponentToMapPinStore(PinForm);
