class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    self.state = {};
  }

  render() {
    return (
      <div>
        <MapView />

        <SideBar />

        <UpdateResultsControl />
        <MapControlsContainer />
        <AddPinControl />

        <PinForm />
      </div>
    )
  }
}
