class PinAudioFields extends React.Component {
  render () {
    let validate_attachment = this.state.file_name.length == 0;

    return(
    	<div className="form-grouping form-grouping--pin-type">
	      <PinAttachmentFields title="Select an audio file (.mp3)" field_name="audio" file_types=".mp3" required={validate_attachment} validation_failed_message="Please attach an MP3 file" />
      </div>
    )
  }
}

PinAudioFields = Layers.bindComponentToMapPinStore(PinAudioFields);
