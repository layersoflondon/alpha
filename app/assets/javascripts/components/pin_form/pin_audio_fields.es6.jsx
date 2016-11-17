class PinAudioFields extends React.Component {
  render () {
    return(
      <PinAttachmentFields title="Select an audio file"/>
    )
  }
}

PinAudioFields = Layers.bindComponentToMapPinStore(PinAudioFields);

