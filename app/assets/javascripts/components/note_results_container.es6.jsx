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
  }

  render () {
    let notes_label = "Notes";

    if(this.state.searching) {
      notes_label = "Searching for notes...";
    }else if(!this.state.searching && this.state.notes.length==0) {
      notes_label = "No notes found";
    }else if(this.props.compact) {
      const count = this.state.notes.length;
      const label = (count == 0 || count > 1) ? "Notes" : "Note";
      notes_label = `${count} ${label}`;
    }

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
