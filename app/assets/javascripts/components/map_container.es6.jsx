class MapContainer extends React.Component {
    render() {
        return (
            <div className="m-map">
                <SideBar />

                <MapView />
                <PinForm />
            </div>
        )
    }
}

