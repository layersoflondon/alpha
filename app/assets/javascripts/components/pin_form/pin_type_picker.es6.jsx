class PinTypePicker extends React.Component {

  changePinType(event) {
    event.preventDefault();
    MapPinActions.setPinType(event.target.dataset.pinType);
  }

  render () {
    return(
        <div className="form-group form-group-pin-type">
          <label>What type of pin are you adding?</label>
          <a href="#" onClick={this.changePinType.bind(this)} className={this.state.pin_type == "text" ? "selected" : ""} data-pin-type="text">Text</a>
          <br/>
          <a href="#" onClick={this.changePinType.bind(this)} className={this.state.pin_type == "image" ? "selected" : ""} data-pin-type="image">Image</a>
          <br/>
          <a href="#" onClick={this.changePinType.bind(this)} className={this.state.pin_type == "video" ? "selected" : ""} data-pin-type="video">Video</a>
          <br/>
          <a href="#" onClick={this.changePinType.bind(this)} className={this.state.pin_type == "audio" ? "selected" : ""} data-pin-type="audio">Audio</a>
          <br/>
          <a href="#" onClick={this.changePinType.bind(this)}className={this.state.pin_type == "dataset" ? "selected" : ""} data-pin-type="dataset">A Dataset</a>
        </div>
    )
  }
}

PinTypePicker = Layers.bindComponentToMapPinStore(PinTypePicker);