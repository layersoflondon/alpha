class PinTextFields extends React.Component {

  render () {
    let validate_attachment = this.state.content.length==0 && this.state.file_name.length==0;

    return(
      <div className="form-grouping form-grouping--pin-type">
        <div className="form-group form-group-text">
          <label>Text Content</label>
          <textarea rows="10" placeholder="Paste or type the content you want to store against this pin." value={this.state.content} onChange={this.updateAttribute.bind(this)} data-attribute='content'></textarea>
        </div>

        <PinAttachmentFields title="Select a text file" field_name="text" file_types=".txt,.doc,.docx" required={validate_attachment} validation_failed_message="Please attach a text file" />
      </div>
    )
  }
}

PinTextFields = Layers.bindComponentToMapPinStore(PinTextFields);
