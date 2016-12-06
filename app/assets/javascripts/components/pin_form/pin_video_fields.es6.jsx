class PinVideoFields extends React.Component {
  render () {


    return(
      <div className="form-group">
        <label>Add video (YouTube URL)</label>
        <input type="text" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" value={this.state.video_url} onChange={this.updateAttribute.bind(this)} data-attribute='video_url' data-parsley-required='true' data-parsley-type='url' />
      </div>

      )
  }
}

PinVideoFields = Layers.bindComponentToMapPinStore(PinVideoFields);
