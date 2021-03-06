class PinResult extends React.Component {
  focusMapOnPin(pin) {
    MapStateActions.focusPin(pin);
  }

  render () {
    return (
      <li onClick={this.focusMapOnPin.bind(this, this.props.pin)}>
          <a href="#">
              <div className="icon icon--note"></div>
              <h3>{this.props.pin.title}</h3>
              <p>{this.props.pin.location}</p>
          </a>
      </li>
    );
  }
}
