class PlaceResult extends React.Component {
  render () {
    return (
      <li>
          <a href="#">
              <div className="icon"><i className="fa fa-map-marker" aria-hidden="true"></i></div>
              <h3>{this.props.place.title}</h3>
              <p>{this.props.place.location}</p>
          </a>
      </li>
    );
  }
}
