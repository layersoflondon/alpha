class PinForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = MapPinStore.getState();
    this.stateChanged = this.stateChanged.bind(this);
  }

  componentWillMount() {
    MapPinStore.listen(this.stateChanged);
  }

  componentWillUnmount() {
    MapPinStore.unlisten(this.stateChanged);
  }

  stateChanged(state) {
    this.setState(state);

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

  updateAttribute(event) {
    var new_state = {};
    new_state[event.target.dataset.attribute] = event.target.value;
    this.setState(new_state);
  }

  updateAttachmentAttribute(event) {
    var current_state = this.state;
    var new_state = {};
    var reader = new FileReader();
    var file   = event.target.files[0];
    var name   = file.name;
    var state_attribute = event.target.dataset.attribute;

    reader.onload = (reader_event) => {
      new_state['attachment'] = reader_event.target.result;
      // set the form state
      this.setState(new_state);
    }

    reader.readAsDataURL(file);
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

  render () {
    var style = {display: (this.state.pin_form_visible ? 'block' : 'none')};

    return (
      <div className="m-add-pin" style={style}>
        <form onSubmit={this.savePinData.bind(this)}>
          <a href="#" onClick={this.hidePinForm.bind(this)} style={{float: "right", margin: "-30px -28px 0 0"}}>&times;</a>

          <div className="form-group form-group-title">
            <label>Pin title</label>
            <input type="text" placeholder="What will you call this pin?" onChange={this.updateAttribute.bind(this)} data-attribute='title' value={this.state.title} />
          </div>
          <div className="form-group form-group-description">
            <label>Description</label>
            <textarea rows="10" placeholder="Tell us your story or some details about this location. You can also describe an photograph, video or audio clip here." value={this.state.description} onChange={this.updateAttribute.bind(this)} data-attribute='description'></textarea>
          </div>
          <div className="form-group">
            <label>Link</label>
            <input type="text" placeholder="http://www.example.com" value={this.state.link_url} onChange={this.updateAttribute.bind(this)} data-attribute='link_url' />
          </div>
          <div className="form-group form-group-upload">
            <label>Add image/audio</label>
            <input type="file" onChange={this.updateAttachmentAttribute.bind(this)} />
          </div>
          <div className="form-group">
            <label>Add video (YouTube URL)</label>
            <input type="text" placeholder="http://www.youtube.com/34tonu3ntu" value={this.state.video_url} onChange={this.updateAttribute.bind(this)} data-attribute='video_url' />
          </div>
          <div className="dates">
            <div className="from">
              <div className="form-group">
                <label>Day</label>
                <input type="text" value={this.state.date_from_day} onChange={this.updateAttribute.bind(this)} data-attribute='date_from_day'  />
              </div>
              <div className="form-group">
                <label>Month</label>
                <input type="text" value={this.state.date_from_month} onChange={this.updateAttribute.bind(this)} data-attribute='date_from_month'  />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input type="text" value={this.state.date_from_year} onChange={this.updateAttribute.bind(this)} data-attribute='date_from_year'  />
              </div>
            </div>
            <p>to</p>
            <div className="to">

              <div className="form-group">
                <label>Day</label>
                <input type="text" value={this.state.date_to_day} onChange={this.updateAttribute.bind(this)} data-attribute='date_to_day'  />
              </div>
              <div className="form-group">
                <label>Month</label>
                <input type="text" value={this.state.date_to_month} onChange={this.updateAttribute.bind(this)} data-attribute='date_to_month' />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input type="text" value={this.state.date_to_year} onChange={this.updateAttribute.bind(this)} data-attribute='date_to_year'  />
              </div>
            </div>
          </div>

          <br/>
          Latitude: {this.state.pin_form_lat_lng.lat}, Longitude: {this.state.pin_form_lat_lng.lng}
          <div className="form-group">
            <input type="submit" value="Save my pin" disabled={this.state.form_submit_disabled} />
          </div>
        </form>
      </div>
    );
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
