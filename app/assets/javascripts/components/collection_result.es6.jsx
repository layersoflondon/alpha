class CollectionResult extends React.Component {
  constructor(props) {
    super(props);
  }

  goToCollection(collection) {
    router.navigate(`collections/${collection.id}`, true);
  }

  render () {
    return (
        <li className="collection-result" onClick={this.goToCollection.bind(this, this.props.collection)} title={this.props.collection.details}>
            <a>
                <h3>{this.props.collection.name}</h3>
                <p>{this.props.collection.description}</p>
            </a>
        </li>
    );
  }
}
