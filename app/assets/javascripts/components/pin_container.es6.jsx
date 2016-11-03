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
    if(this.state.expanded) {
      var switchJsx = <span><a href="#" onClick={this.switchState.bind(this)}>Back</a></span>;
    }else {
      if(this.props.pin.content_entry.length) {
        var switchJsx = <span><a href="#" onClick={this.switchState.bind(this)}>See all pins for this location</a> or <a href="#" onClick={this.addPinToThisLocation.bind(this)}>Add a pin at this location</a></span>;
      }else {
        var switchJsx = <span><a href="#" onClick={this.addPinToThisLocation.bind(this)}>Add a pin at this location</a></span>;
      }
    }

    if(this.state.expanded) {
      var content = "expanded";
    }else {
      var content = "";
    }

    return (
      <Marker position={this.props.pin.position}>
        <Popup>
          <div className="m-popover">
            <h3>{this.props.pin.title}</h3>
            <p>
              {switchJsx}
            </p>

            <ul>
              {content}
            </ul>
          </div>
        </Popup>
      </Marker>
    );
  }
}

PinContainer.propTypes = {
  expanded: React.PropTypes.bool
};
