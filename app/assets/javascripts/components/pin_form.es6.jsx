class PinForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = MapPinStore.getState();
    this.stateChanged = this.stateChanged.bind(this);
  }

  componentDidMount() {
    MapPinStore.listen(this.stateChanged);
  }

  componentWillUnmount() {
    MapPinStore.unlisten(this.stateChanged);
  }

  stateChanged(state) {
    this.setState(state);
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

  savePinDate(event) {
    event.preventDefault();

    console.log("Saving form state", this.state);

    var attachment = "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg";
    if(this.state.attachment.length) {
      attachment = this.state.attachment;
    }

    var content = {
      title: this.state.description,
      location: "Dagenham",
      resource: {type: "image", url: attachment}
    }
    var pin = {
      title: this.state.title,
      location: "Dagenham",
      date_from: (new Date()).toString(),
      lat: this.state.pin_form_lat_lng.lat,
      lng: this.state.pin_form_lat_lng.lng,
      user_id: 1,
      data: [content]
    };

    SearchResultsActions.postPin(pin);

    // clear the attachment field - FIXME figure out how to do this as a controled component
    $(event.target).find('.form-group-upload input[type=file]').get(0).value = '';

    var current_state = MapPinStore.getState();
    var visible = current_state.pin_form_visible;

    MapPinActions.resetForm();
    MapPinActions.togglePinForm(!visible);
  }

  render () {
    var style = {display: (this.state.pin_form_visible ? 'block' : 'none')};

    return (
      <div className="m-add-pin" style={style}>
        <form onSubmit={this.savePinDate.bind(this)}>
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
            <input type="submit" placeholder="Save my pin" />
          </div>
        </form>
      </div>
    );
  }
}

PinForm.PropTypes = {
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
};
