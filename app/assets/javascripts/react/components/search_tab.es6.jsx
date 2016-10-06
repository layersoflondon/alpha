class SearchTab extends React.Component {
  render () {
    return (
        <div>
            <input type="text" />
            <button>Go</button>

            <PlaceResultsContainer />

            <PinResultsContainer />
        </div>
    );
  }
}
