class AddPinToCollection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {show_add_pin_to_collection: false, pin_id: null};

    this.mapPinStoreChanged = this.mapPinStoreChanged.bind(this);
  }

  componentDidMount() {
    // map state when adding new pins
    MapPinStore.listen(this.mapPinStoreChanged);
  }

  componentWillUnmount() {
    MapPinStore.unlisten(this.mapPinStoreChanged);
  }

  mapPinStoreChanged(state) {
    this.setState({
      show_add_pin_to_collection: state.show_add_pin_to_collection,
      collection_id: state.add_pin_to_collection_id,
      pin_id: state.add_pin_to_collection_pin_id
    });
  }

  hidePinCollectionForm() {
    MapPinActions.showAddPinToCollectionForm(false);
  }

  editPinCollection(event) {
    event.preventDefault();

    let collection_id = MapPinStore.getState().collection_id;
    let pin_id = this.state.pin_id;
    Pin.addToCollection({pin_id: pin_id, collection_id: collection_id}).then((response) => {
      this.hidePinCollectionForm();

      //fixme: remove this when we have a single way of managing collections and their relations
      window.location.hash = `pins/${pin_id}`;
      window.location.reload();
    }).catch((response) => {
      console.log(response);
      console.log(response.responseJSON.errors);

      this.setState(_.merge({}, this.state, {errors: response.responseJSON.errors}));
    });
  }

  render () {
    let output;
    let errors;

    const user_id = $("head meta[name='user-id']").attr('content');

    if(this.state.show_add_pin_to_collection) {
      if(user_id) {
        if(!_.isEmpty(this.state.errors)) {
          let error_messages = this.state.errors.map((error) => {return <li>{error}</li>;});
          errors = <ul className="errors">
            {error_messages}
          </ul>;
        }
        output = <div className="m-add-pin" id="add-pin-to-collection">
          <form onSubmit={this.editPinCollection.bind(this)}>
            <h3>Add to Collection</h3>

            {errors}

            <div className="form-content">
              <a href="#" className="close" onClick={this.hidePinCollectionForm.bind(this)} style={{float: "right", margin: "-30px -28px 0 0"}}>&times;</a>

              <CollectionControl all_collections={this.props.all_collections} team_collections={this.props.team_collections} user_collections={this.props.user_collections} standalone_component={true} />
            </div>

            <div className="form-actions">
              <div className="form-group">
                <input type="submit" value="Save and continue" className="main-button" disabled={this.state.form_submit_disabled} />
              </div>
            </div>
          </form>
        </div>;
      }else {
        output = <div className="m-add-pin">
          <form>
            <h3>Managing collections?</h3>

            <div className="form-content">
              <a href="#" className="close" onClick={this.hidePinCollectionForm.bind(this)} style={{float: "right", margin: "-30px -28px 0 0"}}>&times;</a>

              <h2>You'll need to be logged in first.</h2>
              <p>You can sign in to your account <a href="/users/sign_in">here</a>.</p>
              <p>Not registered yet? Create a <a href="/users/sign_up">new account</a> to get started!</p>
            </div>
          </form>
        </div>;
      }
    }else {
      output = <div/>;
    }

    return output;
  }
}
