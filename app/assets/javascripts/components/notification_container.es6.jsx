class NotificationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.mapPinStoreChanged  = this.mapPinStoreChanged.bind(this);
  }

  componentDidMount() {
    // map state when adding new pins
    MapPinStore.listen(this.mapPinStoreChanged);
  }

  componentWillUnmount() {
    MapPinStore.unlisten(this.mapPinStoreChanged);
  }

  mapPinStoreChanged(state) {
    this.setState({show_notification: state.show_notification, notification: state.notification});
  }

  render_text(text) {
    return {__html: text};
  }

  hide_notifications() {
    MapPinActions.setNotification({});
  }

  render () {
    let output = <div />;

    if(this.state && this.state.show_notification && !_.isEmpty(this.state.notification)) {
      output = <div className="m-current-collection">
        <p><span dangerouslySetInnerHTML={this.render_text(this.state.notification.message)} /> <strong dangerouslySetInnerHTML={this.render_text(this.state.notification.detail)} /></p>
        <a href="/the-map">Clear</a>
      </div>;
    }

    return output;
  }
}
