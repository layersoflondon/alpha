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

  render () {
    return (
      <div className="m-overlays-list">
        <a className="show-overlays" onClick={this.toggleShowOverlays.bind(this)}>Overlays in this area</a>
        <ul className="overlays-results" style={{display: this.state.show_overlays ? 'block' : 'none'}}>
          {this.state.overlays.map(function(overlay) {
            return (<OverlayResult id={overlay.id} key={overlay.id} overlay={overlay} />);
          })}
        </ul>
      </div>
    );
  }
}
