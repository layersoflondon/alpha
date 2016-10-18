class PinForm extends React.Component {
  constructor(props) {
    super(props);

    var map_pin_store_state = MapPinStore.getState();

    this.state = {
      title: '',
      description: '',
      link_url: '',
      attachment: null,
      video_url: '',
      date_from_day: null,
      date_from_month: null,
      date_from_year: null,
      date_to_day: null,
      date_to_month: null,
      date_to_year: null,
      collections: [],
      pin_form_visible: map_pin_store_state.pin_form_visible
    };

    this.updateAttribute = this.updateAttribute.bind(this);
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

  debugForm(event) {
    event.preventDefault();

    console.log("\n\nForm state: ");
    console.log(this.state);
    console.log("\n\n");

    var current_state = MapPinStore.getState();
    var visible = current_state.pin_form_visible;

    MapPinActions.togglePinForm(!visible);
  }

  render () {
    var style = {display: (this.state.pin_form_visible ? 'block' : 'none')};

    return (
      <div className="m-add-pin" style={style}>
        <form onSubmit={this.debugForm.bind(this)}>
          <div className="form-group form-group-title">
            <label>Pin title</label>
            <input type="text" placeholder="What will you call this pin?" onChange={this.updateAttribute} data-attribute='title' />
          </div>
          <div className="form-group form-group-description">
            <label>Description</label>
            <textarea rows="10" placeholder="Tell us your story or some details about this location. You can also describe an photograph, video or audio clip here." onChange={this.updateAttribute} data-attribute='description'></textarea>
          </div>
          <div className="form-group">
            <label>Link</label>
            <input type="text" placeholder="http://www.example.com" onChange={this.updateAttribute} data-attribute='link_url' />
          </div>
          <div className="form-group form-group-upload">
            <label>Add image/audio</label>
            <input type="file" placeholder="http://www.example.com"  onChange={this.updateAttribute} data-attribute='attachment' />
          </div>
          <div className="form-group">
            <label>Add video (YouTube URL)</label>
            <input type="text" placeholder="http://www.youtube.com/34tonu3ntu"  onChange={this.updateAttribute} data-attribute='video_url' />
          </div>
          <div className="dates">
            <div className="from">
              <div className="form-group">
                <label>Day</label>
                <input type="text" onChange={this.updateAttribute} data-attribute='date_from.day'  />
              </div>
              <div className="form-group">
                <label>Month</label>
                <input type="text"  onChange={this.updateAttribute} data-attribute='date_from.month' />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input type="text" onChange={this.updateAttribute} data-attribute='date_from.year'  />
              </div>
            </div>
            <p>to</p>
            <div className="to">

              <div className="form-group">
                <label>Day</label>
                <input type="text" onChange={this.updateAttribute} data-attribute='date_from.day'  />
              </div>
              <div className="form-group">
                <label>Month</label>
                <input type="text" onChange={this.updateAttribute} data-attribute='date_from.month'  />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input type="text" onChange={this.updateAttribute} data-attribute='date_from.year'  />
              </div>
            </div>
          </div>

          <CollectionControl />

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
  attachment: React.PropTypes.object,
  video_url: React.PropTypes.string,
  date_from_day: React.PropTypes.integer,
  date_from_month: React.PropTypes.integer,
  date_from_year: React.PropTypes.integer,
  date_to_day: React.PropTypes.integer,
  date_to_month: React.PropTypes.integer,
  date_to_year: React.PropTypes.integer,
  collections: React.PropTypes.array,
};
