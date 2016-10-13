var Map         = ReactLeaflet.Map,
    Marker      = ReactLeaflet.Marker,
    Popup       = ReactLeaflet.Popup,
    TileLayer   = ReactLeaflet.TileLayer,
    ZoomControl = ReactLeaflet.ZoomControl;

class MapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = MapStore.getState();

    this.stateChanged = this.stateChanged.bind(this);
  }

  componentDidMount() {
    MapStore.listen(this.stateChanged);
  }

  componentWillUnmount() {
    MapStore.unlisten(this.stateChanged);
  }

  stateChanged(state) {
    this.setState(state);
  }

  handleMoved() {
    console.log("Moved!");
  }
  handleZoomed() {
    console.log("Zoomed!");
  }

  shouldComponentUpdate(nextProps, nextState) {
    /*
    fixme: we should always return false from here and hook into the Leaflet map object
    to update the pins, zoom and position given the nextState properties...
    */
    return true;
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    console.log(this.refs.map);

    return (
      <Map center={position} zoom={this.state.zoom} className="m-map" ref='map' onDragEnd={this.handleMoved.bind(this)} onZoomEnd={this.handleZoomed.bind(this)}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <ZoomControl position='bottomright' />

        {this.state.pins.map(function(pin){
          return (<Marker key={pin.id} position={pin.position}><Popup><span>{pin.name}</span></Popup></Marker>);
        })}
      </Map>
    )
  }
}
