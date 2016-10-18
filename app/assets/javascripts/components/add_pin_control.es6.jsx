class AddPinControl extends React.Component {
  constructor(props) {
    super(props);
  }

  togglePinForm() {
    var current_state = MapPinStore.getState();
    var visible = current_state.pin_form_visible;
    MapPinActions.togglePinForm(!visible);
  }

  render () {
    return (
      <div className="m-pin-controls">

        <div className="add-pin">
          <button onClick={this.togglePinForm.bind(this)}>Add pin</button>
        </div>
        
      </div>
    );
  }
}
