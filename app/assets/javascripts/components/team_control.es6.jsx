class TeamControl extends React.Component {
  constructor(props) {
    super(props);

    this.lookupTeams = _.debounce((event) => {
      Team.searchTeams({query: event.target.value}).then((found_teams) => {
        let current_state = this.state;
        _.extend(current_state, found_teams);
        this.setState(current_state);
      }).catch((error) => {
        console.log("Error when looking up teams");
      })
    }, 250, true).bind(this);

    this.state = {team_id: null};
  }

  componentWillMount() {
    this.setState({selected_team: null, teams: []});
  }

  searchForTeams(event) {
    // bind the event to its dom element so that we can access the element in our async lookupTeams callback.
    // https://facebook.github.io/react/docs/events.html
    event.persist();

    if(event.target.value.length) {
      this.lookupTeams(event);
    }else {
      // clear team list
      let current_state = this.state;
      current_state.teams = [];
      this.setState(current_state);
    }
  }

  setTeamId(event) {
    this.setState({team_id: event.target.value});
  }

  render() {
    let teams = <div></div>;

    if(this.state.teams.length) {
      console.log("Got teams...");
      teams = <select name="id" onChange={this.setTeamId.bind(this)}>
        <option>Select a team...</option>
        {this.state.teams.map((team) => {
          return <option key={team.id} value={team.id}>{team.name}</option>
        })}
      </select>;
    }

    let disabled = this.state.team_id === null;

    return <div>
      <div className="field team-lookup">
        <label>Search for a team</label>
        <input type="text" onChange={this.searchForTeams.bind(this)} />

        {teams}
      </div>

      <div className="actions">
        <input type="submit" value="Request to join" disabled={disabled} />
      </div>
    </div>;
  }
}