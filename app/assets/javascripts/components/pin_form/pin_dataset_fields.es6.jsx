class PinDatasetFields extends React.Component {
  render () {
    return(
      <PinAttachmentFields title="Choose your dataset" file_types=".txt,.csv,.tsv,.xls,.xlsm,.xlsx,.xlt,.xlw,.xlw" validation_failed_message="Please attach a dataset" />
    )
  }
}

PinDatasetFields = Layers.bindComponentToMapPinStore(PinDatasetFields);
