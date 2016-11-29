/*
Render a Pin (marker) on the map
*/
class PinContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const content = <ContentEntry content_entry={this.props.pin} pin={true} />;
    const icon    = L.divIcon({className: "pin-icon"});

    return (
      <Marker icon={icon} position={this.props.pin.position}>
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
