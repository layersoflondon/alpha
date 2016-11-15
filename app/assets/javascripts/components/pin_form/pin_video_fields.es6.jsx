class PinVideoFields extends React.Component {
  render () {
    return(
      <div className="form-group">
        <label>Add video (YouTube URL)</label>
        <input type="text" placeholder="http://www.youtube.com/34tonu3ntu" value={this.state.video_url} onChange={this.updateAttribute.bind(this)} data-attribute='video_url' />
      </div>

      )
  }
}

PinVideoFields = AddPinFieldHooks(PinVideoFields);
PinVideoFields.displayName = "PinVideoFields";

