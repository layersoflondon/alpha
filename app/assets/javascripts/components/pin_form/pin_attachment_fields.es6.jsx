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
    const attached_file_notice = (this.state.editing && this.state.file_name.length) ? <span>(this will replace <strong>{this.state.file_name}</strong>)</span> : '';

    return(
      <div className="form-group form-group-upload">
        <label>{this.props.title} {attached_file_notice}</label>
        <input type="file" name={this.props.field_name} onChange={this.updateAttachmentAttribute.bind(this)} data-parsley-required={this.props.required} data-parsley-error-message={this.props.validation_failed_message} accept={this.props.file_types} />
      </div>
    );
  }
}

PinAttachmentFields = Layers.bindComponentToMapPinStore(PinAttachmentFields);
