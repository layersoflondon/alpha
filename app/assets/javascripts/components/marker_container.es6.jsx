/*
Render a Pin (marker) on the map
*/
class MarkerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  switchState() {
    this.setState({expanded: !this.state.expanded});
  }

  addPinToThisLocation() {
    MapPinActions.setPinLocation(this.props.marker.position);
    MapPinActions.enablePinForm(true);
    MapPinActions.togglePinForm(true);
  }

  render () {
    const content = this.props.marker.pins.map(function(pin){return <ContentEntry key={pin.id} content_entry={pin} />;});

    return (
      <Marker position={this.props.marker.position}>
        <Popup>
          <div className="m-popover">
            <ul>
              {content}
            </ul>
          </div>
        </Popup>
      </Marker>
    );
  }
}
