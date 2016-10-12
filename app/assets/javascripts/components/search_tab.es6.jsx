class SearchTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = SearchStore.getState();

    // bind onChange to this Component
    this.onChange = this.onChange.bind(this);
  }

  fetchSearchResults() {
    SearchActions.fetchSearchResults();

    return false;
  }

  onChange(state) {
    this.setState(state);
  }

  componentDidMount() {
    SearchStore.listen(this.onChange);
  }
  componentWillUnmount() {
    SearchStore.unlisten(this.onChange);
  }

  render () {
    console.log("Rendering...", this.state);

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
        <div>
            <form onSubmit={this.fetchSearchResults.bind(this)}>
              <input type="text" placeholder="Search" />
              <button>Go</button>
            </form>

            <PlaceResultsContainer />
            <PinResultsContainer />
        </div>
    );
  }
}
