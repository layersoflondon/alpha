class Map extends React.Component {
  render () {
    return (
        <div>
            <UpdateResultsControl />
            <AddPinControl />
            <MapControlsContainer>
                <MapNavigation />

            </MapControlsContainer>
            <PinContainer>
                <Pin>
                    <PinContent />
                </Pin>
            </PinContainer>
            <Overlay />
        </div>
    );
  }
}

