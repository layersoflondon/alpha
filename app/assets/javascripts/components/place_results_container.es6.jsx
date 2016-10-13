class PlaceResultsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = MapStore.getState();
    this.stateChanged = this.stateChanged.bind(this);

    console.log("PlaceResultsContainer state", this.state);
  }

  componentDidMount() {
    MapStore.listen(this.stateChanged);
  }

  componentWillUnmount() {
    MapStore.unlisten(this.stateChanged);
  }

  stateChanged(state) {
    console.log("PlaceResultsContainer state changed", state);
    this.setState(state);
  }

  render () {
    var places_label = this.state.searching ? "Searching for places..." : "Places";

    return (
      <div className="results results-places">
        <h3>{places_label}</h3>

        <ul>
          {this.state.places.map(function(place){
            return (<PlaceResult key={place.id} name={place.name} />);
          })}
        </ul>
      </div>
    );
  }
}
