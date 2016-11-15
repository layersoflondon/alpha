class PinDateFields extends React.Component {
  render() {
    return(
      <div className="dates">
        <div className="from">
          <div className="form-group">
            <label>Day</label>
            <input type="text" value={this.state.date_from_day} onChange={this.updateAttribute.bind(this)} data-attribute='date_from_day'  />
          </div>
          <div className="form-group">
            <label>Month</label>
            <input type="text" value={this.state.date_from_month} onChange={this.updateAttribute.bind(this)} data-attribute='date_from_month'  />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input type="text" value={this.state.date_from_year} onChange={this.updateAttribute.bind(this)} data-attribute='date_from_year'  />
          </div>
        </div>
        <p>to</p>
        <div className="to">

          <div className="form-group">
            <label>Day</label>
            <input type="text" value={this.state.date_to_day} onChange={this.updateAttribute.bind(this)} data-attribute='date_to_day'  />
          </div>
          <div className="form-group">
            <label>Month</label>
            <input type="text" value={this.state.date_to_month} onChange={this.updateAttribute.bind(this)} data-attribute='date_to_month' />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input type="text" value={this.state.date_to_year} onChange={this.updateAttribute.bind(this)} data-attribute='date_to_year'  />
          </div>
        </div>
      </div>
    )
  }
}

PinDateFields = AddPinFieldHooks(PinDateFields);
PinDateFields.displayName = "PinDateFields";