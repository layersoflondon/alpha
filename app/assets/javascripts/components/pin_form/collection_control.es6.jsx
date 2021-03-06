class CollectionControl extends React.Component {
  constructor(props) {
    super(props);

    let new_state = {collection_form_mode: 0, initial_state: true};
    this.state = _.merge({}, props, new_state);

    this.collectionsStateChanged = this.collectionsStateChanged.bind(this);
  }

  toggleForm(event) {
    this.setState({collection_form_mode: parseInt(event.target.value, 10), initial_state: false});
  }

  setSearchQuery(event) {
    MapPinActions.setFormAttribute({collection_id: null});
    MapPinActions.setFormAttribute({collection_name: event.target.value});

    if(event.target.value.length) {
      let search = {
        term: event.target.value,
        public: true
      };

      CollectionsStateActions.searchCollections(search);
    }else {
      CollectionsStateActions.updateCollections([]);
    }
  }

  setCollection(event) {
    MapPinActions.setFormAttribute({collection_id: event.target.value});
    MapPinActions.setFormAttribute({collection_type: event.target.dataset.collectionType});
  }

  componentDidMount() {
    CollectionsStateStore.listen(this.collectionsStateChanged);
  }

  collectionsStateChanged(state) {
    this.setState(state.user_collections);

    setTimeout(() => {
      MapPinActions.setFormAttribute({collections: state.collections});
    }, 100);
  }

  render() {
    let field = [];

    let pin_state = MapPinStore.getState();

    let show_user_collections_form   = false;
    let show_public_collections_form = false;

    // use a state flag so we can work out (when editing) whether the user has switched collection form type.
    // this is so we can show each form without just relying on the logic to work out whether a collection is public or private to a user
    let changed_state = !this.state.initial_state;

    if(pin_state.editing) {
      let pin_in_user_collection    = typeof(_.find(this.state.user_collections, (collection) => {return collection.id == pin_state.collection_id}))=="object";
      let pin_in_private_collection = typeof(_.find(pin_state.collections, (collection) => {return collection.id == pin_state.collection_id}))=="object";

      show_user_collections_form   = this.state.collection_form_mode==0 && ((changed_state || pin_in_user_collection) || (!changed_state && this.state.collection_id == null));
      show_public_collections_form = this.state.collection_form_mode==1 && (changed_state || pin_in_private_collection);

      if(show_user_collections_form) {
        show_user_collections_form = true;
      }else {
        show_public_collections_form = true;
      }
    }else {
      show_user_collections_form   = this.state.collection_form_mode===0;
      show_public_collections_form = this.state.collection_form_mode===1;
    }

    if(show_user_collections_form) { // no collection, or add to user collection
      let user_collection_enabled = MapPinStore.getState().collection_type !== "user";
      let team_collection_enabled = MapPinStore.getState().collection_type !== "team";

      field = <div>
        <label>Personal Collections</label>
        <select onChange={this.setCollection.bind(this)} data-collection-type="user">
          <option value="" disabled selected={user_collection_enabled}>Select a collection...</option>
          {this.state.user_collections.map((collection) => {
            let selected = (collection.id === MapPinStore.getState().collection_id && MapPinStore.getState().collection_type === "user");
            return <option key={collection.id} value={collection.id} selected={selected}>{collection.name}</option>
          })}
        </select>

        <label>Team Collections</label>
        <select onChange={this.setCollection.bind(this)} data-collection-type="team">
          <option value="" disabled selected={team_collection_enabled}>Select a collection...</option>
          {this.state.team_collections.map((collection) => {
            let selected = (collection.id === MapPinStore.getState().collection_id && MapPinStore.getState().collection_type === "team");
            return <option key={collection.id} value={collection.id} selected={selected}>{collection.name}</option>
          })}
        </select>
      </div>
    }else if(show_public_collections_form) { // add to a public collection
      let matched_collections = <div></div>;

      if(this.state.collections.length) {
        matched_collections = <select onChange={this.setCollection.bind(this)} data-parsley-required={true} data-parsley-error-message="Choose a collection" data-collection-type="public">
          <option value="" disabled selected={MapPinStore.getState().collection_id===null}>Select a collection...</option>
          {this.state.collections.map((collection) => {
            let selected = collection.id === MapPinStore.getState().collection_id;
            return <option key={collection.id} value={collection.id} selected={selected}>{collection.name}</option>
          })}
        </select>;
      }

      field = <div>
        <div className="form-group form-group-title">
          <label>Add to a public collection</label>
          <input type="text" placeholder="Collection Name" data-initial-value={this.state.collection_name} onChange={this.setSearchQuery.bind(this)} value={this.state.collection_name} />
        </div>

        {matched_collections}
      </div>;
    }

    return <div className="form-group form-group-pin-collection">
      <div className="collection-options">
        <div className="collection-option">
          <label>
            <input type="radio" name="collection_form_mode" value="0" checked={show_user_collections_form} onChange={this.toggleForm.bind(this)} />
            Add to one of your collections
          </label>
        </div>

        <div className="collection-option">
          <label>
            <input type="radio" name="collection_form_mode" value="1" checked={show_public_collections_form} onChange={this.toggleForm.bind(this)} />
            Add to a public collection
          </label>
        </div>
      </div>

      {field}
    </div>;
  }
}

CollectionControl = Layers.bindComponentToMapPinStore(CollectionControl);