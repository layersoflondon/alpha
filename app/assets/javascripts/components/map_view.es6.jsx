class MapView extends React.Component {
  render () {
    return (
      <div>
        <Map />

        <UpdateResultsControl />
        <MapControlsContainer />
      </div>
    );
  }
}
