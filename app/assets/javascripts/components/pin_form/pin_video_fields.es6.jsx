class PinVideoFields extends React.Component {
  render () {


    return(
    	<div className="form-grouping form-grouping--pin-type">
	      <div className="form-group">
	        <label>Add video (YouTube URL)</label>
	        <input type="text" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" value={this.state.video_url} onChange={this.updateAttribute.bind(this)} data-attribute='video_url' data-parsley-required='true' data-parsley-type='url' data-parsley-error-message="Please add a YouTube URL" />
	      </div>
      </div>

      )
  }
}

PinVideoFields = Layers.bindComponentToMapPinStore(PinVideoFields);
