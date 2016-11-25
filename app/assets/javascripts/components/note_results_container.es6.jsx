class NoteResultsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = MapContainerStore.getState();
    this.stateChanged = this.stateChanged.bind(this);
  }

  componentDidMount() {
    MapContainerStore.listen(this.stateChanged);
  }

  componentWillUnmount() {
    MapContainerStore.unlisten(this.stateChanged);
  }

  stateChanged(state) {
    this.setState(state);
    console.log(state);
  }

  render () {
    var notes_label = this.state.searching ? "Searching for notes..." : "Notes";
    
    return (
      <div className="results-notes">
        <h3>{notes_label}</h3>
        <ul>
        {this.state.notes.map(function(note){
          return (<NoteResult key={note.id} note={note} />);
        })}
        </ul>
      </div>
    );
  }
}
