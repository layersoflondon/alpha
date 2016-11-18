class PinTypePicker extends React.Component {

  changePinType(event,type) {
    event.preventDefault();
    MapPinActions.setPinType(type);
  }

  className(type) {
    return this.state.pin_type == type ? "selected" : ""
  }

  render () {
    return(
        <div className="form-group form-group-pin-type">
          <label>What type of pin are you adding?</label>

          <a href="#" onClick={(event) => {this.changePinType(event,'text')}} className={this.className('text')}><span>Just text</span></a>
          <a href="#" onClick={(event) => {this.changePinType(event,'image')}} className={this.className('image')}><span>An image</span></a>
          <a href="#" onClick={(event) => {this.changePinType(event,'video')}} className={this.className('video')}><span>A video</span></a>
          <a href="#" onClick={(event) => {this.changePinType(event,'audio')}} className={this.className('audio')}><span>Some audio</span></a>
          <a href="#" onClick={(event) => {this.changePinType(event,'dataset')}} className={this.className('dataset')}><span>A dataset</span></a>
          <Popover title="What's a dataset?">
            You might have data in a structured format about a place - some school attendance registers, census data or similar. If you have, you can upload this as a CSV or TSV file for researchers to use...
          </Popover>
        </div>
    )
  }
}

PinTypePicker = Layers.bindComponentToMapPinStore(PinTypePicker);