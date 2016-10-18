
var Polygon = ReactLeaflet.Polygon,
    ImageOverlay = ReactLeaflet.ImageOverlay;

class OverlayContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;

    console.log(this.state);
  }

  render () {
    return (
      <ImageOverlay url={this.state.overlay.url} bounds={this.state.overlay.bounds} />
    );
  }
}
