class SearchTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  fetchSearchResults() {
    SearchActions.fetchSearchResults();

    return false;
  }

  render () {
    return (
      <div className="m-search-panel">
          <form>
            <input type="text" placeholder="Search" />
            <button>Go</button>
          </form>

          <PlaceResultsContainer />
          <PinResultsContainer />
      </div>
    );
  }
}
