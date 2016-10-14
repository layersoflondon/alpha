class SearchFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = FilterStateStore.getState()
    this.stateChanged = this.stateChanged.bind(this);
  }

  componentDidMount() {
    FilterStateStore.listen(this.stateChanged);
  }

  componentWillUnmount() {
    FilterStateStore.unlisten(this.stateChanged);
  }

  stateChanged(state) {
    this.setState(state);
  }

  toggleFilters() {
    FilterStateActions.toggleAdvancedFilters(!this.state.advanced_filters_visible);
  }

  render () {
    var date_filters = <DateRange />;

    if( this.state.advanced_filters_visible ) {
      return (
        <div className="m-filters">
            <a href="#" className="show-filter-link" onClick={this.toggleFilters.bind(this)}>More filters</a>
            <DateRange />
            <br/><br/>
            <AdvancedFilters />
        </div>
      );
    }else {
      return (
        <div className="m-filters">
            <a href="#" className="show-filter-link" onClick={this.toggleFilters.bind(this)}>Basic filters</a>
            <DateRange />
        </div>
      );
    }
  }
}
