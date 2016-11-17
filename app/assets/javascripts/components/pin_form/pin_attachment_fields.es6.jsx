class PinAttachmentFields extends React.Component {

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
    };

    reader.readAsDataURL(file);
  }

  render () {
    return(
      <div className="form-group form-group-upload">
        <label>{this.props.title}</label>
        <input type="file" onChange={this.updateAttachmentAttribute.bind(this)} />
      </div>
    );
  }
}

PinAttachmentFields = Layers.bindComponentToMapPinStore(PinAttachmentFields);

