class UpdateResultsControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {update_disabled: true};

    this.stateChanged = this.stateChanged.bind(this);
  }

  componentDidMount() {
    FilterStateStore.listen(this.stateChanged);
  }

  componentWillUnmount() {
    FilterStateStore.unlisten(this.stateChanged);
  }

  stateChanged(state) {
    if( !state.suppress_update_results_event ) {
      this.setState({update_disabled: false});
    }
  }

  updateResults(event) {
    event.preventDefault();

    SearchResultsActions.fetchSearchResults();
  }

  render () {
    return (
      <div className="m-update">
        <button disabled={this.state.update_disabled} onClick={this.updateResults.bind(this)}>Update results</button>
      </div>
    );
  }
}

UpdateResultsControl.propTypes = {
  update_disabled: React.PropTypes.bool
};
