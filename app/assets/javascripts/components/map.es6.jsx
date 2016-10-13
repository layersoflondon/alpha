class Map extends React.Component {
  render () {
    return (
        <div className="m-map">
            <div className="pins">
              <ul>
                <PinContainer />
                <PinContainer expanded={true} />
              </ul>
            </div>
        </div>
    );
  }
}
