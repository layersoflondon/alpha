/*
Render a Pin (marker) on the map
*/
const Icon = L.Icon;

class MarkerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  addPinToThisLocation() {
    MapPinActions.setPinLocation(this.props.marker.position);
    MapPinActions.enablePinForm(true);
    MapPinActions.togglePinForm(true);
  }

  triggerAddPinForm() {
    MapPinActions.setPinLocation(this.props.marker.position);
    MapPinActions.enablePinForm(true);
    MapPinActions.togglePinForm(true);
  }

  render () {
    const content = this.props.marker.pins.map(function(pin){return <ContentEntry key={pin.id} content_entry={pin} />;});
    const icon = new L.Icon.Default({shadowUrl: '', popupAnchor: [-5, -38]});

    return (
      <Marker icon={icon} position={this.props.marker.position}>
        <Popup>
          <div className="m-popover">
            <ul>
              {content}
            </ul>

            <a href="#" className="m-popover-add-note" onClick={this.triggerAddPinForm.bind(this)}>Add note here</a>
          </div>
        </Popup>
      </Marker>
    );
  }
}
