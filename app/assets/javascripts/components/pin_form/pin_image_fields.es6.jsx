class PinImageFields extends React.Component {

  render () {
    return(
      <div className="form-grouping form-grouping--pin-type">
        <PinAttachmentFields title="Select an image file" field_name="image" validation_failed_message="Please attach an image file" />
      </div>
    )
  }
}
PinImageFields = Layers.bindComponentToMapPinStore(PinImageFields);
