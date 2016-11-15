class PinAudioFields extends React.Component {
  render () {
    return(
      <PinAttachmentFields />
    )
  }
}

PinAudioFields = AddPinFieldHooks(PinAudioFields);
PinAudioFields.displayName = "PinAudioFields";

