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
    let pins_label = "Pins";

    if(this.state.searching) {
      pins_label = "Searching for pins...";
    }else if(!this.state.searching && this.state.pins.length==0) {
      pins_label = "No pins found";
    }

    return (
      <div className="results-pins">
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
