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

        <div className="collections-popout" style={{display: show_collections ? 'block' : 'none'}}>

          <ul className="collections-nav">
            <li><a href="#">Your collections</a></li>
            <li><a href="#">Public collections</a></li>
          </ul>

          <div className="collections-results">
            <h3>Personal</h3>
            <ul>
              {this.state.all_collections.map(function(collection) {
                return (<CollectionResult id={collection.id} key={collection.id} collection={collection} />);
              })}
              {home_link}
              <li class="collection-result" title="1 user has contributed 1 pin to this collection"><a><h3>Mauris sem ante interdum sed</h3><p>Aenean et neque tincidunt, pharetra velit quis, efficitur elit. Donec vitae lacus dictum, ultricies leo.</p></a></li>
              <li class="collection-result" title="1 user has contributed 1 pin to this collection"><a><h3>Mauris sem ante interdum sed</h3><p>Aenean et neque tincidunt, pharetra velit quis, efficitur elit. Donec vitae lacus dictum, ultricies leo.</p></a></li>
              <li class="collection-result" title="1 user has contributed 1 pin to this collection"><a><h3>Mauris sem ante interdum sed</h3><p>Aenean et neque tincidunt, pharetra velit quis, efficitur elit. Donec vitae lacus dictum, ultricies leo.</p></a></li>
              <li class="collection-result" title="1 user has contributed 1 pin to this collection"><a><h3>Mauris sem ante interdum sed</h3><p>Aenean et neque tincidunt, pharetra velit quis, efficitur elit. Donec vitae lacus dictum, ultricies leo.</p></a></li>
              <li class="collection-result" title="1 user has contributed 1 pin to this collection"><a><h3>Mauris sem ante interdum sed</h3><p>Aenean et neque tincidunt, pharetra velit quis, efficitur elit. Donec vitae lacus dictum, ultricies leo.</p></a></li>
              <li class="collection-result" title="1 user has contributed 1 pin to this collection"><a><h3>Mauris sem ante interdum sed</h3><p>Aenean et neque tincidunt, pharetra velit quis, efficitur elit. Donec vitae lacus dictum, ultricies leo.</p></a></li>
            </ul>
          </div>

          <div className="collections-results">
            <h3>From your team(s):</h3>
            <ul>
              {this.state.all_collections.map(function(collection) {
                return (<CollectionResult id={collection.id} key={collection.id} collection={collection} />);
              })}
              {home_link}
              <li class="collection-result" title="1 user has contributed 1 pin to this collection"><a><h3>Mauris sem ante interdum sed</h3><p>Aenean et neque tincidunt, pharetra velit quis, efficitur elit. Donec vitae lacus dictum, ultricies leo.</p></a></li>
              <li class="collection-result" title="1 user has contributed 1 pin to this collection"><a><h3>Mauris sem ante interdum sed</h3><p>Aenean et neque tincidunt, pharetra velit quis, efficitur elit. Donec vitae lacus dictum, ultricies leo.</p></a></li>
              <li class="collection-result" title="1 user has contributed 1 pin to this collection"><a><h3>Mauris sem ante interdum sed</h3><p>Aenean et neque tincidunt, pharetra velit quis, efficitur elit. Donec vitae lacus dictum, ultricies leo.</p></a></li>
              <li class="collection-result" title="1 user has contributed 1 pin to this collection"><a><h3>Mauris sem ante interdum sed</h3><p>Aenean et neque tincidunt, pharetra velit quis, efficitur elit. Donec vitae lacus dictum, ultricies leo.</p></a></li>
              <li class="collection-result" title="1 user has contributed 1 pin to this collection"><a><h3>Mauris sem ante interdum sed</h3><p>Aenean et neque tincidunt, pharetra velit quis, efficitur elit. Donec vitae lacus dictum, ultricies leo.</p></a></li>
              <li class="collection-result" title="1 user has contributed 1 pin to this collection"><a><h3>Mauris sem ante interdum sed</h3><p>Aenean et neque tincidunt, pharetra velit quis, efficitur elit. Donec vitae lacus dictum, ultricies leo.</p></a></li>
              <li class="collection-result" title="1 user has contributed 1 pin to this collection"><a><h3>Mauris sem ante interdum sed</h3><p>Aenean et neque tincidunt, pharetra velit quis, efficitur elit. Donec vitae lacus dictum, ultricies leo.</p></a></li>
            </ul>
          </div>

        </div>

      </div>
    );
  }
}
