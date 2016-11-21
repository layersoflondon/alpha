class PinCommonFields extends React.Component {

  render () {
    return(
      <div>
        <div className="form-group form-group-title">
          <label>Pin title</label>
          <input type="text" placeholder="Type a useful title for your entry (for example: Barking Park Mayday festival photos)" onChange={this.updateAttribute.bind(this)} data-attribute='title' value={this.state.title} />
        </div>
        <div className="form-group form-group-description">
          <label>Description</label>
          <textarea rows="12" placeholder="Describe in no more than 250 words what your note, story, or memory is about" value={this.state.description} onChange={this.updateAttribute.bind(this)} data-attribute='description'></textarea>
        </div>
        <div className="form-group form-group-link-url">
          <label>Website URL</label>
          <input type="text" placeholder="If there's a website you want to link to for this entry, enter the address here" onChange={this.updateAttribute.bind(this)} data-attribute='link_url' value={this.state.link_url} />
        </div>
        <PinDateFields advanced={false}/>
      </div>
    )
  }
}
PinCommonFields = Layers.bindComponentToMapPinStore(PinCommonFields);

