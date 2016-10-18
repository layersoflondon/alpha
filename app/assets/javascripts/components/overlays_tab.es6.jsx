class OverlaysTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  render () {
    return (
      <div className="m-overlays-list-content">
        <OverlayResultsContainer />
      </div>
    );
  }
}
