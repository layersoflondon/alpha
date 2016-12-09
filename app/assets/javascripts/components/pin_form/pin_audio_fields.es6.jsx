class PinAudioFields extends React.Component {
  render () {
    return(
    	<div className="form-grouping form-grouping--pin-type">
	      <PinAttachmentFields title="Select an audio file (.mp3)" field_name="audio" file_types=".mp3" required={true} validation_failed_message="Please attach an MP3 file" />
      </div>
    )
  }
}

PinAudioFields = Layers.bindComponentToMapPinStore(PinAudioFields);
