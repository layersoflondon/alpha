class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    if(props.data) {
      MapContainerActions.emitUpdatedState(props.data);
    }

    // set the FilterStateStore's default minimum year
    if(props.date_filter_range) {
      FilterStateActions.updateDefaultYearFrom(props.date_filter_range[0]);
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
    if(state.pin_form_enabled && state.move_pin_form_enabled) {
      this.setState({adding_pin: 1});
    }else if(state.pin_form_enabled) {
      this.setState({adding_pin: 2});
    }else {
      this.setState({adding_pin: 0});
    }
  }

  render() {
    let drop_pin_label, drop_pin_container;

    switch(this.state.adding_pin) {
      case 1:
        drop_pin_label = "Click on the map to move this note";
        drop_pin_container = <div className="m-drop-pin-msg"><div>{drop_pin_label}</div></div>;
        break;
      case 2:
        drop_pin_label = "Click on the map to add a note";
        drop_pin_container = <div className="m-drop-pin-msg"><div>{drop_pin_label}</div></div>;
        break;
    }

    return (
      <div>
        <MapView />

        <SideBar menu={this.props.menu} account_menu={this.props.account_menu} />

        <AddPinControl />

        <PinForm all_collections={this.props.data.all_collections} user_collections={this.props.data.user_collections} />

        <ModerationForm />

        {drop_pin_container}
      </div>
    )
  }
}
