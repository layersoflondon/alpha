class PinAttributionFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  showForm(event) {
    event.preventDefault();
    this.setState({show_form: true});
  }
  render() {
    if (this.state.show_form) {
      field = <input type="text" placeholder="The person or organisation who were responsible for sourcing this" onChange={this.updateAttribute.bind(this)} data-attribute='attribution' value={this.state.attribution} />
    } else {
      field = <a href="#" onClick={this.showForm.bind(this)}>Yes, I need to credit someone</a>
    }
    return(
      <div className="form-group form-group-attribution">
        <div className="form-helper-text">
          If you've copied and pasted your text from someone else's website, you really need to acknowledge that you've done so. This is called attribution and helps credit people or organisations for the work they have produced in the past. In a lot of cases, it is also a legal requirement to add a credit for someone else's work.
          {field}
        </div>
      </div>
    )
  }
}
PinAttributionFields = Layers.bindComponentToMapPinStore(PinAttributionFields);