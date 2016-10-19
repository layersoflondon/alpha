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
    const position = this.refs.map.state.map.getBounds();
    const sw = {lat: position._southWest.lat, lng: position._southWest.lng};
    const ne = {lat: position._southWest.lat, lng: position._southWest.lng};

    FilterStateActions.updateFilterBounds({southWest: sw, northEast: ne});
  }

  shouldComponentUpdate(nextProps, nextState) {
    /*
    fixme: we should always return false from here and hook into the Leaflet map object
    to update the pins, zoom and position given the nextState properties...
    */

    // var bounds _.map(nextState.pins, function(p) {
    //   return p.position
    // });
    // var bounds = _.map(x, function(y){return y.position
    var bounds = _.map(this.state.pins, function(p) {return p.position});
    setTimeout(function(){
      // this.refs.map.state.map.fitBounds(bounds);
      this.refs.map.state.map.panTo({lat: this.state.lat, lng: this.state.lng});
    }.bind(this), 100);

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

  triggerAddPinDialog(event) {
    const latlng = {lat: event.latlng.lat, lng: event.latlng.lng};
    var add_pin_state = MapPinStore.getState();

    MapPinActions.setPinLocation(latlng);
    MapPinActions.togglePinForm(add_pin_state.pin_form_enabled);
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    const pins = this.state.pins.map(function(pin) {
      return (
        <PinContainer key={pin.id} pin={pin} />
      );
    });

    const overlays = this.state.visible_overlays.map(function(visible_overlay_id) {
      var overlay_object = _.find(this.state.overlays, function(o){return o.id == visible_overlay_id});

      return (
        <OverlayContainer key={visible_overlay_id} overlay={overlay_object} />
      );
    }.bind(this));

    this.map = <Map center={position} zoom={this.state.zoom} className="m-map" ref='map' onDragEnd={this.handleMoved.bind(this)} onZoomEnd={this.handleZoomed.bind(this)} onClick={this.triggerAddPinDialog.bind(this)}>
                 <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}' />
                 {pins}
                 {overlays}
               </Map>;

    return (this.map);
  }
}
