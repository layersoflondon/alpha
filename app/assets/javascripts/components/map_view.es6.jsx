var Map         = ReactLeaflet.Map,
    Marker      = ReactLeaflet.Marker,
    Popup       = ReactLeaflet.Popup,
    TileLayer   = ReactLeaflet.TileLayer,
    ZoomControl = ReactLeaflet.ZoomControl;

class MapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = SearchStore.getState();

    this.map   = null;

    // bind our event handlers
    this.stateChanged = this.stateChanged.bind(this);
  }

  componentDidMount() {
    // map data (markers) state
    SearchStore.listen(this.stateChanged);

    // map view (position, focussed marker)
    MapViewStore.listen(this.mapViewStateChanged);
  }

  componentWillUnmount() {
    SearchStore.unlisten(this.stateChanged);

    MapViewStore.unlisten(this.mapViewStateChanged);
  }

  handleMoved() {
    console.log("Moved!");
  }
  handleZoomed() {
    console.log("Zoomed!");
  }

  handleFocusOnPin(pin) {
    console.log("An event has been triggered to focus the map on ", pin);
  }

  shouldComponentUpdate(nextProps, nextState) {
    /*
    fixme: we should always return false from here and hook into the Leaflet map object
    to update the pins, zoom and position given the nextState properties...
    */
    return true;
  }

  stateChanged(state) {
    this.setState(state);
  }

  mapViewStateChanged(state) {
    console.log("\n\n");
    console.log("The map view state has changed", state);
    console.log("\n\n");
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    var pins = this.state.pins.map(function(pin){
                 return (<Marker key={pin.id} position={pin.position}><Popup><span>{pin.name}</span></Popup></Marker>);
               });

    this.map =  <Map center={position} zoom={this.state.zoom} className="m-map" ref='map' onDragEnd={this.handleMoved.bind(this)} onZoomEnd={this.handleZoomed.bind(this)}>
                  <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                  <ZoomControl position='bottomright' />

                  {pins}
                </Map>;

    return (this.map)
  }
}
