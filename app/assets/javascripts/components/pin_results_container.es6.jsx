class PinResultsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = MapContainerStore.getState();
    this.stateChanged = this.stateChanged.bind(this);
  }

  componentDidMount() {
    MapContainerStore.listen(this.stateChanged);
  }

  componentWillUnmount() {
    MapContainerStore.unlisten(this.stateChanged);
  }

  stateChanged(state) {
    this.setState(state);
  }

  render () {
    var pins_label = this.state.searching ? "Searching for pins..." : "Pins";

    return (
      <div className="results results-pins">
        <h3>{pins_label}</h3>
        <ul>
        {this.state.pins.map(function(pin){
          return (<PinResult key={pin.id} pin={pin} />);
        })}
        </ul>
      </div>
    );
  }
}
