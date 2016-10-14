class PinResultsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = SearchResultsStore.getState();
    this.stateChanged = this.stateChanged.bind(this);
  }

  componentDidMount() {
    SearchResultsStore.listen(this.stateChanged);
  }

  componentWillUnmount() {
    SearchResultsStore.unlisten(this.stateChanged);
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
          return (<PinResult key={pin.id} name={pin.name} pin={pin} />);
        })}
        </ul>
      </div>
    );
  }
}
