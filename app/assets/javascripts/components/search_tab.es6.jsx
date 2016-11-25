class SearchTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  handleSearchSubmit(e) {
    e.preventDefault();

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
