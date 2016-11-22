class OverlayResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = _.merge(props, {visible: false});
  }

  toggleOverlayVisibility() {
    this.setState({visible: !this.state.visible});
    MapContainerActions.toggleOverlayVisibility(this.props.id);
  }

  render () {
    return (
      <li onClick={this.toggleOverlayVisibility.bind(this)}>
        <form>
          <div className="form-group">
            <div className="form-check">
              <label>
                <input className="form-check-input" type="checkbox" checked={this.state.visible} />
              </label>
            </div>
          </div>
        </form>
        <h3>{this.state.overlay.title}</h3>
      </li>
    );
  }
}
