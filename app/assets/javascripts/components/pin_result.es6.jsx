class PinResult extends React.Component {
  focusMapOnPin(pin) {
    MapStateActions.focusPin(pin);
  }

  render () {
    return (
      <li onClick={this.focusMapOnPin.bind(this, this.props.pin)}>
          <a href="#">
              <div className="icon"><i className="fa fa-map-marker" aria-hidden="true"></i></div>
              <h3>{this.props.name}</h3>
              <p>Dagenham</p>
          </a>
      </li>
    );
  }
}
