class UpdateResultsControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {update_disabled: true};
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
