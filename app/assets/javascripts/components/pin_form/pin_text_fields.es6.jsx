class PinTextFields extends React.Component {

  render () {
    return(
      <div className="form-group form-group-text">
        <label>Text Content</label>
        <textarea rows="10" placeholder="Paste or type the content you want to store against this pin." value={this.state.text} onChange={this.updateAttribute.bind(this)} data-attribute='text'></textarea>
      </div>
    )
  }
}

PinTextFields = Layers.bindComponentToMapPinStore(PinTextFields);



