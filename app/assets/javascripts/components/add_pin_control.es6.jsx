class AddPinControl extends React.Component {
  constructor(props) {
    super(props);
  }

  togglePinForm() {
    let current_state = MapPinStore.getState();
    let enabled = current_state.pin_form_enabled;

    MapPinActions.enablePinForm(!enabled);
  }

  render () {
    let label = "";
    let classes = "";

    if(MapPinStore.getState().pin_form_enabled) {
      label = "Cancel";
      classes = "add-pin adding";
    }else {
      label = "Add to Map";
      classes = "add-pin";
    }

    return (
      <div className="m-pin-controls">
        <div className={classes}>
          <button onClick={this.togglePinForm.bind(this)} dangerouslySetInnerHTML={{__html: label}}></button>
        </div>
        <div className="create-collection">
          <button>Create collection</button>
        </div>
      </div>      
      );
  }
}
