class PinResultsContainer extends React.Component {
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
    console.log("PinResultsContainer state changed", state);
    this.setState(state);
  }

  render () {
    var pins_label = this.state.searching ? "Searching for pins..." : "Pins";

    return (
      <div className="results results-pins">
        <h3>{pins_label}</h3>
        <ul>
        {this.state.pins.map(function(pin){
          return (<PinResult key={pin.id} name={pin.name} />);
        })}
        </ul>
      </div>
    );
  }
}
