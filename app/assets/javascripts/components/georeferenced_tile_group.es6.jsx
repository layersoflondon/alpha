class GeoreferencedTileGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({},props,{image_ids: []});
  }

  componentDidMount() {
    overlay = new GeoreferencedOverlay(this.props.georeferencer_table_id);
    overlay.getImageIds().then(ids => {
      console.log(ids);
      this.setState({image_ids: ids})
    });

  }

  render() {
    return (
      <div>
       {
         this.state.image_ids.map((id) => {
           return <TileLayer key={id} url={this.props.tileserver_url} opacity={0.75} entity_id={id}></TileLayer>;
         })
       }
     </div>
    )
  }

}