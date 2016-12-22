class AddPinControl extends React.Component {
  constructor(props) {
    super(props);
  }

  togglePinForm() {
    var current_state = MapPinStore.getState();
    var enabled = current_state.pin_form_enabled;
    MapPinActions.enablePinForm(!enabled);
  }

  render () {
    let label = "";
    let classes = "";

    if(MapPinStore.getState().pin_form_enabled) {
      label = "Cancel";
      classes = "add-pin adding";
    }else {
      label = "Add Note";
      classes = "add-pin";
    }

    // TODO check the user is logged in before rendering this jsx - meta tag? (we will validate on the server anyway)
    return (
      <div className="m-pin-controls">

      <div className={classes}>
      <button onClick={this.togglePinForm.bind(this)}>{label}</button>
      </div>

      </div>
      );
  }
}
