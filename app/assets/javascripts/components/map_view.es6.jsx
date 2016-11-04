var Map         = ReactLeaflet.Map,
    Marker      = ReactLeaflet.Marker,
    Popup       = ReactLeaflet.Popup,
    TileLayer   = ReactLeaflet.TileLayer,
    ZoomControl = ReactLeaflet.ZoomControl;

class MapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = SearchResultsStore.getState();

    this.map    = null;
    this.bounds = [];

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
    const position = this.refs.map.state.map.getCenter();

    FilterStateActions.updateFilterCentre({lat: position.lat, lng: position.lng});
  }

  handleZoomed(event) {
    const _map   = this.refs.map.state.map;
    const bounds = _map.getBounds();
    const sw = {lat: bounds._southWest.lat, lng: bounds._southWest.lng};
    const ne = {lat: bounds._southWest.lat, lng: bounds._southWest.lng};

    const northEast = bounds.getNorthEast();
    const radius    = Math.floor(northEast.distanceTo(_map.getCenter()));

    FilterStateActions.updateFilterBounds({bounds: {southWest: sw, northEast: ne}, radius: radius});
  }

  stateChanged(state) {
    this.setState(state);
  }

  mapViewStateChanged(state) {
    var latlng = state.map_position;
    this.refs.map.state.map.panTo(latlng);
  }

  triggerAddPinDialog(event) {
    const latlng = {lat: event.latlng.lat, lng: event.latlng.lng};
    var add_pin_state = MapPinStore.getState();

    MapPinActions.setPinLocation(latlng);
    MapPinActions.togglePinForm(add_pin_state.pin_form_enabled);
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    const marker_containers = this.state.markers.map(function(marker, idx) {
      return (
        <MarkerContainer key={idx} marker={marker} />
      );
    });

    const overlays = this.state.visible_overlays.map(function(visible_overlay_id) {
      var overlay_object = _.find(this.state.overlays, function(o){return o.id == visible_overlay_id});

      return (
        <OverlayContainer key={visible_overlay_id} overlay={overlay_object} />
      );
    }.bind(this));

    this.map = <Map center={position} zoom={this.state.zoom} className="m-map" ref='map' onDragEnd={this.handleMoved.bind(this)} onZoomEnd={this.handleZoomed.bind(this)} onClick={this.triggerAddPinDialog.bind(this)}>
                 <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'></TileLayer>
                 {marker_containers}
                 {overlays}
               </Map>;

    return (this.map);
  }
}
