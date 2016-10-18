class OverlayResultsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = SearchResultsStore.getState();
  }

  render () {
    return (
      <ul>
        {this.state.overlays.map(function(overlay) {
          return (<OverlayResult id={overlay.id} key={overlay.id} overlay={overlay} />);
        })}
      </ul>
    );
  }
}
