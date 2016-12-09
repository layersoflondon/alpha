class PinDatasetFields extends React.Component {
  render () {
    return(
      <PinAttachmentFields title="Choose your dataset" file_types=".txt,.csv,.tsv,.xls,.xlsm,.xlsx,.xlt,.xlw,.xlw"/>
    )
  }
}

PinDatasetFields = Layers.bindComponentToMapPinStore(PinDatasetFields);
