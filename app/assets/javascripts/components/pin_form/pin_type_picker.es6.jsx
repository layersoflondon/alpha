class PinTypePicker extends React.Component {

  changePinType(event,type) {
    event.preventDefault();
    MapPinActions.setPinType(type);
  }

  className(type) {
    return this.state.pin_type == type ? "selected" : ""
  }

  render () {
    const content_types = Object.keys(LoL.contentTypes).map((type_id) => {
        const type_obj = LoL.contentTypes[type_id];
        return <a key={type_id} href="#" onClick={(event) => {this.changePinType(event, type_id)}} className={this.className(type_obj.name)}><span>{type_obj.description}</span></a>;
    });
    return(
        <div className="form-group form-group-pin-type">
          <label>What type of pin are you adding?</label>

          {content_types}

          <Popover title="What's a dataset?">
            You might have data in a structured format about a place - some school attendance registers, census data or similar. If you have, you can upload this as a CSV or TSV file for researchers to use...
          </Popover>
        </div>
    )
  }
}

PinTypePicker = Layers.bindComponentToMapPinStore(PinTypePicker);