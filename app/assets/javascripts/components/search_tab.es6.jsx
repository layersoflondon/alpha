class SearchTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  handleSearchSubmit(e) {
    e.preventDefault();

    SearchResultsActions.fetchSearchResults();
  }

  setSearchQuery(event) {
    FilterStateActions.updateSearchQuery(event.target.value);
  }

  render () {
    return (
      <div className="m-search-panel-content">
        <form onSubmit={this.handleSearchSubmit.bind(this)}>
          <input type="text" placeholder="Your search…" onChange={this.setSearchQuery.bind(this)}/>
          <button>Go</button>
        </form>

        <PlaceResultsContainer />
        <PinResultsContainer />
      </div>
    );
  }
}
