class ContentEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {show_text: false, text: "", text_content: ""}
  }

  showResource() {
    const content = this.props.content_entry;

    overlay = new ContentOverlay(content);
    overlay.render();
  }

  editContentEntry() {
    // the 'content_entry' in the props is a Note, displayed as a list item
    MapPinActions.editNote(this.props.content_entry);
  }

  editNoteLocation() {
    MapPinActions.editNoteLocation(this.props.content_entry);
  }

  flagContentEntry(id) {
    Pin.flag(id).then((response) => {
      console.log("success",response)
    }).catch((response) => {
      console.log("fail", response)
    })
  }

  render () {
    var text = "";
    if(this.state.show_text) {
      text = (
        <div>
          <br/>
          <p>{this.state.text}</p>
          <p>{this.state.text_content}</p>
          <hr/>
        </div>
      );
    }

    var pinned = "";
    if(this.props.content_entry.pinned_on_date) {
      pinned = <p>Pinned on {this.props.content_entry.pinned_on_date}</p>;
    }

    if(typeof this.props.content_entry.content_entry.resource === "undefined" ) { // a marker with associated resource
      var link = (
        <div>
          <h3>{this.props.content_entry.content_entry.title}</h3>
          {text}
          {pinned}
        </div>
      );
    }else {
      const icon = LoL.urls[this.props.content_entry.content_entry.resource.type];

      var link = (
        <a href="#" onClick={this.showResource.bind(this)}>
          <div className="icon" dangerouslySetInnerHTML={{__html: LoL.urls[this.props.content_entry.content_entry.resource.type]}}>
          </div>

          <h3>{this.props.content_entry.content_entry.title}</h3>
          {text}
          {pinned}
        </a>
      );
    }

    let edit_note_button = '';
    let edit_location_button = '';

    if(this.props.content_entry.editable) {
      edit_note_button     = <span className="edit-button" onClick={this.editContentEntry.bind(this)}><i className="fa fa-pencil" aria-hidden="true"></i></span>;
      edit_location_button = <span className="edit-button" onClick={this.editNoteLocation.bind(this)}><i className="fa fa-map-marker" aria-hidden="true"></i></span>;
    }

    flag_button = <span className="edit-button flag-button" onClick={this.flagContentEntry.bind(this, this.props.content_entry.content_entry.id)}><i className="fa fa-flag"></i></span>;

    return (
      <li>
      {this.props.id}
        {edit_location_button} {edit_note_button} {flag_button}

        {link}
      </li>
    );
  }
}
