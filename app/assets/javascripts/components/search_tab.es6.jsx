const ReactCSSTransitionGroup = React.addons.TransitionGroup;

class SearchTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = _.merge({}, props, {visible: false, windowed: false, rerender: true});

    this.checkResultsClasses = _.debounce(this.checkResultsClasses.bind(this), 300, true);
    this.sidebarStateChanged = this.sidebarStateChanged.bind(this);
  }

  toggleResultsVisibility() {
    let new_state = this.state;
    new_state.visible = !this.state.visible;
    new_state.rerender = true;

    this.setState(new_state);
  }

  handleSearchSubmit(e) {
    e.preventDefault();

    // fetch google maps results at the current location
    MapContainerActions.fetchNearbyResults();

    // fetch LoL pins that match the current search filter state
    MapContainerActions.fetchSearchResults();

    setTimeout(() => {
      this.componentDidUpdate();
    }, 75);
  }

  componentWillMount() {
    // check whether to add the is-windowed class if the window is resized below the container height
    window.addEventListener('resize', this.checkResultsClasses);

    // the map container will have its notes/pins state changed - check whether to add the is-windowed class
    // once we've added the new state data to the component
    MapContainerStore.listen(this.sidebarStateChanged);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.checkResultsClasses);
    MapContainerStore.listen(this.sidebarStateChanged);
  }

  checkResultsClasses() {
    this.componentDidUpdate();
  }

  sidebarStateChanged(state) {
    $results_container = $(".m-search-panel .results");
    $results_pins_container = $results_container.find(".results-pins");
    $results_notes_container = $results_container.find(".results-notes");

    setTimeout(() => {
      this.componentDidUpdate();
    }, 15);
  }

  componentDidUpdate() {
    $results_container = $(".m-search-panel .results");
    $results_pins_container = $results_container.find(".results-pins");
    $results_notes_container = $results_container.find(".results-notes");

    setTimeout(() => {
      if($results_container.height() < ($results_pins_container.height() + $results_notes_container.height())) {
        let state = _.merge({}, this.state, {windowed: true});
        this.setState(state);
      }
    }, 15);
  }

  setSearchQuery(event) {
    FilterStateActions.updateSearchQuery(event.target.value);
  }

  render () {
    let resultsClass = `results ${this.state.windowed ? 'is-windowed' : ''} ${this.state.visible ? 'is-visible' : ''}`;

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
