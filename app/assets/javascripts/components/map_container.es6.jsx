class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    if(props.data) {
      MapContainerActions.emitUpdatedState(props.data);
    }

    this.mapPinStoreChanged  = this.mapPinStoreChanged.bind(this);
  }

  componentDidMount() {
    // map state when adding new pins
    MapPinStore.listen(this.mapPinStoreChanged);
  }

  componentWillUnmount() {
    MapPinStore.unlisten(this.mapPinStoreChanged);
  }

  mapPinStoreChanged(state) {
    if(state.pin_form_enabled){
      this.setState({adding_pin: true});
    }else {
      this.setState({adding_pin: false});
    }
  }

  render() {
    var adding_pin = this.state.adding_pin ? (<div className="m-drop-pin-msg"><div>Click on the map to add a pin</div></div>) : '';

    return (
      <div>
        <MapView />

        <SideBar />

        <AddPinControl />

        <PinForm />

        {adding_pin}
      </div>
    )
  }
}
