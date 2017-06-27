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
    this.setState({show_notification: state.show_notification, notification: state.notification, clear: state.clear});
  }

  render_text(text) {
    return {__html: text};
  }

  hide_notifications() {
    MapPinActions.setNotification({});
  }

  render () {
    let output = <div />;

    let actions = null;

    if(_.has(this.state, "notification") && _.has(this.state.notification, "clear") && this.state.notification.clear === true) {
      actions = <a href="#" onClick={this.hide_notifications.bind(this)}>Clear</a>;
    }else if(_.has(this.state, "notification") && _.has(this.state.notification, "clear") && typeof this.state.notification.clear === "string") {
      actions = <a href={this.state.clear}>Clear</a>;
    }


    if(this.state && this.state.show_notification && !_.isEmpty(this.state.notification)) {
      output = <div className="m-current-collection">
        <p><span dangerouslySetInnerHTML={this.render_text(this.state.notification.message)} /> <strong dangerouslySetInnerHTML={this.render_text(this.state.notification.detail)} /></p>
        {actions}
      </div>;
    }

    return output;
  }
}
