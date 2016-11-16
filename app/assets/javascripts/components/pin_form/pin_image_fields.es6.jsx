class PinImageFields extends React.Component {

  render () {
    return(
      <div>
        <PinAttachmentFields />
      </div>
    )
  }
}
PinImageFields = Layers.bindComponentToMapPinStore(PinImageFields);

