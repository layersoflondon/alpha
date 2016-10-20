class PlaceResult extends React.Component {
  constructor(props) {
    super(props);

    this.focusMapOnPlace = this.focusMapOnPlace.bind(this);
  }

  focusMapOnPlace(place) {
    MapStateActions.focusPlace(place);
  }

  render () {
    return (
      <li onClick={this.focusMapOnPlace.bind(this, this.props.place)}>
          <a href="#">
              <div className="icon"><i className="fa fa-map-marker" aria-hidden="true"></i></div>
              <h3>{this.props.place.title}</h3>
              <p>{this.props.place.location}</p>
          </a>
      </li>
    );
  }
}
