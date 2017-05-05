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
    let details = <span>
      <h4>
        {this.props.collection_item.description}

        <span style={{padding: "0 0 0 5px"}}>
            {this.props.collection_item.details}
          </span>
        </h4>
      </span>;

    let classNames = `collection-item-result collection-item-availability-${this.props.collection_item.public ? 'public' : 'private'} collection-item-${this.state.selected ? 'is' : 'not'}-selected`;

    return (
        <div className={classNames} onClick={this.toggleChosenState.bind(this)}>
            <h1>{this.props.collection_item.name}</h1>
            {details}
        </div>
    );
  }
}

