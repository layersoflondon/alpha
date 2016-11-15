class PinAttributionFields extends React.Component {
  render() {
    return(
      <div className="form-group form-group-attribution">
        <label>Image attribution</label>
        <input type="text" placeholder="Who does this image belong to?" onChange={this.updateAttribute.bind(this)} data-attribute='attribution' value={this.state.attribution} />
      </div>
    )
  }

}
PinAttributionFields = AddPinFieldHooks(PinAttributionFields);
PinAttributionFields.displayName = "PinAttributionFields";