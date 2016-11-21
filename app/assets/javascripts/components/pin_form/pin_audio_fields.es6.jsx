class PinAudioFields extends React.Component {
  render () {
    return(
      <PinAttachmentFields title="Select an audio file" field_name="audio"/>
    )
  }
}

PinAudioFields = Layers.bindComponentToMapPinStore(PinAudioFields);

