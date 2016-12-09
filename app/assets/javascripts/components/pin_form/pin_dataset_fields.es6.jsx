class PinDatasetFields extends React.Component {
  render () {
    return(
    	<div className="form-grouping form-grouping--pin-type">
	      <PinAttachmentFields title="Choose your dataset" file_types=".txt,.csv,.tsv,.xls,.xlsm,.xlsx,.xlt,.xlw,.xlw" required={true} validation_failed_message="Please attach a dataset" />
      </div>
    )
  }
}

PinDatasetFields = Layers.bindComponentToMapPinStore(PinDatasetFields);
