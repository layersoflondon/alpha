class OverlayResultsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = MapContainerStore.getState();
  }

  render () {
    return (
      <div className="m-overlays-list">
        <a className="show-overlays">Overlays in this area <i className="fa fa-caret-down" aria-hidden="true"></i></a>
        <ul className="overlays-results">
          {this.state.overlays.map(function(overlay) {
            return (<OverlayResult id={overlay.id} key={overlay.id} overlay={overlay} />);
          })}
        </ul>
      </div>
    );
  }
}
