class AddPinControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {pin_form_visible: false};
  }

  render () {
    return (
      <div className="m-pin-controls">

        <div className="add-pin">
          <button>Add pin</button>
        </div>

        <PinForm />
      </div>
    );
  }
}
