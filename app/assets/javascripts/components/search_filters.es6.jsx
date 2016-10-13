class SearchFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {visible_filters: 'basic', filters: {}};
  }

  toggleFilters() {
    var filter_state = this.state.filters=='basic' ? 'advanced' : 'basic';
    this.setState({visible_filters: filter_state})
  }

  render () {
    var date_filters = <DateRange />;

    if( this.state.filters == 'basic' ) {
      return (
        <div className="m-filters">
            <a href="#" className="show-filter-link" onClick={this.toggleFilters.bind(this)}>More filters</a>
            <DateRange />
        </div>
      );
    }else {
      return (
        <div className="m-filters">
            <a href="#" className="show-filter-link" onClick={this.toggleFilters.bind(this)}>Basic filters</a>
            <DateRange />
            <AdvancedFilters />
        </div>
      );
    }
  }
}

SearchFilters.propTypes = {
  visible_filters: React.PropTypes.string,
  filters: React.PropTypes.object
}
