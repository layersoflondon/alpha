class CollectionResultsContainer extends React.Component {
  constructor(props) {
    super(props);

    let user_id = $("head meta[name='user-id']").attr('content');
    let logged_in = typeof(user_id)!=="undefined";
    initial_collection_view = logged_in ? "personal" : "public";

    this.state = _.merge(MapContainerStore.getState(), {collection_view: initial_collection_view, logged_in: logged_in, windowed: false});
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

  componentDidUpdate() {
    $collections_container = $(".m-collections-list .collections-popout");
    $personal_collections = $collections_container.find(".collections-inner");

    setTimeout(() => {
      if($collections_container.height() < $personal_collections.height()) {
        let state = _.merge({}, this.state, {windowed: true});
        this.setState(state);
      }
    }, 15);
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

  switchCollectionsView(event) {
    let collection_view = event.target.dataset.collectionTabView;
    this.setState(_.merge(this.state, {collection_view: collection_view}));
  }

  render () {
    const show_collections = this.state.all_collections.length && this.state.show_collections;

    let home_link;
    if(/collections\/\d+$/.test(location.href)) {
      home_link = <li className="home-link">
        <a href="/the-map">home</a>
      </li>;
    }

    let collections;
    let collections_class = `collections-results ${this.state.windowed ? 'is-windowed' : ''}`;
    
    if(this.state.collection_view == "personal") {
      collections = <div className="collections-inner">
        <div className={collections_class}>
          <h3>Personal</h3>
          <ul>
            {this.state.user_collections.map(function(collection) {
              return (<CollectionResult id={collection.id} key={collection.id} collection={collection} />);
            })}
          </ul>
        </div>

        <div className={collections_class}>
          <h3>From your team(s):</h3>
          <ul>
            {this.state.team_collections.map(function(collection) {
              return (<CollectionResult id={collection.id} key={collection.id} collection={collection} />);
            })}
          </ul>
        </div>
      </div>;
    }else {
      collections = <div className="collections-inner">
        <div className={collections_class}>
          <h3>Public</h3>
          <ul>
            {this.state.public_collections.map(function(collection) {
              return (<CollectionResult id={collection.id} key={collection.id} collection={collection} />);
            })}
          </ul>
        </div>
      </div>
    }

    let actions;

    if(this.state.logged_in) {
      actions = <ul className="collections-nav">
        <li><a href="#" onClick={this.switchCollectionsView.bind(this)} data-collection-tab-view="personal">Your collections</a></li>
        <li><a href="#" onClick={this.switchCollectionsView.bind(this)} data-collection-tab-view="public">Public collections</a></li>
      </ul>
    }else {
      actions = <ul className="collections-nav">
        <li><a href="#" onClick={this.switchCollectionsView.bind(this)} data-collection-tab-view="public">Public collections</a></li>
      </ul>
    }

    return (
      <div className="m-collections-list">
        {this.collectionsLabel()}

        <div className="collections-popout" style={{display: show_collections ? 'block' : 'none'}}>

          {actions}

          {collections}

          {home_link}
        </div>

      </div>
    );
  }
}
