class MapContainer extends React.Component {
    render() {
        return (
          <div>
            <MapView />

            <SideBar />
            <MapControlsContainer />
            <UpdateResultsControl />
          </div>
        )
    }
}
