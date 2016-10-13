class PinResult extends React.Component {
  render () {
    return (
      <li>
          <a href="#">
              <div className="icon"><i className="fa fa-map-marker" aria-hidden="true"></i></div>
              <h3>{this.props.name}</h3>
              <p>Dagenham</p>
          </a>
      </li>
    );
  }
}
