class PinImageFields extends React.Component {

  render () {
    return(
      <div>
        <PinAttachmentFields title="Select an image file" />
      </div>
    )
  }
}
PinImageFields = Layers.bindComponentToMapPinStore(PinImageFields);

