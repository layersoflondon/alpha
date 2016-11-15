class PinDatasetFields extends React.Component {
  render () {
    return(
      <PinAttachmentFields />
    )
  }
}

PinDatasetFields = AddPinFieldHooks(PinDatasetFields);
PinDatasetFields.displayName = "PinDatasetFields";
