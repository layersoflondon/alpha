
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
        component = <TileLayer url={this.state.overlay.resource.tileserver_url} opacity={0.75}></TileLayer>
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
