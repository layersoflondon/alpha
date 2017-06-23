class NotificationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notification: props.notification,
      detail: props.detail
    }
  }

  render_text(text) {
    return {__html: text};
  }

  hide_notifications() {
    MapPinActions.setNotification({});
  }

  render () {
    return (
      <div className="m-current-collection">
        <p><span dangerouslySetInnerHTML={this.render_text(this.state.notification)} /> <strong dangerouslySetInnerHTML={this.render_text(this.state.detail)} /></p>
        <a href="#" onClick={this.hide_notifications.bind(this)}>Clear</a>
      </div>
    );
  }
}
