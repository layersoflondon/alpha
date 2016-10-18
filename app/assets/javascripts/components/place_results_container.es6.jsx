class PlaceResultsContainer extends React.Component {
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
