class CollectionControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;

    this.collectionsStateChanged = this.collectionsStateChanged.bind(this);
  }

  setSearchQuery(event) {
    MapPinActions.setFormAttribute({collection_id: null});
    MapPinActions.setFormAttribute({collection_name: event.target.value});

    if(event.target.value.length) {
      CollectionsStateActions.searchCollections(event.target.value);
    }else {
      CollectionsStateActions.updateCollections([]);
    }
  }

  componentDidMount() {
    CollectionsStateStore.listen(this.collectionsStateChanged);
  }

  collectionsStateChanged(state) {
    // let new_state = _.merge({},state,MapPinStore.getState());
    console.log(MapPinStore.getState(), state.collections);
    setTimeout(() => {
      MapPinActions.setFormAttribute({collections: state.collections});
    }, 100);
  }

  render() {
    let field = [];

    if(this.state.collection_id != null) {
      let item = this.state.collections.find((item) => {
        return item.id == this.state.collection_id;
      });

      field = <CollectionItem key={item.id} collection_item={item} />;
    }else if(this.state.collections.length==0 && this.state.collection_name.length>0) {
      field = <CollectionItemForm query={this.query} />
    }else {
      field = this.state.collections.map((item) => {
        return (<CollectionItem key={item.id} collection_item={item} />);
      });
    }

    let form_title;
    if(this.state.editing && this.state.collections.length) {
      form_title = "Change which collection this pin is in"
    }else if(this.state.editing) {
      form_title = "Add to collection";
    }else {
      form_title = "Add to collection";
    }

    return (
        <div>
          <div className="form-group form-group-title">
            <label>{form_title}</label>
            <input type="text" placeholder="Collection Name" onChange={this.setSearchQuery.bind(this)} value={this.state.collection_name} />
          </div>

          {field}
        </div>
    );
  }
}

CollectionControl = Layers.bindComponentToMapPinStore(CollectionControl);