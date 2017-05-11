class CollectionResultsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = MapContainerStore.getState();
    this.stateChanged = this.stateChanged.bind(this);
  }

  stateChanged(state) {
    this.setState(state);
  }

  componentWillMount() {
    MapContainerStore.listen(this.stateChanged);
  }

  componentWillUnmount() {
    MapContainerStore.unlisten(this.stateChanged);
  }

  toggleShowCollections() {
    MapContainerActions.toggleShowCollections();
  }

  collectionsLabel() {
    let collections_label;
    let show_caret = true;

    switch(this.state.all_collections.length) {
      case 0:
        collections_label = "No collections";
        show_caret = false;
        break;
      case 1:
        collections_label = "1 collection";
        break;
      default:
        collections_label = `${this.state.all_collections.length} collections`;
    }

    if(show_caret) {
      let carat = this.state.show_collections ? <i className="fa fa-caret-up" aria-hidden="true"></i> : <i className="fa fa-caret-down" aria-hidden="true"></i> ;
      return <a className="show-collections" onClick={this.toggleShowCollections.bind(this)}>{collections_label} {carat}</a>
    }else {
      return <a className="show-collections">{collections_label}</a>
    }
  }

  render () {
    const show_collections = this.state.all_collections.length && this.state.show_collections;
    let home_link;
    if(/collections\/\d+$/.test(location.href)) {
      home_link = <li className="home-link">
        <a href="/the-map">home</a>
      </li>;
    }

    return (
      <div className="m-collections-list">
        {this.collectionsLabel()}

        <ul className="collections-results" style={{display: show_collections ? 'block' : 'none'}}>
          {this.state.all_collections.map(function(collection) {
            return (<CollectionResult id={collection.id} key={collection.id} collection={collection} />);
          })}
          {home_link}
        </ul>
      </div>
    );
  }
}
