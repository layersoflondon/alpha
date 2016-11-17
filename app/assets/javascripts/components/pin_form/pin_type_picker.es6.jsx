class PinTypePicker extends React.Component {

  changePinType(event) {
    event.preventDefault();
    MapPinActions.setPinType(event.target.dataset.pinType);
  }

  render () {
    return(
        <div className="form-group form-group-pin-type">
          <label>What type of pin are you adding?</label>
          <a href="#" onClick={this.changePinType.bind(this)} className={this.state.pin_type == "text" ? "selected" : ""} data-pin-type="text">Just text</a>
          <br/>
          <a href="#" onClick={this.changePinType.bind(this)} className={this.state.pin_type == "image" ? "selected" : ""} data-pin-type="image">An image</a>
          <br/>
          <a href="#" onClick={this.changePinType.bind(this)} className={this.state.pin_type == "video" ? "selected" : ""} data-pin-type="video">A video</a>
          <br/>
          <a href="#" onClick={this.changePinType.bind(this)} className={this.state.pin_type == "audio" ? "selected" : ""} data-pin-type="audio">Some audio</a>
          <br/>
          <a href="#" onClick={this.changePinType.bind(this)}className={this.state.pin_type == "dataset" ? "selected" : ""} data-pin-type="dataset">A dataset</a>
          <Popover title="What's a dataset?">
            You might have data in a structured format about a place - some school attendance registers, census data or similar. If you have, you can upload this as a CSV or TSV file for researchers to use...
          </Popover>
        </div>
    )
  }
}

PinTypePicker = Layers.bindComponentToMapPinStore(PinTypePicker);