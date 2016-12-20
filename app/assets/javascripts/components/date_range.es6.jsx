class DateRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = FilterStateStore.getState();

    this.stateChanged = this.stateChanged.bind(this);
  }

  componentWillMount() {
    FilterStateStore.listen(this.stateChanged);
  }

  componentWillUnmount() {
    FilterStateStore.unlisten(this.stateChanged);
  }

  stateChanged(state) {
    const default_state = FilterStateStore.getState();

    const default_date_from = parseInt(default_state.date_from, 10);
    const filter_date_from  = parseInt(this.state.date_from, 10);

    if(default_date_from < filter_date_from) {
      let currentState = this.state;
      _.merge(currentState, {date_from: state.date_from});

      this.setState(currentState);

      let $input = $('.m-date-filter .range-slider');
      $input.parent().find('.slider-container').remove();
      $input.data('plugin_jRange', null);
      this.attachRangeSlider();

      $('.m-date-filter .range-slider').jRange('setValue', `${this.state.date_from},${this.state.date_to}`);
    }
  }

  attachRangeSlider() {
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

  updateDateRange(range) {
    FilterStateActions.updateSearchDateRange(range);
  }

  componentDidMount() {
    this.attachRangeSlider();
  }

  render () {
    let value = `${this.state.date_from},${this.state.date_to}`;

    return (
      <div className="m-date-filter">
        <h2>Date range</h2>

        <input type="hidden" className="range-slider" style={{'display':'block !important'}} value={value} />
      </div>
    );
  }
}
