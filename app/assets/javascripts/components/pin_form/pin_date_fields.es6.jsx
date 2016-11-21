class PinDateFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = props
  }

  advancedDates() {
    return(
      <div className="dates">
        <div className="from">
          <div className="form-group">
            <label>Day</label>
            <input type="text" value={this.state.date_from_day} onChange={this.updateAttribute.bind(this)} data-attribute='date_from_day' placeholder="Day" />
          </div>
          <div className="form-group">
            <label>Month</label>
            <input type="text" value={this.state.date_from_month} onChange={this.updateAttribute.bind(this)} data-attribute='date_from_month' placeholder="Month" />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input type="text" value={this.state.date_from_year} onChange={this.updateAttribute.bind(this)} data-attribute='date_from_year' placeholder="Year" />
          </div>
        </div>
        <div class="form-helper-text">
          You don't have to be too precise, a year is good enough (though an exact date would be nice if you know it!)
        </div>
        <p>to</p>
        <div className="to">

          <div className="form-group">
            <label>Day</label>
            <input type="text" value={this.state.date_to_day} onChange={this.updateAttribute.bind(this)} data-attribute='date_to_day' placeholder="Day" />
          </div>
          <div className="form-group">
            <label>Month</label>
            <input type="text" value={this.state.date_to_month} onChange={this.updateAttribute.bind(this)} data-attribute='date_to_month' placeholder="Month" />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input type="text" value={this.state.date_to_year} onChange={this.updateAttribute.bind(this)} data-attribute='date_to_year' placeholder="Year" />
          </div>
        </div>
        <div className="end-date-toggle">
          <a href="#" onClick={this.toggleAdvanced.bind(this)}>I don't have an end date to add</a>
        </div>
      </div>
    )
  }

  simpleDates() {
    return (
      <div className="dates">
        <div className="from">
          <div className="form-group">
            <label>Day</label>
            <input type="text" value={this.state.date_from_day} onChange={this.updateAttribute.bind(this)} data-attribute='date_from_day' placeholder="Day" />
          </div>
          <div className="form-group">
            <label>Month</label>
            <input type="text" value={this.state.date_from_month} onChange={this.updateAttribute.bind(this)} data-attribute='date_from_month' placeholder="Month" />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input type="text" value={this.state.date_from_year} onChange={this.updateAttribute.bind(this)} data-attribute='date_from_year' placeholder="Year" />
          </div>
        </div>
        <div class="form-helper-text">
          You don't have to be too precise, a year is good enough (though an exact date would be nice if you know it!)
        </div>
        <div className="end-date-toggle">
          <a href="#" onClick={this.toggleAdvanced.bind(this)}>Add end date</a>
          Really useful for things like events, and places that may no longer exist.
        </div>
      </div>
      )
  }

  toggleAdvanced(event) {
    event.preventDefault();
    this.setState({advanced: !this.state.advanced})
  }

  dateFields() {
    if (this.state.advanced) {
      return this.advancedDates()
    } else {
      return this.simpleDates()
    }
  }

  render() {
    return(
      <div className="date-fields">
        <div className="pseudo-label">
          When did this happen?
        </div>
        {this.dateFields()}
      </div>
    )
  }
}

PinDateFields = Layers.bindComponentToMapPinStore(PinDateFields);