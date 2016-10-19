class AdvancedFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'date_from_day': '',
      'date_from_month': '',
      'date_from_year': '',
      'date_to_day': '',
      'date_to_month': '',
      'date_to_year': ''
    };
  }

  setToDateToToday(event) {
    event.preventDefault();

    var date = new Date();

    var current_state = this.state;
    var to_date = {date_to_day: date.getDay(), date_to_month: date.getMonth(), date_to_year: date.getFullYear()};
    _.merge(current_state, to_date);

    this.setState(current_state);
  }

  render () {
    return (
      <div className="advanced">
        <div className="m-date-filter">
          <h2>Date range</h2>

          <div className="dates">
            <p>from</p>
            <div className="form-group">
              <input type="text" value={this.state.date_from_day} size={4} style={{marginRight: '5px'}} />
              <input type="text" value={this.state.date_from_month} size={4} style={{marginRight: '5px'}} />
              <input type="text" value={this.state.date_from_year} size={4} style={{marginRight: '5px'}} />
            </div>
            <p>to</p>
            <div className="form-group">
              <input type="text" value={this.state.date_to_day} size={4} style={{marginRight: '5px'}} />
              <input type="text" value={this.state.date_to_month} size={4} style={{marginRight: '5px'}} />
              <input type="text" value={this.state.date_to_year} size={4} style={{marginRight: '5px'}} />
              <a href="#" onClick={this.setToDateToToday.bind(this)}>Set to today</a>
            </div>
          </div>
        </div>

        <div className="m-type-filter">
            <h2>Types</h2>
            <div className="form-group">
                <div className="form-check">
                    <label>
                        <input className="form-check-input" type="checkbox" value="" />
                        Overlays
                    </label>
                </div>
            </div>
            <div className="form-group">
                <div className="form-check">
                    <label>
                        <input className="form-check-input" type="checkbox" value="" />
                        Pins
                    </label>
                </div>
                <div className="form-check">
                    <label>
                        <input className="form-check-input" type="checkbox" value="" />
                        With video
                    </label>
                </div>
                <div className="form-check">
                    <label>
                        <input className="form-check-input" type="checkbox" value="" />
                        With audio
                    </label>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
