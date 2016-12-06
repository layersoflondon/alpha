class PinImageFields extends React.Component {

  render () {
    return(
      <div>
        <PinAttachmentFields title="Select an image file" field_name="image" />
      </div>
    )
  }
}
PinImageFields = Layers.bindComponentToMapPinStore(PinImageFields);
