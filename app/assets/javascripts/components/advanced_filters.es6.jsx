class AdvancedFilters extends React.Component {
  render () {
    return (
      <div className="advanced">
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
