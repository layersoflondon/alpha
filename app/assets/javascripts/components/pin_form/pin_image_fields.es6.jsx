class PinImageFields extends React.Component {
  render () {
    let validate_attachment = this.state.file_name.length == 0;

    return(
      <div className="form-grouping form-grouping--pin-type">
        <PinAttachmentFields title="Select an image file" field_name="image" required={validate_attachment} validation_failed_message="Please attach an image file" />
      </div>
    )
  }
}
PinImageFields = Layers.bindComponentToMapPinStore(PinImageFields);
