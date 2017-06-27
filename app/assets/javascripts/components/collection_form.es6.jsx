class CollectionForm extends React.Component {
  constructor(props) {
    super(props);

    this.mapPinStoreChanged = this.mapPinStoreChanged.bind(this);

    this.state = {
      collection_form_enabled: false,
      collection_type: "public",
      teams: props.user_groups,
      submit_disabled: false
    };
  }

  componentDidMount() {
    // map state when adding new pins
    MapPinStore.listen(this.mapPinStoreChanged);
  }

  componentWillUnmount() {
    MapPinStore.unlisten(this.mapPinStoreChanged);
  }

  mapPinStoreChanged(state) {
    this.setState({collection_form_enabled: state.collection_form_enabled});
  }

  hideCollectionForm() {
    MapPinActions.enableCollectionForm(false);
  }

  updateAttribute(event) {
    let state = this.state;
    let new_state = {};
    new_state[event.target.dataset.attribute] = event.target.value;
    _.merge(state, new_state);
    this.setState(state);
  }

  submitCollection(event) {
    event.preventDefault();

    Collection.post(this.state).then((response)=> {
      console.log("Got response.", response);
    });
  }

  render() {
    console.log("Rendering collection form...");
    let styles;

    if(this.state.collection_form_enabled){
      styles = {display: "block"}
    }else {
      styles = {display: "none"}
    }

    let team_options = this.state.teams.map((team) => {return <option key={team.id} value={team.id}>{team.name}</option>;});
    let teams = <select onChange={this.updateAttribute.bind(this)} id="team_id" name="team_id" data-attribute="team_id"><option value="default" selected="selected" disabled>Select a team</option> {team_options}</select>;

    return <div className="m-add-pin" style={styles}>
      <form>
        <h3>Create Collection</h3>

        <div className="form-content">
          <a href="#" className="close" onClick={this.hideCollectionForm.bind(this)} style={{float: "right", margin: "-30px -28px 0 0"}}>&times;</a>

          <div className="form-group form-group-title">
            <label>Note title</label>
            <input type="text" placeholder="Type a useful title for your entry (for example: Barking Park Mayday festival photos)" onChange={this.updateAttribute.bind(this)} data-attribute='title' data-parsley-required={true} data-parsley-error-message="The title should be at least 4 characters long" data-parsley-minlength="4" value={this.state.title} />
          </div>
          <div className="form-group form-group-description-text">
            <label>Description</label>
            <input type="text" placeholder="Describe in no more than 250 words what your note, story, or memory is about" value={this.state.description} onChange={this.updateAttribute.bind(this)} data-attribute='description' data-parsley-required='true' data-parsley-error-message="Enter a description for the collection" />
          </div>

          <div className="form-group">
            <div className="collection-option">
              <label><input type="radio" name="collection_type" value="public" onChange={this.updateAttribute.bind(this)} data-attribute="collection_type" checked={this.state.collection_type=="public"}/> Public</label>
            </div>
            <div className="collection-option">
              <label><input type="radio" name="collection_type" value="personal" onChange={this.updateAttribute.bind(this)} data-attribute="collection_type" checked={this.state.collection_type=="personal"}/> Personal</label>
            </div>
            <div className="collection-option">
              <label>
                <input type="radio" name="collection_type" value="team" onChange={this.updateAttribute.bind(this)} data-attribute="collection_type" checked={this.state.collection_type=="team"}/>
                Team
              </label>
              <span>
                  Anyone in team: {teams} can add pins (theirs or others) to this collection
              </span>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <div className="form-group">
            <input type="submit" value="Save and continue" className="main-button" onClick={this.submitCollection.bind(this)} disabled={this.state.submit_disabled} />
          </div>
        </div>
      </form>
    </div>;
  }
}
