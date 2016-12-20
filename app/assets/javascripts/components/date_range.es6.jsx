class DateRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = FilterStateStore.getState();
  }

  updateDateRange(range) {
    FilterStateActions.updateSearchDateRange(range);
  }

  componentDidMount() {
    $('.m-date-filter .range-slider').jRange({
      from: this.state.date_from,
      to: this.state.date_to,
      step: 1,
      scale: [this.state.date_from, this.state.date_to],
      format: '%s',
      width: 270,
      isRange : true,
      ondragend: (value) => {this.updateDateRange(value.split(","))}
    });
  }

  render () {
    let value = `${this.state.date_from},${this.state.date_to}`;

    return (
      <div className="m-date-filter">
        <h2>Date range</h2>

        <input type="hidden" className="range-slider" value={value} />
      </div>
    );
  }
}
