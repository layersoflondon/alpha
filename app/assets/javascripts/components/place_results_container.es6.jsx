class PlaceResultsContainer extends React.Component {
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
    var places_label = this.state.searching ? "Searching for places..." : "Places";

    return (
      <div className="results-places">
        <ul>
          {this.state.places.map(function(place){
            return (<PlaceResult key={place.id} place={place} />);
          })}
        </ul>
      </div>
    );
  }
}
