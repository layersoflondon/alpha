class PlaceResultsContainer extends React.Component {
  render () {
    return (
      <div className="results results-places">
        <h3>Places</h3>

        <ul>
          <PlaceResult />
          <PlaceResult />
          <PlaceResult />
        </ul>
      </div>
    );
  }
}
