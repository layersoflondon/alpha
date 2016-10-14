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
    this.setState({update_disabled: false});
  }

  render () {
    return (
      <div className="m-update">
        <button disabled={this.state.update_disabled}>Update results</button>
      </div>
    );
  }
}

UpdateResultsControl.propTypes = {
  update_disabled: React.PropTypes.bool
};
