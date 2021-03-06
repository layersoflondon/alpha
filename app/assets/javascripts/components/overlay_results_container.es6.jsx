class OverlayResultsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = MapContainerStore.getState();
    this.stateChanged = this.stateChanged.bind(this);
  }

  stateChanged(state) {
    this.setState(state);
  }

  componentWillMount() {
    MapContainerStore.listen(this.stateChanged);

  }

  componentWillUnmount() {
    MapContainerStore.unlisten(this.stateChanged);
  }

  toggleShowOverlays() {
    MapContainerActions.toggleShowOverlays();
  }

  overlaysLabel() {
    let overlays_label;
    let show_caret = true;

    switch(this.state.overlays.length) {
      case 0:
        overlays_label = "No overlays";
        show_caret = false;
        break;
      case 1:
        overlays_label = "1 overlay";
        break;
      default:
        overlays_label = `${this.state.overlays.length} overlays`;
    }

    if(show_caret) {
      let carat = this.state.show_overlays ? <i className="fa fa-caret-up" aria-hidden="true"></i> : <i className="fa fa-caret-down" aria-hidden="true"></i> ;
      return <a className="show-overlays" onClick={this.toggleShowOverlays.bind(this)}>{overlays_label} {carat}</a>
    }else {
      return <a className="show-overlays">{overlays_label}</a>
    }
  }

  render () {
    const show_overlays = this.state.overlays.length && this.state.show_overlays;

    return (
      <div className="m-overlays-list">
        {this.overlaysLabel()}
        <ul className="overlays-results" style={{display: show_overlays ? 'block' : 'none'}}>
          {this.state.overlays.map(function(overlay) {
            return (<OverlayResult id={overlay.id} key={overlay.id} overlay={overlay} />);
          })}
        </ul>
      </div>
    );
  }
}
