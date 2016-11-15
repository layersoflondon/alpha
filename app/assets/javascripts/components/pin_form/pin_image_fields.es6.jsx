class PinImageFields extends React.Component {

  render () {
    return(
      <div>
        <PinAttachmentFields />
      </div>
    )
  }
}
PinImageFields = AddPinFieldHooks(PinImageFields);
PinImageFields.displayName = "PinImageFields";


