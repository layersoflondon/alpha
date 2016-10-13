class MapContainer extends React.Component {
    render() {
      return (
        <div>
          <MapView />

          <SideBar />

          <UpdateResultsControl />
          <MapControlsContainer />
          <AddPinControl />
        </div>
      )
    }
}
