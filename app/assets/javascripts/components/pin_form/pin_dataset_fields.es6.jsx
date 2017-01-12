class PinDatasetFields extends React.Component {
  render () {
    let validate_attachment = this.state.file_name.length == 0;
    
    return(
    	<div className="form-grouping form-grouping--pin-type">
	      <PinAttachmentFields title="Choose your dataset" file_types=".txt,.csv,.tsv,.xls,.xlsm,.xlsx,.xlt,.xlw,.xlw" required={validate_attachment} validation_failed_message="Please attach a dataset" />
      </div>
    )
  }
}

PinDatasetFields = Layers.bindComponentToMapPinStore(PinDatasetFields);
