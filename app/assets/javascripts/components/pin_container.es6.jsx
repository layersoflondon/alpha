class PinContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {expanded: props.expanded};
  }

  switchState() {
    this.setState({expanded: !this.state.expanded});
  }

  addPinToThisLocation() {
    const latlng = {lat: this.props.pin.position[0], lng: this.props.pin.position[1]};
    
    MapPinActions.setPinLocation(latlng);
    MapPinActions.enablePinForm(true);
    MapPinActions.togglePinForm(true);
  }

  render () {
    var switchLabel = this.state.expanded ? "Back" : "See all pins for this location";

    if(this.state.expanded) {
      var switchJsx = <span><a href="#" onClick={this.switchState.bind(this)}>Back</a></span>;
    }else {
      var switchJsx = <span><a href="#" onClick={this.switchState.bind(this)}>See all pins for this location</a> or <a href="#" onClick={this.addPinToThisLocation.bind(this)}>Add a pin at this location</a></span>;
    }

    if(this.state.expanded) {
      var content = this.props.pin.places.map(function(place){return (<p key={place.id}>{place.name}</p>)});
    }else {
      var content = "";
    }

    return (
      <Marker position={this.props.pin.position}>
        <Popup>
          <div className="m-popover">
            <h3>{this.props.pin.name}</h3>
            {switchJsx}

            {content}
          </div>
        </Popup>
      </Marker>
    );
  }
}

PinContainer.propTypes = {
  expanded: React.PropTypes.bool
};
