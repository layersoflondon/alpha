class PinDatasetFields extends React.Component {
  render () {
    return(
      <PinAttachmentFields title="Choose your dataset" />
    )
  }
}

PinDatasetFields = Layers.bindComponentToMapPinStore(PinDatasetFields);
