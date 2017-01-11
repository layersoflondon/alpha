const LayerGroup = ReactLeaflet.LayerGroup;

class GeoreferencedTileGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = _.merge({},props,{image_data: []});
  }

  componentDidMount() {
    overlay = new GeoreferencedOverlay(this.props.georeferencer_table_id);
    overlay.getImageData().then(rows => {
      // re-position the map...
      let row_pos = rows[0].center.split(",");
      let georeferenced_tile_position = {position: {lat: row_pos[0], lng: row_pos[1]}};
      MapStateActions.focusPlace(georeferenced_tile_position);
      this.setState({image_data: rows})
    });

  }

  flagImage(image_data) {
    GeoreferencedOverlay.flagImage(image_data.georeferencer_id).then((response) => {
      console.log("success",response)
    }).catch((response) => {
      console.log("fail", response)
    })
  }

  hidePopover() {
    this._reactInternalInstance._context.map.closePopup();
  }

  render() {
    let opacity = this.props.opacity ? this.props.opacity : 0.75;

    return (
      <LayerGroup>
       {
         this.state.image_data.map((image_item_data) => {
           let sw = L.latLng(...image_item_data.south_west.split(","));
           let ne = L.latLng(...image_item_data.north_east.split(","));
           let bounds = L.latLngBounds(sw, ne);
           let icon = L.divIcon({html: '<i class="fa fa-flag"></i> '});
           let marker = (
             <Marker icon={icon} key={"marker-"+image_item_data.georeferencer_id} position={bounds.getCenter()} id={"marker-"+"marker-"+image_item_data.georeferencer_id}>
               <Popup closeButton={true}>
                 <div className="m-popover flag-overlay">
                   <h3>Flag this overlay</h3>
                   <p>Is this overlay badly georeferenced?</p>
                   <div className="clearfix">
                     <button className="btn btn-ok" onClick={this.hidePopover.bind(this)}>No, it's fine.</button>
                     <button className="btn btn-not-ok" onClick={this.flagImage.bind(this,image_item_data)}>Yes, this needs fixing</button>
                   </div>
                 </div>
               </Popup>
             </Marker>
           );

           let tile_layer = (
             <TileLayer key={image_item_data.georeferencer_id} url={this.props.tileserver_url} opacity={opacity} entity_id={image_item_data.georeferencer_id} reuseTiles={true} bounds={bounds}></TileLayer>
           );

           return(
             <div key={"div"+image_item_data.georeferencer_id}>
               {marker}
               {tile_layer}
             </div>
           )
         })
       }
     </LayerGroup>
    )
  }

}

