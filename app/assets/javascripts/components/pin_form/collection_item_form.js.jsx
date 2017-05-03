class CollectionItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render () {
    return (
        <div>
          <input type="text" value={this.state.collection_description} onChange={this.updateAttribute.bind(this)} data-attribute='collection_description' placeholder="New Collection Description" data-parsley-required={true} />
        </div>
    );
  }
}

CollectionItemForm = Layers.bindComponentToMapPinStore(CollectionItemForm);
