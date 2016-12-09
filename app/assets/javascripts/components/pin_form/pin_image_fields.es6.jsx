class PinImageFields extends React.Component {

  render () {
    return(
      <div>
        <PinAttachmentFields title="Select an image file" field_name="image" validation_failed_message="Please attach an image file" />
      </div>
    )
  }
}
PinImageFields = Layers.bindComponentToMapPinStore(PinImageFields);
