class PinDatasetFields extends React.Component {
  render () {
    return(
      <PinAttachmentFields />
    )
  }
}

PinDatasetFields = Layers.bindComponentToMapPinStore(PinDatasetFields);
