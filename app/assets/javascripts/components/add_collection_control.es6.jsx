class AddCollectionControl extends React.Component {
  constructor(props) {
    super(props);
  }

  showCollectionForm() {
    MapPinActions.enableCollectionForm(true);
  }

  render () {
    return <div className="m-pin-controls">
      <div className="create-collection">
        <button onClick={this.showCollectionForm.bind(this)}>Create Collection</button>
      </div>
    </div>;
  }
}
