
var Polygon = ReactLeaflet.Polygon,
    ImageOverlay = ReactLeaflet.ImageOverlay;

class OverlayContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  render () {
    var component = null;

    switch(this.state.overlay.resource.type) {
      case 'tile':
        component = <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png'></TileLayer>
        break;
      case 'polygon':
        component = <Polygon positions={this.state.overlay.resource.polygon} />;
        break;
      case 'data':
        component = <div />;
        break;
    }

    return component;
  }
}
