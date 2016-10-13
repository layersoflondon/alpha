class DateRange extends React.Component {
  render () {
    return (
      <div className="basic">
        <div className="m-date-filter">
          <h2>Date range</h2>
          <input type="hidden" className="range-slider" value="1460,2016" />
        </div>
      </div>
    );
  }
}
