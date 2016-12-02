class DateRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateDateRange(range) {
    FilterStateActions.updateSearchDateRange(range);
  }

  componentDidMount() {
    $('.range-slider').jRange({
      from: 1716,
      to: 2016,
      step: 1,
      scale: [1716,2016],
      format: '%s',
      width: 270,
      isRange : true,
      ondragend: (value) => {this.updateDateRange(value.split(","))}
    });
  }

  render () {
    return (
      <div className="m-date-filter">
        <h2>Date range</h2>

        <input type="hidden" className="range-slider" value="1460,2016" />
      </div>
    );
  }
}
