class PinAudioFields extends React.Component {
  render () {
    return(
      <PinAttachmentFields />
    )
  }
}

PinAudioFields = Layers.bindComponentToMapPinStore(PinAudioFields);

