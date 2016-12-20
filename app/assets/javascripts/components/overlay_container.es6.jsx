
const Polygon = ReactLeaflet.Polygon, ImageOverlay = ReactLeaflet.ImageOverlay;

class OverlayContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  render () {
    var component = null;
    var opacity   = this.props.overlay_options.opacity ? this.props.overlay_options.opacity : 0.75;

    switch(this.state.overlay.resource.type) {
      case 'tileserver':
        component = <TileLayer url={this.state.overlay.resource.tileserver_url} opacity={opacity}></TileLayer>;
        break;
      case 'polygon':
        let fillOpacity = opacity * 0.5;
        component = <Polygon positions={this.state.overlay.resource.polygon} opacity={opacity} fillOpacity={fillOpacity}/>;
        break;
      case 'data':
        component = <div />;
        break;
      case 'georeferencer_tileserver':
        component = <GeoreferencedTileGroup georeferencer_table_id={this.state.overlay.resource.georeferencer_table_id} tileserver_url={this.state.overlay.resource.tileserver_url} opacity={opacity} />;
        break;
    }

    return component;
  }
}
