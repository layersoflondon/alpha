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
    if(this.state.errorMessage) {
      return (
        <div>Something is wrong {this.state.errorMessage}</div>
      );
    }
    if(this.state.searching && this.state.search_results.length == 0) {
      return (
        <div>loading...</div>
      )
    }

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
