
const Polygon = ReactLeaflet.Polygon, ImageOverlay = ReactLeaflet.ImageOverlay;

class OverlayContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  render () {
    var component = null;

    switch(this.state.overlay.resource.type) {
      case 'tileserver':
        component = <TileLayer url={this.state.overlay.resource.tileserver_url} opacity={0.75}></TileLayer>
        break;
      case 'polygon':
        component = <Polygon positions={this.state.overlay.resource.polygon} />;
        break;
      case 'data':
        component = <div />;
        break;
      case 'georeferencer_tileserver':
        component = <GeoreferencedTileGroup georeferencer_table_id={this.state.overlay.resource.georeferencer_table_id} tileserver_url={this.state.overlay.resource.tileserver_url}/>;
        break;
    }

    return component;
  }
}
