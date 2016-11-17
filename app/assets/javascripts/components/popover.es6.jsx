class Popover extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  toggle(event) {
    event.preventDefault();
    this.setState({show: !this.state.show})
  }

  render() {
    return(
      <div className="m-helper">
        <button onClick={this.toggle.bind(this)}>{this.props.title}</button>
        { this.state.show &&
        <div className="popover">
          {this.props.children}
        </div>
        }
      </div>
    )
  }
}