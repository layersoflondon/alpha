class PinResultsContainer extends React.Component {
  render () {
    return (
      <div className="results results-pins">
        <h3>Pins</h3>
        <ul>
          <PinResult />
          <PinResult />
          <PinResult />
          <PinResult />
        </ul>
      </div>
    );
  }
}
