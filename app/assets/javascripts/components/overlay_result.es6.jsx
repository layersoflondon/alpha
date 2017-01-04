class OverlayResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = _.merge({}, props, {visible: false, opacity: 0.75});
  }

  componentDidMount() {
    $(`.overlay-result-${this.state.id} .m-overlay-opacity-control .range-slider`).jRange({
      from: 0,
      to: 1,
      step: 0.1,
      format: '%s',
      width: 210,
      height: 40,
      showLabels: false,
      showScale: false,
      onstatechange: (value) => {this.updateOpacity(value)}
    });
  }

  toggleOverlayVisibility() {
    this.setState({visible: !this.state.visible});
    MapContainerActions.toggleOverlayVisibility(this.props.id);
  }

  updateOpacity(value) {
    MapContainerActions.setOverlayOpacity(this.props.id, value);
  }

  render () {
    let value = this.state.opacity;

    return (
      <li className={`overlay-result-${this.state.id}`}>
        <span onClick={this.toggleOverlayVisibility.bind(this)}>
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
        </span>

        <form className="m-overlay-opacity-control" style={{display: this.state.visible ? 'block' : 'none'}} >
          <input type="hidden" className="range-slider" value={value} />
        </form>
      </li>
    );
  }
}
