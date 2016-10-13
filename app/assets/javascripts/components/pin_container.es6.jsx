class PinContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {expanded: props.expanded};
  }

  switchState() {
    this.setState({expanded: !this.state.expanded});
  }

  getContent() {
    return {__html: '<p><a href="#">See all pins for this location</a> or <a href="#">add a pin</a></p>'};
  }

  getExpandedContent() {
    var content = `
    <a className="back-link">Back</a>
    <div className="window">
        <ul>
            <li>
                <a href="#">
                    <div className="icon"><i className="fa fa-map-marker" aria-hidden="true"></i></div>
                    <h3>Aenean vitae tincidunt arcu.</h3>
                    <p>Pinned 20th Sept 2016</p>
                </a>
            </li>
            <li>
                <a href="#">
                    <div className="icon"><i className="fa fa-map-marker" aria-hidden="true"></i></div>
                    <h3>Aenean vitae tincidunt arcu.</h3>
                    <p>Pinned 20th Sept 2016</p>
                </a>
            </li>
        </ul>
    </div>
    `;
    return {__html: content};
  }

  render () {
    var content = this.state.expanded ? this.getExpandedContent() : this.getContent();
    var switchLabel = this.state.expanded ? "Back" : "Show All";

    return (
      <li>
        <div className="m-popover">
            <h3>Barking park</h3>
            <div dangerouslySetInnerHTML={content}></div>

            <a href="#" onClick={this.switchState.bind(this)}>{switchLabel}</a>
        </div>
        <div className="marker"></div>
      </li>
    );
  }
}

PinContainer.propTypes = {
  expanded: React.PropTypes.bool
};
