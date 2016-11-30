class SearchTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  handleSearchSubmit(e) {
    e.preventDefault();

    const map_state = MapContainerStore.getState();
    const filter_state = FilterStateStore.getState();

    const location  = {lat: map_state.lat, lng: map_state.lng};
    const bounds    = {southWest: filter_state.search_bounds.southWest, northEast: filter_state.search_bounds.northEast};

    // fetch google maps results at the current location
    MapContainerActions.fetchNearbyResults(location, bounds);

    // fetch LoL pins that match the current search filter state
    MapContainerActions.fetchSearchResults();
  }

  setSearchQuery(event) {
    FilterStateActions.updateSearchQuery(event.target.value);
  }

  render () {
    return (
      <div className="m-search-panel">
        <form onSubmit={this.handleSearchSubmit.bind(this)}>
          <div className="free-text">
            <input type="text" placeholder="Place, event, landmark…" onChange={this.setSearchQuery.bind(this)}/>
          </div>
          <DateRange />
          <button>Search</button>
        </form>
        <div className="results">
          <PinResultsContainer />
          <NoteResultsContainer />
          <PlaceResultsContainer />
        </div>
      </div>
    );
  }
}
