class CollectionResult extends React.Component {
  constructor(props) {
    super(props);
  }

  goToCollection(id) {
    router.navigate(`collections/${id}`, true);
  }

  render () {
    return (
      <div>
        <li className="collection-result" onClick={this.goToCollection.bind(this, this.props.collection.id)} title={this.props.collection.details}>
            <a>
                <h3>{this.props.collection.name}</h3>
                <p>{this.props.collection.description}</p>
            </a>
        </li>
      </div>
    );
  }
}
