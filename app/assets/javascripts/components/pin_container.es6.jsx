/*
Render a Pin (marker) on the map
*/
class PinContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const content = <ContentEntry content_entry={this.props.pin} pin={true} />;
    const icon = new L.Icon.Default({shadowUrl: '', className: "pin-icon", popupAnchor: [-5, -38]});

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
