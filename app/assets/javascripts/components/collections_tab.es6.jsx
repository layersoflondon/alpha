class CollectionsTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  render () {
    return (
        <div className="m-collections-panel">
            <CollectionResultsContainer />
        </div>
    );
  }
}
