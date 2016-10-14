var Map         = ReactLeaflet.Map,
    Marker      = ReactLeaflet.Marker,
    Popup       = ReactLeaflet.Popup,
    TileLayer   = ReactLeaflet.TileLayer,
    ZoomControl = ReactLeaflet.ZoomControl;

class MapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = SearchResultsStore.getState();

    this.map   = null;

    // bind our event handlers
    this.stateChanged = this.stateChanged.bind(this);
    this.mapViewStateChanged = this.mapViewStateChanged.bind(this);
  }

  componentDidMount() {
    // map data (markers) state
    SearchResultsStore.listen(this.stateChanged);

    // map view (position, focussed marker)
    MapStateStore.listen(this.mapViewStateChanged);
  }

  componentWillUnmount() {
    SearchResultsStore.unlisten(this.stateChanged);

    MapStateStore.unlisten(this.mapViewStateChanged);
  }

  handleMoved(event) {
    FilterStateActions.updateFilterCentre(this.refs.map.state.map.getCenter());
  }

  handleZoomed(event) {
    FilterStateActions.updateFilterBounds(this.refs.map.state.map.getBounds());
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
    var coords = state.map_position;
    var latlng = {lat: coords[0], lng: coords[1]};
    this.refs.map.state.map.panTo(latlng);
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    const pins = this.state.pins.map(function(pin) {
                 return (
                   <PinContainer key={pin.id} pin={pin} />
                 );
               });

    this.map = <Map center={position} zoom={this.state.zoom} className="m-map" ref='map' onDragEnd={this.handleMoved.bind(this)} onZoomEnd={this.handleZoomed.bind(this)}>
                 <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                 {pins}
               </Map>;

    return (this.map);
  }
}
