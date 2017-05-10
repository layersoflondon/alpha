class CollectionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  toggleChosenState() {
    let selected = !this.state.selected;
    this.setState({selected: selected});

    if(selected) {
      MapPinActions.setFormAttribute({collection_id: this.props.collection_item.id});
    }else {
      MapPinActions.setFormAttribute({collection_id: null});
    }
  }

  render () {
    let details = <div>
      <h1>
        {this.props.collection_item.name}
        <span>
          {this.props.collection_item.description}
        </span>
      </h1>
      <h4>
        {this.props.collection_item.details}
      </h4>
    </div>;

    let classNames = `collection-item-result collection-item-availability-${this.props.collection_item.public ? 'public' : 'private'} collection-item-${this.state.selected ? 'is' : 'not'}-selected`;

    return (
        <div className={classNames} onClick={this.toggleChosenState.bind(this)}>
            {details}
        </div>
    );
  }
}

