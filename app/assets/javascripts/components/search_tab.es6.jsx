class SearchTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  handleSearchSubmit(e) {
    e.preventDefault();

    MapActions.fetchSearchResults();
  }

  render () {
    return (
      <div className="m-search-panel">
          <form onSubmit={this.handleSearchSubmit.bind(this)}>
            <input type="text" placeholder="Search" />
            <button>Go</button>
          </form>

          <PlaceResultsContainer />
          <PinResultsContainer />
      </div>
    );
  }
}
