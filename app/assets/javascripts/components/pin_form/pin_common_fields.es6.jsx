class PinCommonFields extends React.Component {

  render () {
    return(
      <div>
        <div className="form-group form-group-title">
          <label>Pin title</label>
          <input type="text" placeholder="What will you call this pin?" onChange={this.updateAttribute.bind(this)} data-attribute='title' value={this.state.title} />
        </div>
        <div className="form-group form-group-description">
          <label>Description</label>
          <textarea rows="10" placeholder="A brief description of your pin. You can also describe an photograph, video or audio clip here." value={this.state.description} onChange={this.updateAttribute.bind(this)} data-attribute='description'></textarea>
        </div>
        <PinDateFields />
        <PinAttributionFields />
      </div>
    )
  }
}
PinCommonFields = Layers.bindComponentToMapPinStore(PinCommonFields);

