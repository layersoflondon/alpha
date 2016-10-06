class Map extends React.Component {
  render () {
    return (
        <div>
            <UpdateResultsControl />
            <AddPinControl />
            <MapControlsContainer />

            <div className="pins">
              <ul>
                <PinContainer />
                <PinContainer expanded={true} />
              </ul>
            </div>

            <Overlay />
        </div>
    );
  }
}
