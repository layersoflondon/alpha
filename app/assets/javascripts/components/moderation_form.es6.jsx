class ModerationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = MapModerationStore.getState();
    this.stateChanged = this.stateChanged.bind(this);
  }

  stateChanged(state) {
    this.setState(state);
  }

  componentDidMount() {
    MapModerationStore.listen(this.stateChanged);
  }

  componentWillUnmount() {
    MapModerationStore.unlisten(this.stateChanged);
  }

  hideModerationForm() {
    MapModerationActions.dismissModerationForm();
  }

  flagContent(event) {
    event.preventDefault();
    
    if(this.state.type == 'content_entry') { // the user is flagging some content in a pin popover
      Pin.flag(this.state.moderating.id).then((response) => {
        MapModerationActions.dismissModerationForm();
      }).catch((response) => {
        console.log("Couldn't flag content")
      });
    }else if(this.state.type == 'georeferenced_overlay') {
      GeoreferencedOverlay.flagImage(this.state.moderating.georeferencer_id).then((response) => {
        MapModerationActions.dismissModerationForm();
      }).catch((response) => {
        console.log("Failed to flag georeferenced image");
      });
    }
  }

  render() {
    let form = null;
    let style = {display: this.state.moderating==null ? 'none' : 'block'};

    let type_label = '';
    let form_text = '';
    switch(this.state.type) {
      case 'content_entry':
        type_label = "content entry";
        form_text = 'If this content entry is inappropriate or requires attention, you can flag it to the moderators. Do you want to flag this content?';
        break;
      case 'georeferenced_overlay':
        type_label = "overlay";
        form_text = 'If this overlay looks funny or needs some attention, you can flag it to the moderators. Do you want to flag this overlay?';
        break;
      default:
        type_label = this.state.type;
    }

    if(this.state.moderating) {
      form = (
        <div className="m-add-pin" style={style}>
          <form onSubmit={this.flagContent.bind(this)}>
            <h3>Flag this {type_label}</h3>
            <div className="form-content">
              <a href="#" className="close" onClick={this.hideModerationForm.bind(this)} style={{float: "right", margin: "-30px -28px 0 0"}}>&times;</a>
              {form_text}
            </div>

            <div className="form-actions">
              <div className="form-group">
                <button disabled={this.state.form_submit_disabled} className="main-button">Yes, flag this {type_label}</button>
              </div>
            </div>
          </form>
        </div>
      );
    }

    return (<div style={style}>{form}</div>);
  }
}
