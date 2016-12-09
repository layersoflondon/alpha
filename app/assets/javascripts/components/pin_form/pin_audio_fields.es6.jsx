class PinAudioFields extends React.Component {
  render () {
    return(
      <PinAttachmentFields title="Select an audio file (.mp3)" field_name="audio" file_types=".mp3" validation_failed_message="Please attach an MP3 file" />
    )
  }
}

PinAudioFields = Layers.bindComponentToMapPinStore(PinAudioFields);
