class PinTextFields extends React.Component {

  render () {
    return(
      <div className="form-grouping form-grouping--pin-type">
        <div className="form-group form-group-text">
          <label>Text Content</label>
          <textarea rows="10" placeholder="Paste or type the content you want to store against this pin." value={this.state.content} onChange={this.updateAttribute.bind(this)} data-attribute='content'></textarea>
        </div>

        <PinAttachmentFields title="Select a text file" field_name="text" file_types=".txt" validation_failed_message="Please attach a text file" />
      </div>
    )
  }
}

PinTextFields = Layers.bindComponentToMapPinStore(PinTextFields);
