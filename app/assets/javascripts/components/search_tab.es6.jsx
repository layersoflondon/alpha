const ReactCSSTransitionGroup = React.addons.TransitionGroup;

class SearchTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = _.merge({}, props, {visible: false});
  }

  toggleResultsVisibility() {
    let new_state = this.state;
    new_state.visible = !this.state.visible;
    this.setState(new_state);
  }

  handleSearchSubmit(e) {
    e.preventDefault();

    // fetch google maps results at the current location
    MapContainerActions.fetchNearbyResults();

    // fetch LoL pins that match the current search filter state
    MapContainerActions.fetchSearchResults();
  }

  setSearchQuery(event) {
    FilterStateActions.updateSearchQuery(event.target.value);
  }

  render () {

    let resultsClass = `results is-windowed ${this.state.visible ? 'is-visible' : ''}`;

    return (
      <div className="m-search-panel">
        <form onSubmit={this.handleSearchSubmit.bind(this)}>
          <div className="free-text">
            <input type="text" placeholder="Place, event, landmark…" onChange={this.setSearchQuery.bind(this)} />
          </div>
          <DateRange />
          <button>Search</button>
        </form>

        <div className={resultsClass}>
          <button className="toggle-visibility" onClick={this.toggleResultsVisibility.bind(this)}></button>

          <PinResultsContainer compact={!this.state.visible} key="pins" />
          <NoteResultsContainer compact={!this.state.visible} key="notes" />
        </div>
      </div>
    );
  }
}
