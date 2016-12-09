class NoteResult extends React.Component {
  focusMapOnNote(note) {
    MapStateActions.focusPin(note);
  }

  render () {
    return (
      <li onClick={this.focusMapOnNote.bind(this, this.props.note)}>
          <a href="#">
              <div className="icon icon--place"></div>
              <h3>{this.props.note.title}</h3>
              <p>{this.props.note.location}</p>
          </a>
      </li>
    );
  }
}
