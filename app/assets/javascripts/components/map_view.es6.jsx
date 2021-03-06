var RMap        = ReactLeaflet.Map,
    Marker      = ReactLeaflet.Marker,
    Popup       = ReactLeaflet.Popup,
    TileLayer   = ReactLeaflet.TileLayer,
    ZoomControl = ReactLeaflet.ZoomControl;

class MapView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = MapContainerStore.getState();

    this.map    = null;
    this.bounds = [];

    // bind our event handlers
    this.stateChanged = this.stateChanged.bind(this);
    this.mapViewStateChanged = this.mapViewStateChanged.bind(this);
  }

  componentDidMount() {
    // map data (markers) state
    MapContainerStore.listen(this.stateChanged);

    // map view (position, focussed marker)
    MapStateStore.listen(this.mapViewStateChanged);

    setTimeout(() => {
      this.handleZoomed({});
    }, 100);
  }

  componentWillUnmount() {
    MapContainerStore.unlisten(this.stateChanged);

    MapStateStore.unlisten(this.mapViewStateChanged);
  }

  handleMoved(event) {
    const _map     = this.refs.map.state.map;
    const bounds   = _map.getBounds();
    const position = _map.getCenter();
    const sw = {lat: bounds._southWest.lat, lng: bounds._southWest.lng};
    const ne = {lat: bounds._northEast.lat, lng: bounds._northEast.lng};

    FilterStateActions.updateFilterCentreAndBounds({centre: {lat: position.lat, lng: position.lng}, bounds: {southWest: sw, northEast: ne}});
  }

  handleZoomed(event) {
    const _map   = this.refs.map.state.map;
    const bounds = _map.getBounds();
    const sw = {lat: bounds._southWest.lat, lng: bounds._southWest.lng};
    const ne = {lat: bounds._northEast.lat, lng: bounds._northEast.lng};

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

  //componentDidUpdate() {
  //  window.map = this.refs.map.state.map;
  //}

  render() {
    const position = [this.state.lat, this.state.lng];

    // LoL data markers
    const note_marker_containers = this.state.markers.map((marker, idx) => {
      return (
        <MarkerContainer key={idx} marker={marker} />
      );
    });

    // google Geocoder markers
    const pin_marker_containers = this.state.pins.map((pin, idx) => {
      return (
        <PinContainer key={idx} pin={pin} />
      );
    });

    const overlays = this.state.visible_overlays.map((visible_overlay_id) => {
      var overlay_object = _.find(this.state.overlays, (overlay) => {
        return overlay.id == visible_overlay_id;
      });

      let overlay_options = _.find(this.state.overlay_options, (option) => {return option.id == visible_overlay_id}) || {};

      return (
        <OverlayContainer key={visible_overlay_id} overlay={overlay_object} overlay_options={overlay_options} />
      );
    });

    let mapClasses = "m-map leaflet-container leaflet-fade-anim";
    let map_pin_store = MapPinStore.getState();

    if(map_pin_store.pin_form_enabled || map_pin_store.move_pin_form_enabled) {
      mapClasses += " add-pin-mode";
    }

    this.map = <RMap center={position} zoom={this.state.zoom} zoomControl={false} ref='map' onDragEnd={this.handleMoved.bind(this)} onZoomEnd={this.handleZoomed.bind(this)} onClick={this.triggerAddPinDialog.bind(this)}>
                 <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'></TileLayer>
                 <ZoomControl position='bottomleft' />
                 {note_marker_containers}
                 {pin_marker_containers}
                 {overlays}
               </RMap>;

    return (
      <div className={mapClasses}>
        {this.map}
      </div>
    )
  }
}
