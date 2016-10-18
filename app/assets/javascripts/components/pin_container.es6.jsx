class PinContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {expanded: props.expanded};
  }

  switchState() {
    this.setState({expanded: !this.state.expanded});
  }

  render () {
    var switchLabel = this.state.expanded ? "Back" : "See all pins for this location";

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
            <span><a href="#" onClick={this.switchState.bind(this)}>{switchLabel}</a></span>
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
