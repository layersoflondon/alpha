class PinAttachmentFields extends React.Component {

  updateAttachmentAttribute(event) {
    var current_state = this.state;
    var new_state = {title: "attached file!"};
    var reader = new FileReader();
    var file   = event.target.files[0];
    var name   = file.name;
    var state_attribute = event.target.dataset.attribute;


    reader.onload = (reader_event) => {
      MapPinActions.setAttachedFileField({file_name: name, file: reader_event.target.result});
    };

    reader.readAsDataURL(file);
  }

  render () {
    return(
      <div className="form-group form-group-upload">
        <label>{this.props.title}</label>
        <input type="file" name={this.props.field_name} onChange={this.updateAttachmentAttribute.bind(this)} data-parsley-required='true' />
      </div>
    );
  }
}

PinAttachmentFields = Layers.bindComponentToMapPinStore(PinAttachmentFields);
